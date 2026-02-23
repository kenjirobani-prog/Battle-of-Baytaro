import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  GameMode,
  SceneState,
  WordEntry,
  EnemyData,
  PlayerState,
  WordStats,
  CollectedTop,
} from '../types';
import { STAGES, ENEMY_NAMES } from '../data/stages';
import { selectWord } from '../utils/wordSelector';
import {
  loadWordStats,
  saveWordStats,
  getOrCreateWordStats,
  updateGameRecord,
} from '../utils/storage';
import {
  playCorrectSE,
  playAttackSE,
  playBuzzerSE,
  playDefeatSE,
  playSpecialSE,
  playDamageSE,
  playGameOverSE,
  playLevelUpSE,
  startBGM,
  stopBGM,
} from '../utils/sound';

const INITIAL_TIME_LIMIT = 30;
const TIME_REDUCTION_INTERVAL = 5;
const TIME_REDUCTION_AMOUNT = 2;
const MIN_TIME_LIMIT = 10;

const PLAYER_MAX_HP = 100;
const ENEMY_BASE_HP = 30;
const ENEMY_HP_PER_LEVEL = 15;
const BASE_DAMAGE = 10;
const TIMEOUT_DAMAGE = 15;
const SPECIAL_DAMAGE = 50;
const COMBO_FOR_SPECIAL = 3;

function createEnemy(level: number): EnemyData {
  return {
    level,
    name: ENEMY_NAMES[(level - 1) % ENEMY_NAMES.length],
    maxHp: ENEMY_BASE_HP + (level - 1) * ENEMY_HP_PER_LEVEL,
    currentHp: ENEMY_BASE_HP + (level - 1) * ENEMY_HP_PER_LEVEL,
    svgIndex: ((level - 1) % 5) + 1,
  };
}

function getCurrentStage(enemiesDefeated: number) {
  let stage = STAGES[0];
  for (const s of STAGES) {
    if (enemiesDefeated >= s.requiredDefeats) {
      stage = s;
    }
  }
  return stage;
}

function getTimeLimit(totalCorrect: number): number {
  const reduction = Math.floor(totalCorrect / TIME_REDUCTION_INTERVAL) * TIME_REDUCTION_AMOUNT;
  return Math.max(MIN_TIME_LIMIT, INITIAL_TIME_LIMIT - reduction);
}

function calculateDamage(word: WordEntry, mode: GameMode | null): number {
  const len = mode === 'hiragana' ? word.display.length : word.answer.length;
  const lengthBonus = Math.max(0, len - 2) * 3;
  const levelBonus = (word.level - 1) * 3;
  return BASE_DAMAGE + lengthBonus + levelBonus;
}

export interface GameEngine {
  scene: SceneState;
  mode: GameMode | null;
  player: PlayerState;
  enemy: EnemyData;
  currentWord: WordEntry | null;
  input: string;
  timeRemaining: number;
  timeLimit: number;
  stage: typeof STAGES[0];
  recentWordIds: string[];
  sessionEnemiesDefeated: number;
  collectedTops: CollectedTop[];
  specialVariant: 1 | 2;

  setMode: (mode: GameMode) => void;
  startGame: () => void;
  setInput: (val: string) => void;
  submitAnswer: () => boolean | undefined;
  activateSpecial: () => void;
  returnToTitle: () => void;
}

