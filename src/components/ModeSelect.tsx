import React from 'react';
import type { GameMode } from '../types';

interface ModeSelectProps {
  onSelect: (mode: GameMode) => void;
  onBack: () => void;
}

export const ModeSelect: React.FC<ModeSelectProps> = ({ onSelect, onBack }) => {
  return (
    <div className="mode-select">
      <div className="mode-select-content">
        <h2 className="mode-title">モード選択</h2>
        <div className="mode-cards">
          <button
            className="mode-card mode-card-homeposition"
            onClick={() => onSelect('homeposition')}
          >
            <div className="mode-card-icon">⌨</div>
            <div className="mode-card-label">ホームポジション</div>
            <div className="mode-card-desc">キーボード練習＋ローマ字</div>
          </button>
          <button
            className="mode-card mode-card-hiragana"
            onClick={() => onSelect('hiragana')}
          >
            <div className="mode-card-icon">あ</div>
            <div className="mode-card-label">ひらがな</div>
            <div className="mode-card-desc">ひらがなでタイピング</div>
          </button>
          <button
            className="mode-card mode-card-english"
            onClick={() => onSelect('english')}
          >
            <div className="mode-card-icon">A</div>
            <div className="mode-card-label">英単語</div>
            <div className="mode-card-desc">英検5級レベル</div>
          </button>
        </div>
        <button className="btn-back" onClick={onBack}>
          もどる
        </button>
      </div>
      <div className="scanlines" />
    </div>
  );
};
