import { KANA_TO_ROMAJI, COMBO_STARTERS, SMALL_KANA } from '../data/romajiMap';

/**
 * Convert a hiragana string into all valid romaji representations.
 * Returns an array of accepted romaji strings.
 *
 * Handles:
 * - Single kana (あ -> a)
 * - Combo kana (しゃ -> sha, sya)
 * - っ (double consonant: っか -> kka)
 * - ん before non-vowel -> n (not nn)
 */
function tokenize(hiragana: string): string[][] {
  const tokens: string[][] = [];
  let i = 0;

  while (i < hiragana.length) {
    const char = hiragana[i];
    const nextChar = hiragana[i + 1];

    // Check for combo kana (2-char pairs like きゃ)
    if (nextChar && COMBO_STARTERS.has(char) && SMALL_KANA.has(nextChar)) {
      const combo = char + nextChar;
      const candidates = KANA_TO_ROMAJI[combo];
      if (candidates) {
        tokens.push(candidates);
        i += 2;
        continue;
      }
    }

    // っ (small tsu) -> double the next consonant
    if (char === 'っ') {
      // Look ahead to get the next kana's romaji
      if (i + 1 < hiragana.length) {
        // We'll handle this by adding a special marker
        // The next token's first consonant gets doubled
        tokens.push(['__DOUBLE__']);
        i += 1;
        continue;
      }
      // Trailing っ
      tokens.push(KANA_TO_ROMAJI['っ'] || ['xtu']);
      i += 1;
      continue;
    }

    // ん special handling: before vowel/y -> nn, otherwise -> n or nn
    if (char === 'ん') {
      if (nextChar) {
        const nextRomaji = KANA_TO_ROMAJI[nextChar];
        const startsWithVowelOrY = nextRomaji?.some(r =>
          /^[aiueoy]/.test(r)
        );
        if (startsWithVowelOrY) {
          // Must use nn before vowels/y to avoid ambiguity
          tokens.push(['nn']);
        } else {
          tokens.push(['n', 'nn']);
        }
      } else {
        // Word-final ん
        tokens.push(['n', 'nn']);
      }
      i += 1;
      continue;
    }

    // Regular single kana
    const candidates = KANA_TO_ROMAJI[char];
    if (candidates) {
      tokens.push(candidates);
    } else {
      // Unknown character - pass through
      tokens.push([char]);
    }
    i += 1;
  }

  // Post-process: handle __DOUBLE__ markers
  const processed: string[][] = [];
  for (let j = 0; j < tokens.length; j++) {
    if (tokens[j][0] === '__DOUBLE__' && j + 1 < tokens.length) {
      // Double the first consonant of the next token
      const nextCandidates = tokens[j + 1];
      const doubled = nextCandidates.map(r => r[0] + r);
      processed.push(doubled);
      j++; // skip next token (already consumed)
    } else if (tokens[j][0] === '__DOUBLE__') {
      // Trailing っ with nothing after
      processed.push(['xtu', 'xtsu']);
    } else {
      processed.push(tokens[j]);
    }
  }

  return processed;
}

/**
 * Generate all valid romaji combinations for a hiragana string.
 * To avoid combinatorial explosion, we limit to a reasonable number.
 */
function generateCombinations(tokens: string[][]): string[] {
  if (tokens.length === 0) return [''];

  let results: string[] = [''];
  for (const candidates of tokens) {
    const newResults: string[] = [];
    for (const prefix of results) {
      for (const candidate of candidates) {
        newResults.push(prefix + candidate);
      }
      // Cap at 50 combinations to prevent explosion
      if (newResults.length > 50) break;
    }
    results = newResults;
    if (results.length > 50) {
      results = results.slice(0, 50);
    }
  }
  return results;
}

/**
 * Check if a romaji input matches the hiragana word.
 */
export function isValidRomaji(hiragana: string, input: string): boolean {
  const tokens = tokenize(hiragana);
  const validCombinations = generateCombinations(tokens);
  const normalizedInput = input.toLowerCase().trim();
  return validCombinations.some(combo => combo === normalizedInput);
}

/**
 * Get the primary (first/most common) romaji for a hiragana word.
 * Used as a display hint.
 */
export function getPrimaryRomaji(hiragana: string): string {
  const tokens = tokenize(hiragana);
  return tokens.map(candidates => candidates[0]).join('');
}
