"use client";

import Grid from '@/components/Grid';
import SavedGrids from '@/components/StoredGrids';
import React, { useState } from 'react';

export default function Home() {
  const [savedGrids, setSavedGrids] = useState<number[][]>([]); // Store multiple saved grids
  const [weightMatrix, setWeightMatrix] = useState<number[][]>([]); // Weight matrix for the Hopfield network

  const gridSize = 10; // Grid size (10x10)

  // Initialize the weight matrix
  const initializeWeightMatrix = (size: number) =>
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));

  // Calculate the outer product and update the weight matrix
  const updateWeightMatrix = (flatGrid: number[]) => {
    const size = flatGrid.length;

    // Initialize the weight matrix if it's empty
    if (weightMatrix.length === 0) {
      setWeightMatrix(initializeWeightMatrix(size));
    }

    // Update the weight matrix using the outer product
    setWeightMatrix((prevMatrix) => {
      const newMatrix = [...prevMatrix];
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (i !== j) {
            newMatrix[i][j] += flatGrid[i] * flatGrid[j];
          }
        }
      }
      return newMatrix;
    });
  };

  const handleSave = (flatGrid: number[]) => {
    setSavedGrids((prevGrids) => [...prevGrids, flatGrid]); // Append the new grid
    updateWeightMatrix(flatGrid); // Update the weight matrix
    console.log('Saved Grid:', flatGrid); // Log the saved grid
  };

  const clearMemory = () => {
    setSavedGrids([]); // Clear all saved grids
    setWeightMatrix([]); // Reset the weight matrix
    console.log('Memory Cleared');
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mb-4 font-bold">Interactive Grid with Hopfield Network</h1>
      <Grid gridSize={gridSize} onSave={handleSave} weightMatrix={weightMatrix} />
      {savedGrids.length > 0 && (
        <>
          <SavedGrids savedGrids={savedGrids} gridSize={gridSize} />
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