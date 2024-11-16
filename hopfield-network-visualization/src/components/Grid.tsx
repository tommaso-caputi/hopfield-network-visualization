import React, { useState } from 'react';

interface GridProps {
    gridSize: number; // Size of the grid (number of cells per row/column)
    onSave: (flatGrid: number[]) => void; // Callback to save grid state
    weightMatrix: number[][]; // Weight matrix for Hopfield network
}

const Grid: React.FC<GridProps> = ({ gridSize, onSave, weightMatrix }) => {
    const [grid, setGrid] = useState(
        Array(gridSize)
            .fill(null)
            .map(() => Array(gridSize).fill(-1))
    );

    const [isMouseDown, setIsMouseDown] = useState(false); // Track if the mouse button is pressed

    // Toggle a cell's value
    const toggleCellValue = (row: number, col: number) => {
        setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[row] = [...newGrid[row]];
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

    // Save the grid and clear it
    const saveGrid = () => {
        const flatGrid = grid.flat(); // Flatten the grid
        onSave(flatGrid); // Notify the parent
        clearGrid(); // Reset the grid
    };

    // Restore the grid using the weight matrix
    const restoreGrid = () => {
        if (weightMatrix.length === 0) {
            alert("Weight matrix is empty. Cannot restore.");
            return;
        }

        const flatGrid = grid.flat(); // Flatten the grid

        // Apply the Hopfield recall rule
        const restoredFlatGrid = flatGrid.map((_, i) => {
            const weightedSum = weightMatrix[i].reduce(
                (sum, weight, j) => sum + weight * flatGrid[j],
                0
            );
            return weightedSum >= 0 ? 1 : -1; // Apply sign function
        });

        // Convert back to 2D grid and update state
        const restoredGrid = [];
        for (let i = 0; i < gridSize; i++) {
            restoredGrid.push(
                restoredFlatGrid.slice(i * gridSize, (i + 1) * gridSize)
            );
        }
        setGrid(restoredGrid);
    };

    return (
        <div>
            <div
                className="grid mb-4"
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
            <div className="flex space-x-4 justify-center">
                <button
                    onClick={saveGrid}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Store
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