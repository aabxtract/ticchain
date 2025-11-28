'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Game, Address } from '@/types';
import { shortenAddress } from '@/lib/game-utils';
import { Trophy, Hourglass, Handshake, Info } from 'lucide-react';

interface GameStatusProps {
  game: Game;
  playerAddress: Address | undefined;
}

export default function GameStatus({ game, playerAddress }: GameStatusProps) {
  const { gameState, currentTurn, winner, playerX, playerO } = game;

  if (gameState === 0) { // Waiting
    return (
      <Alert>
        <Hourglass className="h-4 w-4" />
        <AlertTitle>Waiting for Player</AlertTitle>
        <AlertDescription>
          Waiting for a second player to join the game.
        </AlertDescription>
      </Alert>
    );
  }

  if (gameState === 2) { // Finished
    const isDraw = winner === '0x0000000000000000000000000000000000000000';
    if (isDraw) {
      return (
        <Alert variant="default">
          <Handshake className="h-4 w-4" />
          <AlertTitle>It's a Draw!</AlertTitle>
          <AlertDescription>A hard-fought battle with no winner.</AlertDescription>
        </Alert>
      );
    }
    const winnerSymbol = winner === playerX ? 'X' : 'O';
    const amWinner = winner === playerAddress;
    return (
      <Alert variant={amWinner ? 'default' : 'destructive'} className={amWinner ? 'border-accent text-accent' : ''}>
        <Trophy className="h-4 w-4" />
        <AlertTitle>
          {amWinner ? 'You Won!' : 'You Lost!'}
        </AlertTitle>
        <AlertDescription>
          Player {winnerSymbol} ({shortenAddress(winner)}) won the game.
        </AlertDescription>
      </Alert>
    );
  }

  // gameState is InProgress
  const isMyTurn = currentTurn === playerAddress;
  const currentTurnSymbol = currentTurn === playerX ? 'X' : 'O';

  return (
    <Alert variant={isMyTurn ? 'default' : 'secondary'} className={isMyTurn ? 'border-primary' : ''}>
      <Info className="h-4 w-4" />
      <AlertTitle>{isMyTurn ? 'Your Turn' : "Opponent's Turn"}</AlertTitle>
      <AlertDescription>
        It's Player {currentTurnSymbol}'s turn to make a move.
      </AlertDescription>
    </Alert>
  );
}
