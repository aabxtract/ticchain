'use client';

import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from 'wagmi';
import { ticTacToeABI, ticTacToeAddress } from '@/lib/contracts';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { decodeEventLog } from 'viem';
import { Skeleton } from './ui/skeleton';
import { Swords, PlusCircle } from 'lucide-react';
import type { Address } from '@/types';

interface GameListProps {
  onJoinGame: (gameId: bigint) => void;
}

export default function GameList({ onJoinGame }: GameListProps) {
  const { toast } = useToast();
  const { address: playerAddress } = useAccount();

  const {
    data: openGames,
    isLoading: isLoadingGames,
    error: gamesError,
  } = useReadContract({
    abi: ticTacToeABI,
    address: ticTacToeAddress,
    functionName: 'getOpenGames',
    watch: true,
  });

  const {
    data: createHash,
    writeContract: createGame,
    isPending: isCreating,
    error: createError,
  } = useWriteContract();

  const {
    data: joinHash,
    writeContract: joinGame,
    isPending: isJoining,
    error: joinError,
  } = useWriteContract();

  const { isLoading: isConfirmingCreate, isSuccess: isCreateSuccess } =
    useWaitForTransactionReceipt({ hash: createHash });

  const { isSuccess: isJoinSuccess } = useWaitForTransactionReceipt({
    hash: joinHash,
  });

  useEffect(() => {
    if (isCreateSuccess) {
      toast({
        title: 'Game Created!',
        description: 'Your new game is ready.',
        variant: 'default',
      });
    }
  }, [isCreateSuccess, toast]);

  useEffect(() => {
    if (isJoinSuccess) {
      toast({
        title: 'Game Joined!',
        description: 'Good luck!',
        variant: 'default',
      });
    }
  }, [isJoinSuccess, toast]);

  useEffect(() => {
    if (createError) {
      toast({
        title: 'Create Game Error',
        description: createError.message,
        variant: 'destructive',
      });
    }
    if (joinError) {
        toast({
          title: 'Join Game Error',
          description: joinError.message,
          variant: 'destructive',
        });
      }
    if (gamesError) {
      toast({
        title: 'Error Fetching Games',
        description: gamesError.message,
        variant: 'destructive',
      });
    }
  }, [createError, joinError, gamesError, toast]);

  const handleCreateGame = () => {
    createGame({
      abi: ticTacToeABI,
      address: ticTacToeAddress,
      functionName: 'createGame',
    });
  };

  const handleJoinGame = (gameId: bigint) => {
    joinGame(
      {
        abi: ticTacToeABI,
        address: ticTacToeAddress,
        functionName: 'joinGame',
        args: [gameId],
      },
      {
        onSuccess: () => onJoinGame(gameId),
      }
    );
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Game Lobby</CardTitle>
        <CardDescription>
          Create a new game or join an existing one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="font-semibold">Open Games</h3>
          <div className="space-y-2 h-48 overflow-y-auto pr-2">
            {isLoadingGames ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : openGames && openGames.length > 0 ? (
              openGames.map((gameId) => (
                <div
                  key={gameId.toString()}
                  className="flex items-center justify-between p-2 border rounded-lg"
                >
                  <p className="font-mono text-sm">Game #{gameId.toString()}</p>
                  <Button
                    size="sm"
                    onClick={() => handleJoinGame(gameId)}
                    disabled={isJoining}
                  >
                    <Swords className="mr-2 h-4 w-4" />
                    Join
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground pt-8">
                No open games available.
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleCreateGame}
          disabled={isCreating || isConfirmingCreate}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {isCreating || isConfirmingCreate
            ? 'Creating Game...'
            : 'Create New Game'}
        </Button>
      </CardFooter>
    </Card>
  );
}
