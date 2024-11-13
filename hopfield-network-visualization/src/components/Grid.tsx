"use client";

import React, { useState } from 'react';

type Grid = boolean[][];

interface GridComponentProps {
  onSavePattern: (pattern: Grid) => void;
}

const GridComponent: React.FC<GridComponentProps> = ({ onSavePattern }) => {
  const n = 28;
  const [grid, setGrid] = useState<Grid>(
    Array.from({ length: n }, () => Array(n).fill(false))
  );
  const [isDragging, setIsDragging] = useState(false);

  const toggleCell = (row: number, col: number) => {
    setGrid(prevGrid =>
      prevGrid.map((r, rowIndex) =>
        r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? !cell : cell))
      )
    );
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsDragging(true);
    toggleCell(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDragging) toggleCell(row, col);
  };

  const handleSavePattern = () => {
    onSavePattern(grid);
    setGrid(Array.from({ length: n }, () => Array(n).fill(false)));
  };

  return (
    <div onMouseUp={() => setIsDragging(false)}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${n}, 1fr)`,
          width: '100%',
          aspectRatio: '1 / 1'
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              style={{
                backgroundColor: cell ? 'blue' : 'lightgray',
                border: '#ccc',
                cursor: 'pointer',
                aspectRatio: '1 / 1',
              }}
            />
          ))
        )}
      </div>
      <button onClick={handleSavePattern} style={{ marginTop: '10px' }}>
        Store
      </button>
    </div>
  );
};

export default GridComponent;