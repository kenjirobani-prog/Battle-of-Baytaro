import type { WordEntry } from '../types';

// ── Finger assignments ──
export type FingerName =
  | 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index'
  | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky';

export const FINGER_MAP: Record<string, FingerName> = {
  // Left pinky
  Q: 'left-pinky', A: 'left-pinky', Z: 'left-pinky',
  // Left ring
  W: 'left-ring', S: 'left-ring', X: 'left-ring',
  // Left middle
  E: 'left-middle', D: 'left-middle', C: 'left-middle',
  // Left index
  R: 'left-index', T: 'left-index', F: 'left-index', G: 'left-index',
  V: 'left-index', B: 'left-index',
  // Right index
  Y: 'right-index', U: 'right-index', H: 'right-index', J: 'right-index',
  N: 'right-index', M: 'right-index',
  // Right middle
  I: 'right-middle', K: 'right-middle',
  // Right ring
  O: 'right-ring', L: 'right-ring',
  // Right pinky
  P: 'right-pinky',
};

export const FINGER_COLORS: Record<FingerName, string> = {
  'left-pinky':  '#ff6b9d',
  'left-ring':   '#ffa94d',
  'left-middle': '#ffd43b',
  'left-index':  '#69db7c',
  'right-index': '#69db7c',
  'right-middle':'#ffd43b',
  'right-ring':  '#ffa94d',
  'right-pinky': '#ff6b9d',
};

// ── Keyboard layout ──
export const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export const HOME_KEYS = new Set(['A', 'S', 'D', 'F', 'J', 'K', 'L']);

// ── Helper to get finger for first character of answer ──
export function getFingerForKey(key: string): FingerName | null {
  return FINGER_MAP[key.toUpperCase()] ?? null;
}

// ── Word entries for homeposition mode ──

// Level 1: Home row (ASDF JKL)
const HOME_ROW_KEYS = ['A', 'S', 'D', 'F', 'J', 'K', 'L'];

// Level 2: + upper row
const UPPER_ROW_KEYS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];

// Level 3: + lower row (all alphabet)
const LOWER_ROW_KEYS = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'G', 'H'];

// Level 4: Basic romaji (あ行〜わ行)
const BASIC_ROMAJI: { display: string; answer: string }[] = [
  // あ行
  { display: 'あ', answer: 'a' },
  { display: 'い', answer: 'i' },
  { display: 'う', answer: 'u' },
  { display: 'え', answer: 'e' },
  { display: 'お', answer: 'o' },
  // か行
  { display: 'か', answer: 'ka' },
  { display: 'き', answer: 'ki' },
  { display: 'く', answer: 'ku' },
  { display: 'け', answer: 'ke' },
  { display: 'こ', answer: 'ko' },
  // さ行
  { display: 'さ', answer: 'sa' },
  { display: 'し', answer: 'si' },
  { display: 'す', answer: 'su' },
  { display: 'せ', answer: 'se' },
  { display: 'そ', answer: 'so' },
  // た行
  { display: 'た', answer: 'ta' },
  { display: 'ち', answer: 'ti' },
  { display: 'つ', answer: 'tu' },
  { display: 'て', answer: 'te' },
  { display: 'と', answer: 'to' },
  // な行
  { display: 'な', answer: 'na' },
  { display: 'に', answer: 'ni' },
  { display: 'ぬ', answer: 'nu' },
  { display: 'ね', answer: 'ne' },
  { display: 'の', answer: 'no' },
  // は行
  { display: 'は', answer: 'ha' },
  { display: 'ひ', answer: 'hi' },
  { display: 'ふ', answer: 'hu' },
  { display: 'へ', answer: 'he' },
  { display: 'ほ', answer: 'ho' },
  // ま行
  { display: 'ま', answer: 'ma' },
  { display: 'み', answer: 'mi' },
  { display: 'む', answer: 'mu' },
  { display: 'め', answer: 'me' },
  { display: 'も', answer: 'mo' },
  // や行
  { display: 'や', answer: 'ya' },
  { display: 'ゆ', answer: 'yu' },
  { display: 'よ', answer: 'yo' },
  // ら行
  { display: 'ら', answer: 'ra' },
  { display: 'り', answer: 'ri' },
  { display: 'る', answer: 'ru' },
  { display: 'れ', answer: 're' },
  { display: 'ろ', answer: 'ro' },
  // わ行
  { display: 'わ', answer: 'wa' },
  { display: 'を', answer: 'wo' },
  { display: 'ん', answer: 'nn' },
];

