'use client';

import { WINNING_COMBINATIONS } from "@/lib/game-utils";

interface WinningLineProps {
  winningLine: number[];
  boardSize?: number;
}

const WinningLine = ({ winningLine, boardSize = 300 }: WinningLineProps) => {
  const combinationIndex = WINNING_COMBINATIONS.findIndex(
    (combo) =>
      combo.length === winningLine.length &&
      combo.every((val, index) => val === winningLine[index])
  );

  if (combinationIndex === -1) return null;

  const getLineCoords = () => {
    const cellSize = boardSize / 3;
    const halfCell = cellSize / 2;

    const startCell = winningLine[0];
    const endCell = winningLine[2];

    const startX = (startCell % 3) * cellSize + halfCell;
    const startY = Math.floor(startCell / 3) * cellSize + halfCell;
    const endX = (endCell % 3) * cellSize + halfCell;
    const endY = Math.floor(endCell / 3) * cellSize + halfCell;
    
    return { x1: startX, y1: startY, x2: endX, y2: endY };
  };

  const { x1, y1, x2, y2 } = getLineCoords();

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${boardSize} ${boardSize}`}
        className="overflow-visible"
      >
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          className="stroke-primary"
          strokeWidth="8"
          strokeLinecap="round"
        >
            <animate attributeName="x2" from={x1} to={x2} dur="0.5s" fill="freeze" />
            <animate attributeName="y2" from={y1} to={y2} dur="0.5s" fill="freeze" />
        </line>
      </svg>
    </div>
  );
};

export default WinningLine;
