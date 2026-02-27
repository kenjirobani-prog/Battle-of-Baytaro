import React from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { TitleScreen } from './components/TitleScreen';
import { ModeSelect } from './components/ModeSelect';
import { BattleScreen } from './components/BattleScreen';
import { ResultScreen } from './components/ResultScreen';
import { ClearScreen } from './components/ClearScreen';
import type { GameMode } from './types';

const App: React.FC = () => {
  const engine = useGameEngine();

  const handleTitleStart = () => {
    engine.setMode('hiragana'); // go to mode select
  };

  const handleModeSelect = (mode: GameMode) => {
    engine.setMode(mode);
    // After mode is set, start the game
    setTimeout(() => {
      engine.startGame();
    }, 50);
  };

  const handleRetry = () => {
    engine.startGame();
  };

  const handleBackToTitle = () => {
    engine.returnToTitle();
  };

  // Route by scene
  if (engine.scene === 'TITLE') {
    return <TitleScreen onStart={handleTitleStart} />;
  }

  if (engine.scene === 'MODE_SELECT') {
    return (
      <ModeSelect
        onSelect={handleModeSelect}
        onBack={handleBackToTitle}
      />
    );
  }

  if (engine.scene === 'GAME_CLEAR') {
    return (
      <ClearScreen
        player={engine.player}
        onRetry={handleRetry}
        onTitle={handleBackToTitle}
      />
    );
  }

  if (engine.scene === 'RESULT') {
    return (
      <ResultScreen
        player={engine.player}
        sessionEnemiesDefeated={engine.sessionEnemiesDefeated}
        onRetry={handleRetry}
        onTitle={handleBackToTitle}
      />
    );
  }

  // All battle scenes
  return <BattleScreen engine={engine} />;
};

export default App;