// Level 5: 濁音・半濁音・拗音
const ADVANCED_ROMAJI: { display: string; answer: string }[] = [
  // 濁音
  { display: 'が', answer: 'ga' },
  { display: 'ぎ', answer: 'gi' },
  { display: 'ぐ', answer: 'gu' },
  { display: 'げ', answer: 'ge' },
  { display: 'ご', answer: 'go' },
  { display: 'ざ', answer: 'za' },
  { display: 'じ', answer: 'zi' },
  { display: 'ず', answer: 'zu' },
  { display: 'ぜ', answer: 'ze' },
  { display: 'ぞ', answer: 'zo' },
  { display: 'だ', answer: 'da' },
  { display: 'ぢ', answer: 'di' },
  { display: 'づ', answer: 'du' },
  { display: 'で', answer: 'de' },
  { display: 'ど', answer: 'do' },
  { display: 'ば', answer: 'ba' },
  { display: 'び', answer: 'bi' },
  { display: 'ぶ', answer: 'bu' },
  { display: 'べ', answer: 'be' },
  { display: 'ぼ', answer: 'bo' },
  // 半濁音
  { display: 'ぱ', answer: 'pa' },
  { display: 'ぴ', answer: 'pi' },
  { display: 'ぷ', answer: 'pu' },
  { display: 'ぺ', answer: 'pe' },
  { display: 'ぽ', answer: 'po' },
  // 拗音
  { display: 'きゃ', answer: 'kya' },
  { display: 'きゅ', answer: 'kyu' },
  { display: 'きょ', answer: 'kyo' },
  { display: 'しゃ', answer: 'sya' },
  { display: 'しゅ', answer: 'syu' },
  { display: 'しょ', answer: 'syo' },
  { display: 'ちゃ', answer: 'tya' },
  { display: 'ちゅ', answer: 'tyu' },
  { display: 'ちょ', answer: 'tyo' },
  { display: 'にゃ', answer: 'nya' },
  { display: 'にゅ', answer: 'nyu' },
  { display: 'にょ', answer: 'nyo' },
  { display: 'ひゃ', answer: 'hya' },
  { display: 'ひゅ', answer: 'hyu' },
  { display: 'ひょ', answer: 'hyo' },
  { display: 'みゃ', answer: 'mya' },
  { display: 'みゅ', answer: 'myu' },
  { display: 'みょ', answer: 'myo' },
  { display: 'りゃ', answer: 'rya' },
  { display: 'りゅ', answer: 'ryu' },
  { display: 'りょ', answer: 'ryo' },
];

// Build all word entries
export const HOMEPOSITION_WORDS: WordEntry[] = [
  // Level 1: Home row
  ...HOME_ROW_KEYS.map(k => ({
    id: `hp-${k.toLowerCase()}`,
    display: k,
    answer: k.toLowerCase(),
    level: 1,
  })),
  // Level 2: Upper row
  ...UPPER_ROW_KEYS.map(k => ({
    id: `hp-${k.toLowerCase()}`,
    display: k,
    answer: k.toLowerCase(),
    level: 2,
  })),
  // Level 3: Lower row + G, H
  ...LOWER_ROW_KEYS.map(k => ({
    id: `hp-${k.toLowerCase()}`,
    display: k,
    answer: k.toLowerCase(),
    level: 3,
  })),
  // Level 4: Basic romaji
  ...BASIC_ROMAJI.map(r => ({
    id: `hp-romaji-${r.answer}`,
    display: r.display,
    answer: r.answer,
    meaning: r.answer.toUpperCase(),
    level: 4,
  })),
  // Level 5: Advanced romaji
  ...ADVANCED_ROMAJI.map(r => ({
    id: `hp-romaji-${r.answer}`,
    display: r.display,
    answer: r.answer,
    meaning: r.answer.toUpperCase(),
    level: 5,
  })),
];
