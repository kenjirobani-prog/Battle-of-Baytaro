import React, { useEffect } from 'react';
import type { GameEngine } from '../hooks/useGameEngine';
import { StageBackground } from './StageBackground';
import { HUD } from './HUD';
import { HPBar } from './HPBar';
import { EnemyCard } from './EnemyCard';
import { InputArea } from './InputArea';
import { SpecialGauge } from './SpecialGauge';
import { EffectOverlay } from './EffectOverlay';
import heroPng from '../assets/hero.png';

interface BattleScreenProps {
  engine: GameEngine;
}

export const BattleScreen: React.FC<BattleScreenProps> = ({ engine }) => {
  const {
    scene,
    mode,
    player,
    enemy,
    currentWord,
    input,
    timeRemaining,
    timeLimit,
    stage,
    sessionEnemiesDefeated,
    setInput,
    submitAnswer,
    activateSpecial,
    returnToTitle,
  } = engine;

  // Space key for special
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' && player.specialReady && scene === 'QUESTION') {
        e.preventDefault();
        activateSpecial();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [player.specialReady, scene, activateSpecial]);

  const isInputActive = scene === 'QUESTION';

  return (
    <div className="battle-screen">
      <StageBackground bgClass={stage.bgClass} />

      <div className="battle-content">
        <div className="battle-top-bar">
          <HUD
            timeRemaining={timeRemaining}
            timeLimit={timeLimit}
            totalCorrect={player.totalCorrect}
            combo={player.combo}
            enemiesDefeated={sessionEnemiesDefeated}
            stageName={stage.name}
          />
          <button className="btn-return-title" onClick={returnToTitle}>
            タイトルに戻る
          </button>
        </div>

        <div className="battle-field">
          {/* Player side */}
          <div className="player-side">
            <div className="player-portrait">
              <img src={heroPng} alt="湊太郎" className="player-img" />
            </div>
            <HPBar
              current={player.hp}
              max={player.maxHp}
              label="湊太郎"
              color="#44ff44"
            />
          </div>

          {/* VS */}
          <div className="vs-divider">
            <span className="vs-text">VS</span>
          </div>

          {/* Enemy side */}
          <div className="enemy-side">
            <EnemyCard enemy={enemy} scene={scene} />
          </div>
        </div>

        {/* Special gauge */}
        <SpecialGauge
          gauge={player.specialGauge}
          max={10}
          ready={player.specialReady}
        />

        {/* Input area */}
        {mode && (
          <InputArea
            word={currentWord}
            mode={mode}
            input={input}
            onInputChange={setInput}
            onSubmit={submitAnswer}
            disabled={!isInputActive}
          />
        )}
      </div>

      {/* Effect overlays */}
      <EffectOverlay scene={scene} />

      <div className="scanlines" />
    </div>
  );
};
