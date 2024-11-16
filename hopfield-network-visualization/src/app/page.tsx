"use client";

import Grid from '@/components/Grid';
import SavedGrids from '@/components/StoredGrids';
import React, { useState } from 'react';

export default function Home() {
  const [savedGrids, setSavedGrids] = useState<number[][]>([]); // Store multiple saved grids

  const handleSave = (flatGrid: number[]) => {
    setSavedGrids((prevGrids) => [...prevGrids, flatGrid]); // Append the new grid
    console.log('Saved Grid:', flatGrid); // Log the saved grid
  };

  const clearMemory = () => {
    setSavedGrids([]); // Clear all saved grids
    console.log('Memory Cleared');
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mb-4 font-bold">Interactive Grid</h1>
      <Grid gridSize={10} onSave={handleSave} />
      {savedGrids.length > 0 && (
        <>
          <SavedGrids savedGrids={savedGrids} gridSize={10} />
          <button
            onClick={clearMemory}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Memory
          </button>
        </>
      )}
    </div>
  );
}