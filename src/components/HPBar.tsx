import React from 'react';

interface HPBarProps {
  current: number;
  max: number;
  label: string;
  color: string;
  reverse?: boolean;
}

export const HPBar: React.FC<HPBarProps> = ({ current, max, label, color, reverse }) => {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  const isLow = pct < 25;

  return (
    <div className={`hp-bar-container ${reverse ? 'hp-bar-reverse' : ''}`}>
      <span className="hp-label">{label}</span>
      <div className="hp-bar-track">
        <div
          className={`hp-bar-fill ${isLow ? 'hp-bar-low' : ''}`}
          style={{
            width: `${pct}%`,
            background: isLow ? '#ff3333' : color,
          }}
        />
      </div>
      <span className="hp-text">{Math.ceil(current)}/{max}</span>
    </div>
  );
};
