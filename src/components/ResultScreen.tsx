import React from 'react';
import type { PlayerState } from '../types';
import { loadGameRecord } from '../utils/storage';
import heroSvg from '../assets/hero.svg';

interface ResultScreenProps {
  player: PlayerState;
  sessionEnemiesDefeated: number;
  onRetry: () => void;
  onTitle: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  player,
  sessionEnemiesDefeated,
  onRetry,
  onTitle,
}) => {
  const record = loadGameRecord();

  return (
    <div className="result-screen">
      <div className="result-content">
        <h2 className="result-title">RESULT</h2>

        <div className="result-hero">
          <img src={heroSvg} alt="湊太郎" className="result-hero-img" />
        </div>

        <div className="result-stats">
          <div className="result-stat">
            <span className="result-stat-label">倒した敵</span>
            <span className="result-stat-value">{sessionEnemiesDefeated}</span>
          </div>
          <div className="result-stat">
            <span className="result-stat-label">最大コンボ</span>
            <span className="result-stat-value">{player.maxCombo}</span>
          </div>
          <div className="result-stat">
            <span className="result-stat-label">正解数</span>
            <span className="result-stat-value">{player.totalCorrect}</span>
          </div>
        </div>

        <div className="result-records">
          <h3>今日の記録</h3>
          <p>撃破: {record.today.enemiesDefeated} | コンボ: {record.today.maxCombo}</p>
          <h3>自己ベスト</h3>
          <p>撃破: {record.allTime.bestEnemiesDefeated} | コンボ: {record.allTime.bestMaxCombo}</p>
        </div>

        <div className="result-buttons">
          <button className="btn-retry" onClick={onRetry}>
            リトライ
          </button>
          <button className="btn-title" onClick={onTitle}>
            タイトルへ
          </button>
        </div>
      </div>
      <div className="scanlines" />
    </div>
  );
};
