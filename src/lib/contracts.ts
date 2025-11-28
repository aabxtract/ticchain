export const ticTacToeAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const ticTacToeABI = [
  {
    inputs: [],
    name: 'createGame',
    outputs: [
      {
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_gameId',
        type: 'uint256',
      },
    ],
    name: 'joinGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_gameId',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_position',
        type: 'uint8',
      },
    ],
    name: 'makeMove',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_gameId',
        type: 'uint256',
      },
    ],
    name: 'getGame',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'playerX',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'playerO',
            type: 'address',
          },
          {
            internalType: 'uint8[9]',
            name: 'board',
            type: 'uint8[9]',
          },
          {
            internalType: 'address',
            name: 'currentTurn',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'winner',
            type: 'address',
          },
          {
            internalType: 'enum TicTacToe.GameState',
            name: 'gameState',
            type: 'uint8',
          },
        ],
        internalType: 'struct TicTacToe.Game',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOpenGames',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
    ],
    name: 'GameCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isDraw',
        type: 'bool',
      },
    ],
    name: 'GameFinished',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
    ],
    name: 'GameJoined',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'position',
        type: 'uint8',
      },
    ],
    name: 'MoveMade',
    type: 'event',
  },
];
