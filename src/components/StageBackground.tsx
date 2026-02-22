import React from 'react';

interface StageBackgroundProps {
  bgClass: string;
}

export const StageBackground: React.FC<StageBackgroundProps> = ({ bgClass }) => {
  return (
    <div className={`stage-bg ${bgClass}`}>
      <div className="stage-bg-overlay" />
      <div className="stage-grid" />
    </div>
  );
};
