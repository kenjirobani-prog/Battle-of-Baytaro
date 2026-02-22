import type { WordEntry } from '../types';

/**
 * Hiragana word list for typing practice.
 * display: hiragana, answer: primary romaji (used for display hint).
 * Actual validation uses the romaji converter which accepts multiple spellings.
 */
export const HIRAGANA_WORDS: WordEntry[] = [
  // Level 1: 2-3 chars
  { id: 'h01', display: 'ねこ', answer: 'neko', level: 1 },
  { id: 'h02', display: 'いぬ', answer: 'inu', level: 1 },
  { id: 'h03', display: 'さる', answer: 'saru', level: 1 },
  { id: 'h04', display: 'うみ', answer: 'umi', level: 1 },
  { id: 'h05', display: 'やま', answer: 'yama', level: 1 },
  { id: 'h06', display: 'かわ', answer: 'kawa', level: 1 },
  { id: 'h07', display: 'そら', answer: 'sora', level: 1 },
  { id: 'h08', display: 'はな', answer: 'hana', level: 1 },
  { id: 'h09', display: 'ほし', answer: 'hoshi', level: 1 },
  { id: 'h10', display: 'もり', answer: 'mori', level: 1 },
  { id: 'h11', display: 'くも', answer: 'kumo', level: 1 },
  { id: 'h12', display: 'かぜ', answer: 'kaze', level: 1 },
  { id: 'h13', display: 'あめ', answer: 'ame', level: 1 },
  { id: 'h14', display: 'ゆき', answer: 'yuki', level: 1 },
  { id: 'h15', display: 'ひる', answer: 'hiru', level: 1 },

  // Level 2: 3-4 chars
  { id: 'h16', display: 'さくら', answer: 'sakura', level: 2 },
  { id: 'h17', display: 'みかん', answer: 'mikan', level: 2 },
  { id: 'h18', display: 'りんご', answer: 'ringo', level: 2 },
  { id: 'h19', display: 'うさぎ', answer: 'usagi', level: 2 },
  { id: 'h20', display: 'かめ', answer: 'kame', level: 2 },
  { id: 'h21', display: 'くるま', answer: 'kuruma', level: 2 },
  { id: 'h22', display: 'でんわ', answer: 'denwa', level: 2 },
  { id: 'h23', display: 'おかし', answer: 'okashi', level: 2 },
  { id: 'h24', display: 'ともだち', answer: 'tomodachi', level: 2 },
  { id: 'h25', display: 'たまご', answer: 'tamago', level: 2 },
  { id: 'h26', display: 'おにぎり', answer: 'onigiri', level: 2 },
  { id: 'h27', display: 'すいか', answer: 'suika', level: 2 },
  { id: 'h28', display: 'かぼちゃ', answer: 'kabocha', level: 2 },
  { id: 'h29', display: 'とけい', answer: 'tokei', level: 2 },
  { id: 'h30', display: 'めがね', answer: 'megane', level: 2 },

  // Level 3: 4+ chars, slightly harder
  { id: 'h31', display: 'しんかんせん', answer: 'shinkansen', level: 3 },
  { id: 'h32', display: 'ひこうき', answer: 'hikouki', level: 3 },
  { id: 'h33', display: 'がっこう', answer: 'gakkou', level: 3 },
  { id: 'h34', display: 'せんせい', answer: 'sensei', level: 3 },
  { id: 'h35', display: 'としょかん', answer: 'toshokan', level: 3 },
  { id: 'h36', display: 'びょういん', answer: 'byouin', level: 3 },
  { id: 'h37', display: 'でんしゃ', answer: 'densha', level: 3 },
  { id: 'h38', display: 'たいよう', answer: 'taiyou', level: 3 },
  { id: 'h39', display: 'けしごむ', answer: 'keshigomu', level: 3 },
  { id: 'h40', display: 'えんぴつ', answer: 'enpitsu', level: 3 },
  { id: 'h41', display: 'かいもの', answer: 'kaimono', level: 3 },
  { id: 'h42', display: 'いもうと', answer: 'imouto', level: 3 },
  { id: 'h43', display: 'おとうさん', answer: 'otousan', level: 3 },
  { id: 'h44', display: 'おかあさん', answer: 'okaasan', level: 3 },
  { id: 'h45', display: 'きょうしつ', answer: 'kyoushitsu', level: 3 },

  // Level 4: longer / combo kana
  { id: 'h46', display: 'たんじょうび', answer: 'tanjoubi', level: 4 },
  { id: 'h47', display: 'うんどうかい', answer: 'undoukai', level: 4 },
  { id: 'h48', display: 'すいえいぷうる', answer: 'suieipuuru', level: 4 },
  { id: 'h49', display: 'きゅうしょく', answer: 'kyuushoku', level: 4 },
  { id: 'h50', display: 'しゅくだい', answer: 'shukudai', level: 4 },
  { id: 'h51', display: 'おまつり', answer: 'omatsuri', level: 4 },
  { id: 'h52', display: 'はなび', answer: 'hanabi', level: 4 },
  { id: 'h53', display: 'なつやすみ', answer: 'natsuyasumi', level: 4 },
  { id: 'h54', display: 'ふゆやすみ', answer: 'fuyuyasumi', level: 4 },
  { id: 'h55', display: 'どうぶつえん', answer: 'doubutsuen', level: 4 },
];
