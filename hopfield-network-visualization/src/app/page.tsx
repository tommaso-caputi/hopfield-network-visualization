"use client";

import Grid from '@/components/Grid';
import React, { useState } from 'react';

export default function Home() {
  const [savedGrids, setSavedGrids] = useState<number[][]>([]); // Store multiple saved grids

  const handleSave = (flatGrid: number[]) => {
    setSavedGrids((prevGrids) => [...prevGrids, flatGrid]); // Append the new grid
    console.log('Saved Grid:', flatGrid); // Log the saved grid
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mb-4 font-bold">Interactive Grid</h1>
      <Grid gridSize={10} onSave={handleSave} />
      {savedGrids.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">Saved Grids:</h2>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {savedGrids.map((grid, index) => (
              <li key={index}>
                Grid {index + 1}: {grid.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}