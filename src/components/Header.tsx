'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Rocket } from 'lucide-react';

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Rocket className="w-8 h-8 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold font-headline">
          ChainTacToe
        </h1>
      </div>
      <ConnectButton />
    </header>
  );
};

export default Header;
