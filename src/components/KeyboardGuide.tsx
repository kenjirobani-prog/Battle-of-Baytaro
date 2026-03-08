import React from 'react';
import {
  KEYBOARD_ROWS,
  HOME_KEYS,
  FINGER_MAP,
  FINGER_COLORS,
  getFingerForKey,
} from '../data/homepositionKeys';
import type { FingerName } from '../data/homepositionKeys';

interface KeyboardGuideProps {
  targetKeys: string[]; // keys to highlight (uppercase)
}

// Hand SVG paths for finger indicators
const FINGER_LABELS: Record<FingerName, string> = {
  'left-pinky': '左小',
  'left-ring': '左薬',
  'left-middle': '左中',
  'left-index': '左人',
  'right-index': '右人',
  'right-middle': '右中',
  'right-ring': '右薬',
  'right-pinky': '右小',
};

export const KeyboardGuide: React.FC<KeyboardGuideProps> = ({ targetKeys }) => {
  const targetSet = new Set(targetKeys.map(k => k.toUpperCase()));

  // Get active finger(s)
  const activeFingers = new Set<FingerName>();
  targetKeys.forEach(k => {
    const f = getFingerForKey(k);
    if (f) activeFingers.add(f);
  });

  return (
    <div className="keyboard-guide">
      <div className="keyboard-layout">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className={`keyboard-row keyboard-row-${ri}`}>
            {row.map(key => {
              const isTarget = targetSet.has(key);
              const isHome = HOME_KEYS.has(key);
              const finger = FINGER_MAP[key];
              const fingerColor = finger ? FINGER_COLORS[finger] : '#666';

              return (
                <div
                  key={key}
                  className={`kb-key ${isTarget ? 'kb-key-target' : ''} ${isHome ? 'kb-key-home' : ''}`}
                  style={isTarget ? { background: fingerColor, borderColor: fingerColor } : undefined}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* Finger indicator */}
      <div className="finger-indicator">
        {(Object.entries(FINGER_LABELS) as [FingerName, string][]).map(([finger, label]) => {
          const isActive = activeFingers.has(finger);
          const color = FINGER_COLORS[finger];
          return (
            <div
              key={finger}
              className={`finger-dot ${isActive ? 'finger-dot-active' : ''}`}
              style={isActive ? { background: color, borderColor: color } : undefined}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
