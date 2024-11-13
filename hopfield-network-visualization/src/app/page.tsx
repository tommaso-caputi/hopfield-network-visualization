"use client";

import React, { useState } from 'react';
import Grid from "@/components/Grid";

export default function Home() {
  const [patterns, setPatterns] = useState<number[][]>([]);

  const handleSavePattern = (newPattern: number[]) => {
    setPatterns([...patterns, newPattern]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-9/12 sm:w-96 border-2 mb-4 aspect-square">
        <Grid onSavePattern={handleSavePattern} />
      </div>
      <div>
        {/* Additional content can go here */}
      </div>
    </div>
  );
}