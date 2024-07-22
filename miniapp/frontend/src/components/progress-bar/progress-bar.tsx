'use client';

import React, { useEffect, useState } from 'react';
import './progress-bar.css';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <main>
      <p className="limit_clicks">{progress} ⚡</p>
      <p className="limit_of_clicks">/6000</p>
      <div className="progress-bar" data-testid="ProgressBar">
        <div
          className="progress-bar-inner"
          style={{ width: `${(progress / 6000) * 100}%` }}
        ></div>
      </div>
    </main>
  );
};

export default ProgressBar;