export function useGameEngine(): GameEngine {
  const [scene, setScene] = useState<SceneState>('TITLE');
  const [mode, setModeState] = useState<GameMode | null>(null);
  const [player, setPlayer] = useState<PlayerState>({
    hp: PLAYER_MAX_HP,
    maxHp: PLAYER_MAX_HP,
    combo: 0,
    maxCombo: 0,
    specialGauge: 0,
    specialReady: false,
    totalCorrect: 0,
    enemiesDefeated: 0,
    currentStage: 1,
  });
  const [enemy, setEnemy] = useState<EnemyData>(createEnemy(1));
  const [currentWord, setCurrentWord] = useState<WordEntry | null>(null);
  const [input, setInput] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME_LIMIT);
  const [timeLimit, setTimeLimit] = useState(INITIAL_TIME_LIMIT);
  const [recentWordIds, setRecentWordIds] = useState<string[]>([]);
  const [sessionEnemiesDefeated, setSessionEnemiesDefeated] = useState(0);
  const [collectedTops, setCollectedTops] = useState<CollectedTop[]>([]);
  const [specialVariant, setSpecialVariant] = useState<1 | 2>(1);
  const topIdRef = useRef(0);

  // Refs for values accessed in async callbacks (to avoid stale closures)
  const modeRef = useRef<GameMode | null>(null);
  const recentIdsRef = useRef<string[]>([]);
  const timerRef = useRef<number | null>(null);
  const questionStartRef = useRef<number>(0);
  const deadlineRef = useRef<number>(0);
  const tickRef = useRef<number | null>(null);
  const wordStatsRef = useRef<Record<string, WordStats>>({});
  const sceneRef = useRef<SceneState>('TITLE');

  // Keep refs in sync
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { recentIdsRef.current = recentWordIds; }, [recentWordIds]);
  useEffect(() => { sceneRef.current = scene; }, [scene]);

  const stage = getCurrentStage(player.enemiesDefeated);

  // ── Timer ──
  const startTimer = useCallback((limit: number) => {
    const now = Date.now();
    questionStartRef.current = now;
    deadlineRef.current = now + limit * 1000;
    setTimeRemaining(limit);

    if (tickRef.current) cancelAnimationFrame(tickRef.current);

    const tick = () => {
      const remaining = Math.max(0, (deadlineRef.current - Date.now()) / 1000);
      setTimeRemaining(remaining);
      if (remaining > 0) {
        tickRef.current = requestAnimationFrame(tick);
      }
    };
    tickRef.current = requestAnimationFrame(tick);
  }, []);

  const stopTimer = useCallback(() => {
    if (tickRef.current) {
      cancelAnimationFrame(tickRef.current);
      tickRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => stopTimer(), [stopTimer]);

  // ── Go to question (uses refs, no stale closures) ──
  const goToQuestion = useCallback((
    currentMode: GameMode,
    totalCorrect: number,
    recentIds: string[]
  ) => {
    const word = selectWord(currentMode, totalCorrect, recentIds);
    const limit = getTimeLimit(totalCorrect);
    setCurrentWord(word);
    setInput('');
    setTimeLimit(limit);
    setScene('QUESTION');
    startTimer(limit);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      // Timeout handler inline (reads refs for latest values)
      stopTimer();

      const stats = getOrCreateWordStats(wordStatsRef.current, word.id, currentMode);
      stats.timesTimeout++;
      saveWordStats(currentMode, wordStatsRef.current);

      playDamageSE();
      setScene('DAMAGE');

      setPlayer(prev => {
        const newHp = Math.max(0, prev.hp - TIMEOUT_DAMAGE);
        if (newHp <= 0) {
          setTimeout(() => {
            playGameOverSE();
            setScene('GAME_OVER');
          }, 800);
        } else {
          setTimeout(() => {
            // Use ref for latest recentIds
            goToQuestion(currentMode, prev.totalCorrect, recentIdsRef.current);
          }, 1000);
        }
        return {
          ...prev,
          hp: newHp,
          combo: 0,
          specialGauge: 0,
          specialReady: false,
        };
      });
    }, limit * 1000);

    setRecentWordIds(prev => [...prev, word.id].slice(-10));

    const wStats = getOrCreateWordStats(wordStatsRef.current, word.id, currentMode);
    wStats.timesShown++;
  }, [startTimer, stopTimer]);

  // ── Transition helpers ──
  const transitionAfterDefeat = useCallback((currentMode: GameMode, defeatedSvgIndex: number) => {
    // Collect top from defeated enemy
    topIdRef.current += 1;
    setCollectedTops(prev => [...prev, { svgIndex: defeatedSvgIndex, id: topIdRef.current }]);

    setPlayer(p => {
      const newEnemiesDefeated = p.enemiesDefeated + 1;
      const newStage = getCurrentStage(newEnemiesDefeated);
      const stageChanged = newStage.id !== getCurrentStage(p.enemiesDefeated).id;
      const nextEnemy = createEnemy(newEnemiesDefeated + 1);
      setEnemy(nextEnemy);

      if (stageChanged) {
        playLevelUpSE();
        setScene('LEVEL_UP');
        setTimeout(() => {
          setScene('ENEMY_APPEAR');
          setTimeout(() => {
            goToQuestion(currentMode, p.totalCorrect + 1, recentIdsRef.current);
          }, 1000);
        }, 1500);
      } else {
        setScene('ENEMY_APPEAR');
        setTimeout(() => {
          goToQuestion(currentMode, p.totalCorrect + 1, recentIdsRef.current);
        }, 1000);
      }

      return {
        ...p,
        enemiesDefeated: newEnemiesDefeated,
        currentStage: newStage.id,
      };
    });
  }, [goToQuestion]);

  // ── Start game ──
  const startGame = useCallback(() => {
    const m = modeRef.current;
    if (!m) return;

    wordStatsRef.current = loadWordStats(m);

    setPlayer({
      hp: PLAYER_MAX_HP,
      maxHp: PLAYER_MAX_HP,
      combo: 0,
      maxCombo: 0,
      specialGauge: 0,
      specialReady: false,
      totalCorrect: 0,
      enemiesDefeated: 0,
      currentStage: 1,
    });
    setSessionEnemiesDefeated(0);
    setCollectedTops([]);
    topIdRef.current = 0;
    setEnemy(createEnemy(1));
    setRecentWordIds([]);

    startBGM();
    setScene('ENEMY_APPEAR');
    setTimeout(() => {
      goToQuestion(m, 0, []);
    }, 1200);
  }, [goToQuestion]);

  // ── Submit answer ──
  const submitAnswer = useCallback(() => {
    if (!currentWord || !mode || sceneRef.current !== 'QUESTION') return;

    stopTimer();

    const isCorrect = mode === 'hiragana'
      ? input.trim() === currentWord.display
      : input.toLowerCase().trim() === currentWord.answer;

    if (!isCorrect) {
      const stats = getOrCreateWordStats(wordStatsRef.current, currentWord.id, mode);
      stats.timesMissed++;
      saveWordStats(mode, wordStatsRef.current);

      playBuzzerSE();

      // Restart timer, let them keep trying
      const limit = getTimeLimit(player.totalCorrect);
      startTimer(limit);
      if (timerRef.current) clearTimeout(timerRef.current);

      const word = currentWord;
      const currentMode = mode;
      timerRef.current = window.setTimeout(() => {
        stopTimer();
        const s = getOrCreateWordStats(wordStatsRef.current, word.id, currentMode);
        s.timesTimeout++;
        saveWordStats(currentMode, wordStatsRef.current);
        playDamageSE();
        setScene('DAMAGE');

        setPlayer(prev => {
          const newHp = Math.max(0, prev.hp - TIMEOUT_DAMAGE);
          if (newHp <= 0) {
            setTimeout(() => { playGameOverSE(); setScene('GAME_OVER'); }, 800);
          } else {
            setTimeout(() => {
              goToQuestion(currentMode, prev.totalCorrect, recentIdsRef.current);
            }, 1000);
          }
          return { ...prev, hp: newHp, combo: 0, specialGauge: 0, specialReady: false };
        });
      }, limit * 1000);

      return false;
    }

    // Correct!
    const inputTime = Date.now() - questionStartRef.current;
    const stats = getOrCreateWordStats(wordStatsRef.current, currentWord.id, mode);
    stats.timesCorrect++;
    stats.totalInputTimeMs += inputTime;
    saveWordStats(mode, wordStatsRef.current);

    playCorrectSE();

    const damage = calculateDamage(currentWord, mode);
    const currentMode = mode;

    setPlayer(prev => {
      const newCombo = prev.combo + 1;
      const newGauge = Math.min(COMBO_FOR_SPECIAL, prev.specialGauge + 1);
      return {
        ...prev,
        combo: newCombo,
        maxCombo: Math.max(prev.maxCombo, newCombo),
        specialGauge: newGauge,
        specialReady: newGauge >= COMBO_FOR_SPECIAL,
        totalCorrect: prev.totalCorrect + 1,
      };
    });

    setScene('ATTACK');
    playAttackSE();

    setTimeout(() => {
      setEnemy(prev => {
        const newHp = Math.max(0, prev.currentHp - damage);
        if (newHp <= 0) {
          playDefeatSE();
          setScene('DEFEAT');
          setSessionEnemiesDefeated(s => s + 1);
          const defeatedIdx = prev.svgIndex;
          setTimeout(() => transitionAfterDefeat(currentMode, defeatedIdx), 1200);
        } else {
          setTimeout(() => {
            setPlayer(p => {
              goToQuestion(currentMode, p.totalCorrect, recentIdsRef.current);
              return p;
            });
          }, 600);
        }
        return { ...prev, currentHp: newHp };
      });
    }, 500);

    return true;
  }, [currentWord, mode, input, player.totalCorrect, stopTimer, startTimer, goToQuestion, transitionAfterDefeat]);

  // ── Activate special ──
  const activateSpecial = useCallback(() => {
    if (!player.specialReady || sceneRef.current !== 'QUESTION' || !mode) return;

    stopTimer();
    playSpecialSE();
    // Randomly pick special variant 1 or 2
    setSpecialVariant(Math.random() < 0.5 ? 1 : 2);
    setScene('SPECIAL');

    const currentMode = mode;

    setPlayer(prev => ({
      ...prev,
      specialGauge: 0,
      specialReady: false,
    }));

    setTimeout(() => {
      setEnemy(prev => {
        const newHp = Math.max(0, prev.currentHp - SPECIAL_DAMAGE);
        if (newHp <= 0) {
          playDefeatSE();
          setScene('DEFEAT');
          setSessionEnemiesDefeated(s => s + 1);
          const defeatedIdx = prev.svgIndex;
          setTimeout(() => transitionAfterDefeat(currentMode, defeatedIdx), 1200);
        } else {
          setTimeout(() => {
            setPlayer(p => {
              goToQuestion(currentMode, p.totalCorrect, recentIdsRef.current);
              return p;
            });
          }, 300);
        }
        return { ...prev, currentHp: newHp };
      });
    }, 1000);
  }, [player.specialReady, mode, stopTimer, goToQuestion, transitionAfterDefeat]);

  // ── Set mode ──
  const setMode = useCallback((m: GameMode) => {
    setModeState(m);
    modeRef.current = m;
    setScene('MODE_SELECT');
  }, []);

  // ── Return to title ──
  const returnToTitle = useCallback(() => {
    stopTimer();
    stopBGM();
    updateGameRecord(sessionEnemiesDefeated, player.maxCombo, player.totalCorrect);
    setScene('TITLE');
    setInput('');
  }, [stopTimer, sessionEnemiesDefeated, player.maxCombo, player.totalCorrect]);

  // ── Game over → result ──
  useEffect(() => {
    if (scene === 'GAME_OVER') {
      stopBGM();
      const timeout = setTimeout(() => {
        updateGameRecord(sessionEnemiesDefeated, player.maxCombo, player.totalCorrect);
        setScene('RESULT');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [scene, sessionEnemiesDefeated, player.maxCombo, player.totalCorrect]);

  return {
    scene,
    mode,
    player,
    enemy,
    currentWord,
    input,
    timeRemaining,
    timeLimit,
    stage,
    recentWordIds,
    sessionEnemiesDefeated,
    collectedTops,
    specialVariant,
    setMode,
    startGame,
    setInput,
    submitAnswer,
    activateSpecial,
    returnToTitle,
  };
}
