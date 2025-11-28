On-Chain Tic Tac Toe dApp

A fully decentralized Tic Tac Toe game where two players connect their wallets, join a match, and play with every move recorded and validated on-chain.
This project is perfect for learning smart contract logic, game state management, and frontend–blockchain interaction.

🚀 Overview

On-Chain Tic Tac Toe demonstrates how even simple games can be built entirely on the blockchain.
The smart contract handles:

Game creation

Player matching

Board updates

Turn validation

Winner checking

Final game state storage

The frontend provides a smooth, modern interface where players can view games, join one, or start a new one instantly.

✨ Features
🎮 Game Logic (On-Chain)

Create a game (becomes Player X)

Join an open game (becomes Player O)

100% on-chain board state

Turn-by-turn enforcement

Winner detection (X wins, O wins, or draw)

Game locking after conclusion

💻 Frontend

Connect wallet (RainbowKit or Web3Modal)

List all open, active, and completed games

Real-time board updates using Wagmi + Viem

3×3 interactive grid

Status indicators:

Whose turn

Winner

Draw

Clean, minimalistic UI with TailwindCSS

Toast notifications for errors & success

🛠️ Tech Stack
Smart Contract

Solidity

Hardhat

Struct-based game storage

Events for real-time UI updates

Frontend

Next.js

Wagmi + Viem

TailwindCSS

RainbowKit

📦 Smart Contract Structure

Each game is stored as:

struct Game {
    address playerX;
    address playerO;
    uint8[9] board; // 0 = empty, 1 = X, 2 = O
    uint8 turn;     // 1 = X, 2 = O
    bool finished;
    uint8 winner;   // 0 = none, 1 = X, 2 = O, 3 = draw
}


Main functions:

createGame()

joinGame(uint gameId)

makeMove(uint gameId, uint position)

checkWinner(uint gameId)

Events:

GameCreated

GameJoined

MoveMade

GameFinished

🧩 User Flow

Open the app

Connect wallet

Choose:

Create a new game, or

Join an existing open game

Play turn-by-turn

On-chain contract decides winner or draw

Game becomes locked and can no longer be played

🧪 Local Setup
1️⃣ Clone the repo
git clone https://github.com/yourname/onchain-tictactoe.git
cd onchain-tictactoe

2️⃣ Install dependencies
npm install

3️⃣ Start the local blockchain (if using Hardhat)
npx hardhat node

4️⃣ Deploy the smart contract
npx hardhat run scripts/deploy.js --network localhost

5️⃣ Run the frontend
npm run dev

📁 Project Structure
/contracts
  └── TicTacToe.sol
/frontend
  ├── components
  ├── pages
  ├── styles
  └── utils

🔮 Future Improvements

On-chain wager mode (optional ETH bet)

Player profiles & win/loss statistics

Spectator mode

Matchmaking queue

AI bot (off-chain) vs. human version

Sound effects & animations

📝 License

MIT — free to use, edit, and build upon.
