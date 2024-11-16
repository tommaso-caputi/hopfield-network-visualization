import React, { useState } from 'react';

interface GridProps {
    gridSize: number; // Size of the grid (number of cells per row/column)
}

const Grid: React.FC<GridProps> = ({ gridSize }) => {
    // Create a 2D array to manage the grid values (-1 or 1)
    const [grid, setGrid] = useState(
        Array(gridSize)
            .fill(null)
            .map(() => Array(gridSize).fill(-1))
    );

    const [isMouseDown, setIsMouseDown] = useState(false); // Track if the mouse button is pressed

    // Handle cell toggle
    const toggleCellValue = (row: number, col: number) => {
        setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[row] = [...newGrid[row]];
            newGrid[row][col] = newGrid[row][col] === -1 ? 1 : -1;
            return newGrid;
        });
    };

    return (
        <div
            className={`grid`}
            style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
            // Prevent default dragging behavior
            onMouseLeave={() => setIsMouseDown(false)}
        >
            {grid.map((row, rowIndex) =>
                row.map((value, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        onMouseDown={() => {
                            setIsMouseDown(true);
                            toggleCellValue(rowIndex, colIndex);
                        }}
                        onMouseEnter={() => {
                            if (isMouseDown) toggleCellValue(rowIndex, colIndex);
                        }}
                        onMouseUp={() => setIsMouseDown(false)}
                        className={`w-8 h-8 ${value === -1 ? 'bg-one' : 'bg-minusone'
                            } cursor-pointer`}
                    ></div>
                ))
            )}
        </div>
    );
};

export default Grid;