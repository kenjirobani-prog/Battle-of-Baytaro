import type { WordStats, GameMode, DayRecord, AllTimeRecord, GameRecord } from '../types';

const STORAGE_KEYS = {
  WORD_STATS: 'bob_word_stats',
  GAME_RECORD: 'bob_game_record',
} as const;

function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ── Word Stats ──

export function loadWordStats(mode: GameMode): Record<string, WordStats> {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.WORD_STATS}_${mode}`);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

export function saveWordStats(mode: GameMode, stats: Record<string, WordStats>): void {
  try {
    localStorage.setItem(`${STORAGE_KEYS.WORD_STATS}_${mode}`, JSON.stringify(stats));
  } catch { /* ignore */ }
}

export function getOrCreateWordStats(
  statsMap: Record<string, WordStats>,
  wordId: string,
  mode: GameMode
): WordStats {
  if (!statsMap[wordId]) {
    statsMap[wordId] = {
      wordId,
      mode,
      timesShown: 0,
      timesCorrect: 0,
      timesMissed: 0,
      timesTimeout: 0,
      totalInputTimeMs: 0,
    };
  }
  return statsMap[wordId];
}

// ── Game Record ──

function defaultDayRecord(): DayRecord {
  return {
    date: getToday(),
    enemiesDefeated: 0,
    maxCombo: 0,
    totalCorrect: 0,
  };
}

function defaultAllTime(): AllTimeRecord {
  return {
    bestEnemiesDefeated: 0,
    bestMaxCombo: 0,
    bestTotalCorrect: 0,
  };
}

export function loadGameRecord(): GameRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GAME_RECORD);
    if (raw) {
      const record: GameRecord = JSON.parse(raw);
      // Reset today if date doesn't match
      if (record.today.date !== getToday()) {
        record.today = defaultDayRecord();
      }
      return record;
    }
  } catch { /* ignore */ }
  return { today: defaultDayRecord(), allTime: defaultAllTime() };
}

export function saveGameRecord(record: GameRecord): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_RECORD, JSON.stringify(record));
  } catch { /* ignore */ }
}

export function updateGameRecord(
  enemiesDefeated: number,
  maxCombo: number,
  totalCorrect: number
): GameRecord {
  const record = loadGameRecord();

  // Update today
  record.today.enemiesDefeated += enemiesDefeated;
  record.today.maxCombo = Math.max(record.today.maxCombo, maxCombo);
  record.today.totalCorrect += totalCorrect;

  // Update all-time bests
  record.allTime.bestEnemiesDefeated = Math.max(
    record.allTime.bestEnemiesDefeated,
    record.today.enemiesDefeated
  );
  record.allTime.bestMaxCombo = Math.max(record.allTime.bestMaxCombo, maxCombo);
  record.allTime.bestTotalCorrect = Math.max(
    record.allTime.bestTotalCorrect,
    record.today.totalCorrect
  );

  saveGameRecord(record);
  return record;
}
