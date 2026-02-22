import React from 'react';
import type { EnemyData, SceneState } from '../types';
import { HPBar } from './HPBar';
import enemy1 from '../assets/enemy1.svg';
import enemy2 from '../assets/enemy2.svg';
import enemy3 from '../assets/enemy3.svg';
import enemy4 from '../assets/enemy4.svg';
import enemy5 from '../assets/enemy5.svg';

const enemySvgs = [enemy1, enemy2, enemy3, enemy4, enemy5];

interface EnemyCardProps {
  enemy: EnemyData;
  scene: SceneState;
}

export const EnemyCard: React.FC<EnemyCardProps> = ({ enemy, scene }) => {
  const svgSrc = enemySvgs[(enemy.svgIndex - 1) % enemySvgs.length];
  const isAppearing = scene === 'ENEMY_APPEAR';
  const isDefeated = scene === 'DEFEAT';
  const isHit = scene === 'ATTACK';
  const isSpecial = scene === 'SPECIAL';

  return (
    <div className={`enemy-card ${isAppearing ? 'enemy-appear' : ''} ${isDefeated ? 'enemy-defeat' : ''} ${isHit ? 'enemy-hit' : ''} ${isSpecial ? 'enemy-special' : ''}`}>
      <div className="enemy-name">Lv.{enemy.level} {enemy.name}</div>
      <div className="enemy-portrait">
        <img src={svgSrc} alt={enemy.name} className="enemy-img" />
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
