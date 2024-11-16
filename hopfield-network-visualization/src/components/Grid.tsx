import React, { useState } from 'react';

interface GridProps {
    gridSize: number; // Size of the grid (number of cells per row/column)
    onSave: (flatGrid: number[]) => void; // Callback to save grid state
}

const Grid: React.FC<GridProps> = ({ gridSize, onSave }) => {
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
            // Only toggle if the current value is -1
            if (newGrid[row][col] === -1) {
                newGrid[row][col] = 1;
            }
            return newGrid;
        });
    };

    // Clear the grid to its initial state
    const clearGrid = () => {
        setGrid(
            Array(gridSize)
                .fill(null)
                .map(() => Array(gridSize).fill(-1))
        );
    };

    // Save the grid and then clear it
    const saveGrid = () => {
        const flatGrid = grid.flat(); // Flatten the 2D array into a 1D array
        onSave(flatGrid);
        clearGrid(); // Clear the grid after saving
    };

    // Restore the grid with random states
    const restoreGrid = () => {
        setGrid(
            Array(gridSize)
                .fill(null)
                .map(() =>
                    Array(gridSize)
                        .fill(null)
                        .map(() => (Math.random() > 0.5 ? 1 : -1))
                )
        );
    };

    return (
        <div>
            <div
                className="grid border mb-4"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                }}
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
                            className={`w-8 h-8 border ${value === -1 ? 'bg-one' : 'bg-minusone'
                                } cursor-pointer`}
                        ></div>
                    ))
                )}
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={saveGrid}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save
                </button>
                <button
                    onClick={clearGrid}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Clear
                </button>
                <button
                    onClick={restoreGrid}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Restore
                </button>
            </div>
        </div>
    );
};

export default Grid;