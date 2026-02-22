// ── Game Types ──

export type GameMode = 'hiragana' | 'english';

export type SceneState =
  | 'TITLE'
  | 'MODE_SELECT'
  | 'ENEMY_APPEAR'
  | 'QUESTION'
  | 'ATTACK'
  | 'DEFEAT'
  | 'LEVEL_UP'
  | 'SPECIAL'
  | 'DAMAGE'
  | 'GAME_OVER'
  | 'RESULT';

export interface WordEntry {
  id: string;
  display: string;      // what the player sees
  answer: string;        // correct answer (romaji for hiragana, lowercase for english)
  meaning?: string;      // optional hint/meaning
  level: number;         // difficulty 1-5
}

export interface WordStats {
  wordId: string;
  mode: GameMode;
  timesShown: number;
  timesCorrect: number;
  timesMissed: number;    // wrong answers submitted
  timesTimeout: number;
  totalInputTimeMs: number;
}

export interface EnemyData {
  level: number;
  name: string;
  maxHp: number;
  currentHp: number;
  svgIndex: number;      // which enemy SVG to use
}

export interface StageData {
  id: number;
  name: string;
  bgClass: string;       // CSS class for background
  requiredDefeats: number; // enemies defeated to unlock
}

export interface PlayerState {
  hp: number;
  maxHp: number;
  combo: number;
  maxCombo: number;
  specialGauge: number;  // 0-10
  specialReady: boolean;
  totalCorrect: number;
  enemiesDefeated: number;
  currentStage: number;
}

export interface DayRecord {
  date: string;          // YYYY-MM-DD
  enemiesDefeated: number;
  maxCombo: number;
  totalCorrect: number;
}

export interface AllTimeRecord {
  bestEnemiesDefeated: number;
  bestMaxCombo: number;
  bestTotalCorrect: number;
}

export interface GameRecord {
  today: DayRecord;
  allTime: AllTimeRecord;
}
