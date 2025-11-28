import Header from '@/components/Header';
import GameController from '@/components/GameController';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <GameController />
          </div>
          <div className="lg:w-80 flex-shrink-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    How to Play
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      1. Connect your wallet to the Sepolia testnet.
                    </p>
                    <p>
                      2. Create a new game or join an existing one from the
                      lobby.
                    </p>
                    <p>
                      3. The first player is X, the second is O. Take turns
                      placing your mark on the board.
                    </p>
                    <p>
                      4. The first player to get 3 of their marks in a row wins!
                    </p>
                     <p>
                      5. All moves are recorded on-chain.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        ChainTacToe - A dApp by You
      </footer>
    </div>
  );
}
