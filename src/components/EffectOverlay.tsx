import React from 'react';
import type { SceneState } from '../types';
import attackSvg from '../assets/attack.svg';
import defeatSvg from '../assets/defeat.svg';
import special1Svg from '../assets/special1.svg';
import special2Svg from '../assets/special2.svg';

interface EffectOverlayProps {
  scene: SceneState;
  specialVariant?: 1 | 2;
}

export const EffectOverlay: React.FC<EffectOverlayProps> = ({ scene, specialVariant = 1 }) => {
  if (scene === 'ATTACK') {
    return (
      <div className="effect-overlay effect-attack">
        <img src={attackSvg} alt="" className="effect-img effect-attack-img" />
        <div className="effect-text">HIT!</div>
      </div>
    );
  }

  if (scene === 'DEFEAT') {
    return (
      <div className="effect-overlay effect-defeat">
        <img src={defeatSvg} alt="" className="effect-img effect-defeat-img" />
        <div className="effect-text effect-text-large">DESTROY!</div>
      </div>
    );
  }

  if (scene === 'SPECIAL') {
    const specialSrc = specialVariant === 1 ? special1Svg : special2Svg;
    return (
      <div className="effect-overlay effect-special screen-shake">
        <img src={specialSrc} alt="" className="effect-img effect-special-img" />
        <div className="effect-text effect-text-special">SPECIAL MOVE!</div>
        <div className="special-flash" />
      </div>
    );
  }

  if (scene === 'DAMAGE') {
    return (
      <div className="effect-overlay effect-damage">
        <div className="effect-text effect-text-damage">TIME UP!</div>
        <div className="damage-flash" />
      </div>
    );
  }

  if (scene === 'LEVEL_UP') {
    return (
      <div className="effect-overlay effect-levelup">
        <div className="effect-text effect-text-levelup">STAGE CLEAR!</div>
      </div>
    );
  }

  if (scene === 'GAME_OVER') {
    return (
      <div className="effect-overlay effect-gameover">
        <div className="effect-text effect-text-gameover">GAME OVER</div>
      </div>
    );
  }

  return null;
};
