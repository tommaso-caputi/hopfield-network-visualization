"use client";

import Grid from '@/components/Grid';
import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mb-4">Interactive Grid</h1>
      <Grid gridSize={10} />
    </div>
  );
}