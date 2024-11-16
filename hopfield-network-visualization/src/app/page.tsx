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

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mb-4 font-bold">Interactive Grid</h1>
      <Grid gridSize={10} onSave={handleSave} />
      {savedGrids.length > 0 && <SavedGrids savedGrids={savedGrids} gridSize={10} />}
    </div>
  );
}