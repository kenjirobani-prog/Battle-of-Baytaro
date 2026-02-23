import React from 'react';
import type { CollectedTop } from '../types';

// Colors matching enemy types 1-5
const TOP_COLORS: Record<number, { main: string; glow: string; accent: string }> = {
  1: { main: '#00d4ff', glow: 'rgba(0,212,255,0.6)', accent: '#0088ff' },
  2: { main: '#00ff88', glow: 'rgba(0,255,136,0.6)', accent: '#00cc66' },
  3: { main: '#ff3344', glow: 'rgba(255,51,68,0.6)', accent: '#cc0022' },
  4: { main: '#bb44ff', glow: 'rgba(187,68,255,0.6)', accent: '#8800cc' },
  5: { main: '#ff8800', glow: 'rgba(255,136,0,0.6)', accent: '#cc6600' },
};

interface CollectedTopsProps {
  tops: CollectedTop[];
}

export const CollectedTops: React.FC<CollectedTopsProps> = ({ tops }) => {
  if (tops.length === 0) return null;

  return (
    <div className="collected-tops">
      <div className="collected-tops-label">COLLECTION</div>
      <div className="collected-tops-list">
        {tops.map((top, i) => {
          const color = TOP_COLORS[top.svgIndex] || TOP_COLORS[1];
          const isNew = i === tops.length - 1;
          return (
            <div
              key={top.id}
              className={`collected-top-item ${isNew ? 'top-new' : ''}`}
              title={`Top #${i + 1}`}
            >
              <svg viewBox="0 0 40 40" className="top-svg">
                {/* Outer ring */}
                <circle cx="20" cy="20" r="17" fill="none" stroke={color.main} strokeWidth="2" opacity="0.8"/>
                {/* Inner disc */}
                <circle cx="20" cy="20" r="13" fill={color.accent} opacity="0.3"/>
                {/* Blade segments */}
                <path d="M20,3 L24,17 L20,20 Z" fill={color.main} opacity="0.9"/>
                <path d="M37,20 L23,24 L20,20 Z" fill={color.main} opacity="0.9"/>
                <path d="M20,37 L16,23 L20,20 Z" fill={color.main} opacity="0.9"/>
                <path d="M3,20 L17,16 L20,20 Z" fill={color.main} opacity="0.9"/>
                {/* Center core */}
                <circle cx="20" cy="20" r="5" fill={color.main}/>
                <circle cx="20" cy="20" r="2.5" fill="#fff" opacity="0.8"/>
                {/* Decorative arcs */}
                <path d="M10,8 A15,15 0 0,1 32,8" fill="none" stroke={color.main} strokeWidth="1" opacity="0.4"/>
                <path d="M32,32 A15,15 0 0,1 8,32" fill="none" stroke={color.main} strokeWidth="1" opacity="0.4"/>
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};
