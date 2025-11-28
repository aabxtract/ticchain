# **App Name**: ChainTacToe

## Core Features:

- Wallet Connection: Connect players' wallets using RainbowKit or Web3Modal.
- Create Game: Allow a player to create a new Tic Tac Toe game on-chain.
- Join Game: Allow a player to join an existing open game by game ID.
- Make Move: Allow a player to make a move on the Tic Tac Toe board, validating the move on-chain.
- Check Winner: Automatically check for a winner after each move and update the game state.
- Display Open Games: Display a list of open games for users to join.
- Board Interaction and Game Status: Provide a visual 3x3 board showing moves, highlight the winning line (if any), and show whose turn it is.

## Style Guidelines:

- Primary color: #6C63FF (RGB: 108, 99, 255), a futuristic vibrant purple to evoke a sense of innovation and digital space.
- Background color: #F5F5FF (RGB: 245, 245, 255), a very light desaturated tint of purple to keep a light and modern feel.
- Accent color: #53C653 (RGB: 83, 198, 83), a bright green to provide contrast and highlight successful actions.
- Font: 'Space Grotesk', a sans-serif font for a clean, tech-focused look suitable for headlines and body text.
- Use simple, minimalist icons to represent game actions and status updates.
- Clean and structured layout using TailwindCSS grid system for the game board and information display.
- Subtle animations for move confirmations, highlighting the winning line, and transition effects for a smooth user experience.