import React from 'react';
import type { PlayerState } from '../types';
import clearPng from '../assets/clear.png';

interface ClearScreenProps {
  player: PlayerState;
  onRetry: () => void;
  onTitle: () => void;
}

export const ClearScreen: React.FC<ClearScreenProps> = ({ player, onRetry, onTitle }) => {
  return (
    <div className="clear-screen">
      <div className="clear-bg-effect" />
      <div className="clear-content">
        <div className="clear-title">GAME CLEAR!</div>
        <div className="clear-image-container">
          <img src={clearPng} alt="Game Clear" className="clear-image" />
        </div>
        <div className="clear-message">全ての敵を倒した！おめでとう！</div>
        <div className="clear-stats">
          <div className="result-stat">
            <span className="result-stat-label">正解数</span>
            <span className="result-stat-value">{player.totalCorrect}</span>
          </div>
          <div className="result-stat">
            <span className="result-stat-label">最大コンボ</span>
            <span className="result-stat-value">{player.maxCombo}</span>
          </div>
        </div>
        <div className="clear-buttons">
          <button className="btn-retry" onClick={onRetry}>もう一度</button>
          <button className="btn-title" onClick={onTitle}>タイトルに戻る</button>
        </div>
      </div>
      <div className="scanlines" />
    </div>
  );
};
