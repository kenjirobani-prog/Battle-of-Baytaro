import React from 'react';
import type { EnemyData, SceneState } from '../types';
import { HPBar } from './HPBar';
import enemy1 from '../assets/new_enemy_1.png';
import enemy2 from '../assets/new_enemy_2.png';
import enemy3 from '../assets/new_enemy_3.png';
import enemy4 from '../assets/new_enemy_4.png';
import enemy5 from '../assets/new_enemy_5.png';
import enemy6 from '../assets/new_enemy_6.png';
import enemy7 from '../assets/new_enemy_7.png';
import enemy8 from '../assets/new_enemy_8.png';
import enemy9 from '../assets/new_enemy_9.png';
import enemy10 from '../assets/new_enemy_10.png';
import enemy11 from '../assets/new_enemy_11.png';
import enemy12 from '../assets/new_enemy_12.png';
import enemy13 from '../assets/new_enemy_13.png';
import enemy14 from '../assets/new_enemy_14.png';
import enemy15 from '../assets/new_enemy_15.png';

const enemyImages = [
  enemy1, enemy2, enemy3, enemy4, enemy5,
  enemy6, enemy7, enemy8, enemy9, enemy10,
  enemy11, enemy12, enemy13, enemy14, enemy15,
];

interface EnemyCardProps {
  enemy: EnemyData;
  scene: SceneState;
}

export const EnemyCard: React.FC<EnemyCardProps> = ({ enemy, scene }) => {
  const imgSrc = enemyImages[(enemy.svgIndex - 1) % enemyImages.length];
  const isAppearing = scene === 'ENEMY_APPEAR';
  const isDefeated = scene === 'DEFEAT';
  const isHit = scene === 'ATTACK';
  const isSpecial = scene === 'SPECIAL';

  return (
    <div className={`enemy-card ${isAppearing ? 'enemy-appear' : ''} ${isDefeated ? 'enemy-defeat' : ''} ${isHit ? 'enemy-hit' : ''} ${isSpecial ? 'enemy-special' : ''}`}>
      <div className="enemy-name">Lv.{enemy.level} {enemy.name}</div>
      <div className="enemy-portrait">
        <img src={imgSrc} alt={enemy.name} className="enemy-img" />
      </div>
      <HPBar
        current={enemy.currentHp}
        max={enemy.maxHp}
        label="ENEMY"
        color="#ff4444"
        reverse
      />
    </div>
  );
};
