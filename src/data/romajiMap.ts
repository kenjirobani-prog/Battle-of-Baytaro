/**
 * Romaji conversion map for hiragana.
 * Each kana maps to an array of accepted romaji spellings.
 * Order: most common first.
 */

// Single kana -> romaji candidates
export const KANA_TO_ROMAJI: Record<string, string[]> = {
  // vowels
  'あ': ['a'], 'い': ['i'], 'う': ['u'], 'え': ['e'], 'お': ['o'],
  // k-row
  'か': ['ka'], 'き': ['ki'], 'く': ['ku'], 'け': ['ke'], 'こ': ['ko'],
  // s-row
  'さ': ['sa'], 'し': ['shi', 'si'], 'す': ['su'], 'せ': ['se'], 'そ': ['so'],
  // t-row
  'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tsu', 'tu'], 'て': ['te'], 'と': ['to'],
  // n-row
  'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
  // h-row
  'は': ['ha'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he'], 'ほ': ['ho'],
  // m-row
  'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
  // y-row
  'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
  // r-row
  'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
  // w-row + n
  'わ': ['wa'], 'を': ['wo'], 'ん': ['nn', 'n'],
  // dakuten k->g
  'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
  // dakuten s->z
  'ざ': ['za'], 'じ': ['ji', 'zi'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
  // dakuten t->d
  'だ': ['da'], 'ぢ': ['di', 'ji'], 'づ': ['du', 'zu'], 'で': ['de'], 'ど': ['do'],
  // dakuten h->b
  'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
  // handakuten h->p
  'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
  // combo kana (きゃ etc.)
  'きゃ': ['kya'], 'きゅ': ['kyu'], 'きょ': ['kyo'],
  'しゃ': ['sha', 'sya'], 'しゅ': ['shu', 'syu'], 'しょ': ['sho', 'syo'],
  'ちゃ': ['cha', 'tya'], 'ちゅ': ['chu', 'tyu'], 'ちょ': ['cho', 'tyo'],
  'にゃ': ['nya'], 'にゅ': ['nyu'], 'にょ': ['nyo'],
  'ひゃ': ['hya'], 'ひゅ': ['hyu'], 'ひょ': ['hyo'],
  'みゃ': ['mya'], 'みゅ': ['myu'], 'みょ': ['myo'],
  'りゃ': ['rya'], 'りゅ': ['ryu'], 'りょ': ['ryo'],
  'ぎゃ': ['gya'], 'ぎゅ': ['gyu'], 'ぎょ': ['gyo'],
  'じゃ': ['ja', 'zya'], 'じゅ': ['ju', 'zyu'], 'じょ': ['jo', 'zyo'],
  'びゃ': ['bya'], 'びゅ': ['byu'], 'びょ': ['byo'],
  'ぴゃ': ['pya'], 'ぴゅ': ['pyu'], 'ぴょ': ['pyo'],
  // small tsu (っ) handled specially in converter
  'っ': ['xtu', 'xtsu'],
  // long vowel mark
  'ー': ['-'],
};

// Characters that start a 2-char combo (きゃ, しゅ, etc.)
export const COMBO_STARTERS = new Set([
  'き', 'し', 'ち', 'に', 'ひ', 'み', 'り',
  'ぎ', 'じ', 'び', 'ぴ',
]);

// Small kana that follow combo starters
export const SMALL_KANA = new Set(['ゃ', 'ゅ', 'ょ']);
