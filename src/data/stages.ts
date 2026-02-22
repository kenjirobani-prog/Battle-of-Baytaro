import type { StageData } from '../types';

export const STAGES: StageData[] = [
  {
    id: 1,
    name: 'Training Dome',
    bgClass: 'stage-training-dome',
    requiredDefeats: 0,
  },
  {
    id: 2,
    name: 'Neon Arena',
    bgClass: 'stage-neon-arena',
    requiredDefeats: 3,
  },
  {
    id: 3,
    name: 'Sky Stadium',
    bgClass: 'stage-sky-stadium',
    requiredDefeats: 7,
  },
  {
    id: 4,
    name: 'Cyber Colosseum',
    bgClass: 'stage-cyber-colosseum',
    requiredDefeats: 12,
  },
  {
    id: 5,
    name: 'Final Gate',
    bgClass: 'stage-final-gate',
    requiredDefeats: 18,
  },
];

export const ENEMY_NAMES = [
  'Shadow Spinner',
  'Iron Claw',
  'Volt Striker',
  'Flame Fang',
  'Ice Blade',
  'Thunder Horn',
  'Dark Wing',
  'Storm Breaker',
  'Crimson Edge',
  'Phantom Rush',
  'Steel Tornado',
  'Blaze Phantom',
  'Frost Serpent',
  'Lightning Rex',
  'Void Dragon',
];
