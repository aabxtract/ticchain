export type Address = `0x${string}`;

export interface Game {
  playerX: Address;
  playerO: Address;
  board: readonly [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  currentTurn: Address;
  winner: Address;
  gameState: 0 | 1 | 2; // 0: Waiting, 1: InProgress, 2: Finished
}
