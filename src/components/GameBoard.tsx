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
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { ArrowLeft, X, Circle as CircleIcon } from 'lucide-react';
import type { Game, Address } from '@/types';
import GameStatus from './GameStatus';
import { getWinningLine, shortenAddress } from '@/lib/game-utils';
import WinningLine from './WinningLine';

interface GameBoardProps {
  gameId: bigint;
  onExit: () => void;
}

const Cell = ({
  value,
  onClick,
  disabled,
  isWinningCell,
}: {
  value: number;
  onClick: () => void;
  disabled: boolean;
  isWinningCell: boolean;
}) => {
  const symbol = value === 1 ? 'X' : value === 2 ? 'O' : null;

  return (
    <div
      className={`aspect-square flex items-center justify-center rounded-lg transition-colors ${
        isWinningCell ? 'bg-accent/30' : 'bg-secondary'
      } ${
        !symbol && !disabled
          ? 'cursor-pointer hover:bg-primary/10'
          : 'cursor-not-allowed'
      }`}
      onClick={!symbol && !disabled ? onClick : undefined}
    >
      {symbol === 'X' && <X className="w-1/2 h-1/2 text-red-500" strokeWidth={3} />}
      {symbol === 'O' && <CircleIcon className="w-1/2 h-1/2 text-blue-500" strokeWidth={3} />}
    </div>
  );
};


export default function GameBoard({ gameId, onExit }: GameBoardProps) {
  const { toast } = useToast();
  const { address: playerAddress } = useAccount();
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const {
    data: game,
    isLoading: isLoadingGame,
    error: gameError,
  } = useReadContract({
    abi: ticTacToeABI,
    address: ticTacToeAddress,
    functionName: 'getGame',
    args: [gameId],
    watch: true,
  });

  const {
    data: moveHash,
    writeContract: makeMove,
    isPending: isMoving,
    error: moveError,
  } = useWriteContract();

  const { isLoading: isConfirmingMove } =
    useWaitForTransactionReceipt({ hash: moveHash });

  useEffect(() => {
    if (moveError) {
      toast({
        title: 'Move Error',
        description: moveError.message,
        variant: 'destructive',
      });
    }
     if (gameError) {
      toast({
        title: 'Game Error',
        description: gameError.message,
        variant: 'destructive',
      });
      onExit();
    }
  }, [moveError, gameError, toast, onExit]);

  useEffect(() => {
    if (game) {
      const typedGame = game as Game;
      if (typedGame.gameState === 2) { // Finished
        const result = getWinningLine(typedGame.board);
        if(result) {
            setWinningLine(result.combination);
        }
      } else {
        setWinningLine(null);
      }
    }
  }, [game]);

  const handleMakeMove = (position: number) => {
    if (!game) return;
    const typedGame = game as Game;
    if (typedGame.currentTurn !== playerAddress) {
      toast({ title: "Not your turn!", variant: "destructive" });
      return;
    }
    if (typedGame.board[position] !== 0) {
      toast({ title: "Cell already taken!", variant: "destructive" });
      return;
    }

    makeMove({
      abi: ticTacToeABI,
      address: ticTacToeAddress,
      functionName: 'makeMove',
      args: [gameId, position],
    });
  };
  
  const typedGame = game as Game | undefined;
  const isPlayer = playerAddress === typedGame?.playerX || playerAddress === typedGame?.playerO;
  const isMyTurn = typedGame?.currentTurn === playerAddress;
  const isGameActive = typedGame?.gameState === 1; // InProgress

  if (isLoadingGame && !typedGame) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </CardContent>
        <CardFooter>
            <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  if (!typedGame) {
    return (
        <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Game not found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The game you are looking for does not exist or has been removed.</p>
        </CardContent>
        <CardFooter>
            <Button onClick={onExit} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lobby
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const isBoardDisabled = isMoving || isConfirmingMove || !isMyTurn || !isGameActive;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Game #{gameId.toString()}</CardTitle>
        <CardDescription className='flex justify-between'>
            <span>Player X: {shortenAddress(typedGame.playerX)}</span>
            <span>Player O: {shortenAddress(typedGame.playerO)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <GameStatus game={typedGame} playerAddress={playerAddress} />
        <div className="relative">
            <div className="grid grid-cols-3 gap-2">
            {typedGame.board.map((cell, i) => (
                <Cell 
                key={i} 
                value={cell} 
                onClick={() => handleMakeMove(i)} 
                disabled={isBoardDisabled}
                isWinningCell={winningLine?.includes(i) ?? false}
                />
            ))}
            </div>
            {winningLine && <WinningLine boardSize={300} winningLine={winningLine} />}
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={onExit} className="w-full" variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lobby
        </Button>
      </CardFooter>
    </Card>
  );
}
