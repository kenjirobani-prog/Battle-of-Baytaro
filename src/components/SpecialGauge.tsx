import React from 'react';

interface SpecialGaugeProps {
  gauge: number;
  max: number;
  ready: boolean;
}

export const SpecialGauge: React.FC<SpecialGaugeProps> = ({ gauge, max, ready }) => {
  const pct = (gauge / max) * 100;

  return (
    <div className={`special-gauge-container ${ready ? 'special-ready' : ''}`}>
      <div className="special-gauge-label">
        {ready ? '⚡ SPECIAL READY! [Space]' : `SP ${gauge}/${max}`}
      </div>
      <div className="special-gauge-track">
        <div
          className="special-gauge-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
