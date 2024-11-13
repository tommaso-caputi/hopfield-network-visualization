"use client";

import React, { useState } from 'react';

type Grid = number[][];

interface GridComponentProps {
    onSavePattern: (pattern: number[]) => void;
}

const GridComponent: React.FC<GridComponentProps> = ({ onSavePattern }) => {
    const n = 50;
    const [grid, setGrid] = useState<Grid>(
        Array.from({ length: n }, () => Array(n).fill(-1))
    );
    const [isDragging, setIsDragging] = useState(false);

    const toggleCell = (row: number, col: number) => {
        setGrid(prevGrid =>
            prevGrid.map((r, rowIndex) =>
                r.map((cell, colIndex) =>
                    rowIndex === row && colIndex === col && cell !== 1
                        ? cell === 1
                            ? -1
                            : 1
                        : cell
                )
            )
        );
    };

    const toggleNeighbors = (row: number, col: number) => {
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1],
            [-1, -1], [-1, 1], [1, -1], [1, 1],
        ];

        directions.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && grid[newRow][newCol] !== 1) {
                toggleCell(newRow, newCol);
            }
        });
    };

    const handleMouseDown = (row: number, col: number) => {
        setIsDragging(true);
        toggleCell(row, col);
        toggleNeighbors(row, col);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (isDragging && grid[row][col] !== 1) {
            toggleCell(row, col);
            toggleNeighbors(row, col);
        }
    };

    const handleSavePattern = () => {
        let wrappedPattern: any[] = [];
        wrappedPattern = wrappedPattern.concat(...grid);
        onSavePattern(wrappedPattern);
        setGrid(Array.from({ length: n }, () => Array(n).fill(-1)));
    };

    return (
        <div onMouseUp={() => setIsDragging(false)} className="flex flex-col items-center">
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
                    width: '100%',
                    aspectRatio: '1 / 1',
                }}
            >
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                            className={`cursor-pointer ${cell === 1 ? 'bg-blue-500' : 'bg-gray-200'
                                }`}
                        />
                    ))
                )}
            </div>
            <button
                onClick={handleSavePattern}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Store
            </button>
        </div>
    );
};

export default GridComponent;