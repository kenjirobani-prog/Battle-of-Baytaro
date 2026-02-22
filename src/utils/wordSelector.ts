import type { WordEntry, WordStats, GameMode } from '../types';
import { HIRAGANA_WORDS } from '../data/hiraganaWords';
import { ENGLISH_WORDS } from '../data/englishWords';
import { loadWordStats, getOrCreateWordStats } from './storage';

/**
 * Calculate weakness score for a word.
 * Higher = more likely to appear.
 */
function getWeaknessScore(stats: WordStats): number {
  if (stats.timesShown === 0) return 0.5; // neutral for unseen words
  return (stats.timesMissed + stats.timesTimeout * 1.5) / (stats.timesShown + 1);
}

/**
 * Get the max level that should be included based on game progress.
 * As totalCorrect increases, higher level words become available.
 */
function getMaxLevel(totalCorrect: number): number {
  if (totalCorrect < 5) return 1;
  if (totalCorrect < 15) return 2;
  if (totalCorrect < 30) return 3;
  if (totalCorrect < 50) return 4;
  return 5;
}

/**
 * Select the next word considering:
 * - Game progress (level gating)
 * - Weakness scoring (weak words appear more often)
 * - Recent history avoidance (no repeats in last 5)
 */
export function selectWord(
  mode: GameMode,
  totalCorrect: number,
  recentIds: string[]
): WordEntry {
  const allWords = mode === 'hiragana' ? HIRAGANA_WORDS : ENGLISH_WORDS;
  const maxLevel = getMaxLevel(totalCorrect);
  const statsMap = loadWordStats(mode);

  // Filter by level and exclude recent
  const recentSet = new Set(recentIds.slice(-5));
  const candidates = allWords.filter(
    w => w.level <= maxLevel && !recentSet.has(w.id)
  );

  if (candidates.length === 0) {
    // Fallback: just pick from all words excluding immediate last
    const lastId = recentIds[recentIds.length - 1];
    const fallback = allWords.filter(w => w.id !== lastId);
    return fallback[Math.floor(Math.random() * fallback.length)] || allWords[0];
  }

  // Weighted random selection based on weakness
  const weights = candidates.map(w => {
    const stats = getOrCreateWordStats(statsMap, w.id, mode);
    const weakness = getWeaknessScore(stats);
    // Base weight 1.0, plus weakness bonus, plus level bonus for harder words
    const levelBonus = totalCorrect > 20 ? (w.level - 1) * 0.1 : 0;
    return 1.0 + weakness * 2.0 + levelBonus;
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let roll = Math.random() * totalWeight;

  for (let i = 0; i < candidates.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return candidates[i];
  }

  return candidates[candidates.length - 1];
}
