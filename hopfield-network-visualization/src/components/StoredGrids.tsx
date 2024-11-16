import React from 'react';

interface SavedGridsProps {
    savedGrids: number[][]; // Array of saved grids
    gridSize: number; // Size of each grid
}

const SavedGrids: React.FC<SavedGridsProps> = ({ savedGrids, gridSize }) => {
    return (
        <div className="mt-4">
            <h2 className="text-lg font-medium mb-2">Saved Grids:</h2>
            <div className="flex flex-wrap gap-4">
                {savedGrids.map((grid, index) => (
                    <div key={index}>
                        <p className="text-sm text-gray-600 mb-1">Grid {index + 1}:</p>
                        <div
                            className="grid gap-1"
                            style={{
                                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                            }}
                        >
                            {grid.map((value, cellIndex) => (
                                <div
                                    key={cellIndex}
                                    className={`w-4 h-4 ${value === -1 ? 'bg-one' : 'bg-minusone'
                                        } border`}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedGrids;