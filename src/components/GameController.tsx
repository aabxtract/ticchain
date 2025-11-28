'use client';
import { useState, useEffect } from 'react';
import GameList from './GameList';
import GameBoard from './GameBoard';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export default function GameController() {
  const [activeGameId, setActiveGameId] = useState<bigint | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading skeleton
  }

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Welcome to ChainTacToe</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-muted-foreground">
            Please connect your wallet to play.
          </p>
          {/* The connect button is in the header, this is just a message */}
        </CardContent>
      </Card>
    );
  }

  if (activeGameId !== null) {
    return <GameBoard gameId={activeGameId} onExit={() => setActiveGameId(null)} />;
  }

  return <GameList onJoinGame={setActiveGameId} />;
}
