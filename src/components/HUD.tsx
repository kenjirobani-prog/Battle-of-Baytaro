import React from 'react';

interface HUDProps {
  timeRemaining: number;
  timeLimit: number;
  totalCorrect: number;
  combo: number;
  enemiesDefeated: number;
  stageName: string;
}

export const HUD: React.FC<HUDProps> = ({
  timeRemaining,
  timeLimit,
  totalCorrect,
  combo,
  enemiesDefeated,
  stageName,
}) => {
  const timePct = (timeRemaining / timeLimit) * 100;
  const isUrgent = timeRemaining < 5;

  return (
    <div className="hud">
      <div className="hud-row">
        <div className="hud-stage">{stageName}</div>
        <div className="hud-stats">
          <span className="hud-stat">正解: {totalCorrect}</span>
          <span className={`hud-stat hud-combo ${combo >= 5 ? 'combo-hot' : ''}`}>
            {combo > 0 ? `${combo} COMBO!` : ''}
          </span>
          <span className="hud-stat">撃破: {enemiesDefeated}</span>
        </div>
      </div>
      <div className={`hud-timer-bar ${isUrgent ? 'timer-urgent' : ''}`}>
        <div
          className="hud-timer-fill"
          style={{ transform: `scaleX(${timePct / 100})` }}
        />
        <span className="hud-timer-text">
          {timeRemaining.toFixed(1)}s
        </span>
      </div>
    </div>
  );
};
