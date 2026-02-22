import React from 'react';
import heroSvg from '../assets/hero.svg';
import type { GameRecord } from '../types';
import { loadGameRecord } from '../utils/storage';
import { initAudio } from '../utils/sound';

interface TitleScreenProps {
  onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  const [record, setRecord] = React.useState<GameRecord | null>(null);

  React.useEffect(() => {
    setRecord(loadGameRecord());
  }, []);

  const handleStart = () => {
    initAudio();
    onStart();
  };

  return (
    <div className="title-screen">
      <div className="title-bg-effect" />
      <div className="title-content">
        <div className="title-hero">
          <img src={heroSvg} alt="湊太郎" className="title-hero-img" />
        </div>
        <h1 className="title-main">
          <span className="title-en">Battle of Baytaro</span>
          <span className="title-jp">湊太郎の戦い</span>
        </h1>
        <p className="title-subtitle">タイピングバトル!</p>

        <button className="btn-start" onClick={handleStart}>
          START
        </button>

        {record && (
          <div className="title-records">
            <div className="record-section">
              <h3>今日の記録</h3>
              <p>撃破: {record.today.enemiesDefeated} | コンボ: {record.today.maxCombo} | 正解: {record.today.totalCorrect}</p>
            </div>
            <div className="record-section">
              <h3>自己ベスト</h3>
              <p>撃破: {record.allTime.bestEnemiesDefeated} | コンボ: {record.allTime.bestMaxCombo} | 正解: {record.allTime.bestTotalCorrect}</p>
            </div>
          </div>
        )}
      </div>
      <div className="scanlines" />
    </div>
  );
};
