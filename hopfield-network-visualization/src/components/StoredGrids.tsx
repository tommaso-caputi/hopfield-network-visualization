import React from 'react';

interface savedPatternsProps {
    savedPatterns: number[][]; // Array of saved grids
    gridSize: number; // Size of each grid
}

const SavedPatterns: React.FC<savedPatternsProps> = ({ savedPatterns, gridSize }) => {
    return (
        <div className="flex justify-start">
            <div className="mt-4">
                <h2 className="text-lg font-medium mb-2">Saved Patterns</h2>
                <div className="flex flex-wrap gap-4">
                    {savedPatterns.map((grid, index) => (
                        <div key={index}>
                            {/* <p className="text-sm text-gray-600 text-center">Pattern {index + 1}</p> */}
                            <div
                                className="grid"
                                style={{
                                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                                }}
                            >
                                {grid.map((value, cellIndex) => (
                                    <div
                                        key={cellIndex}
                                        className={`w-4 h-4 ${value === -1 ? 'bg-one' : 'bg-minusone'} `}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SavedPatterns;