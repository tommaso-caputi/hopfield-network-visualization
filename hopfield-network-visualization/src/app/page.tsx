"use client";

import React, { useState } from 'react';
import Grid from "@/components/Grid";

export default function Home() {
  const [patterns, setPatterns] = useState<boolean[][][]>([]);

  const handleSavePattern = (newPattern: boolean[][]) => {
    setPatterns([...patterns, newPattern]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-3/6 border-2 mb-4">
        <Grid onSavePattern={handleSavePattern} />
      </div>
      <div>
        <h2>Saved Patterns</h2>
        {patterns.map((pattern, index) => (
          <div key={index} className="mb-2">
            Pattern {index + 1}:
            <pre>{JSON.stringify(pattern, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}