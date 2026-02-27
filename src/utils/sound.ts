/**
 * Sound system using Web Audio API.
 * All sounds are generated procedurally - no external files needed.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Short attack/hit sound */
export function playAttackSE(): void {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
}

/** Correct answer chime */
export function playCorrectSE(): void {
  const ctx = getCtx();

  [523, 659, 784].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.value = freq;

    const t = ctx.currentTime + i * 0.08;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

    osc.start(t);
    osc.stop(t + 0.15);
  });
}

/** Wrong / buzzer sound */
export function playBuzzerSE(): void {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'square';
  osc.frequency.value = 150;

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

/** Enemy defeat fanfare */
export function playDefeatSE(): void {
  const ctx = getCtx();

  [523, 659, 784, 1047].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.value = freq;

    const t = ctx.currentTime + i * 0.12;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

    osc.start(t);
    osc.stop(t + 0.3);
  });
}

/** Special move activation - dramatic rising tone */
export function playSpecialSE(): void {
  const ctx = getCtx();

  // Dramatic sweep
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.connect(gain1);
  gain1.connect(ctx.destination);

  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(200, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.4);

  gain1.gain.setValueAtTime(0.2, ctx.currentTime);
  gain1.gain.setValueAtTime(0.2, ctx.currentTime + 0.3);
  gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

  osc1.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.6);

  // Impact
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.connect(gain2);
  gain2.connect(ctx.destination);

  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(100, ctx.currentTime + 0.4);
  osc2.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.8);

  gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.4);
  gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

  osc2.start(ctx.currentTime + 0.4);
  osc2.stop(ctx.currentTime + 0.8);
}

/** Damage taken sound */
export function playDamageSE(): void {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

/** Game over jingle */
export function playGameOverSE(): void {
  const ctx = getCtx();

  [400, 350, 300, 200].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.value = freq;

    const t = ctx.currentTime + i * 0.2;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

    osc.start(t);
    osc.stop(t + 0.4);
  });
}

/** Level up jingle */
export function playLevelUpSE(): void {
  const ctx = getCtx();

  [440, 554, 659, 880].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.value = freq;

    const t = ctx.currentTime + i * 0.1;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

    osc.start(t);
    osc.stop(t + 0.25);
  });
}

/** Initialize audio context on user interaction */
export function initAudio(): void {
  getCtx();
}

// ── BGM System ──
let bgmNodes: { oscillators: OscillatorNode[]; gains: GainNode[]; masterGain: GainNode } | null = null;
let bgmInterval: number | null = null;

/**
 * Cyberpunk action BGM - procedurally generated looping music.
 * Uses multiple oscillators for a driving, electronic feel.
 */
export function startBGM(): void {
  if (bgmNodes) return; // already playing
  const ctx = getCtx();

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.12;
  masterGain.connect(ctx.destination);

  const oscillators: OscillatorNode[] = [];
  const gains: GainNode[] = [];

  // Bass line (driving pulse)
  const bassOsc = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bassOsc.type = 'sawtooth';
  bassOsc.frequency.value = 55; // A1
  bassGain.gain.value = 0.5;
  bassOsc.connect(bassGain);
  bassGain.connect(masterGain);
  bassOsc.start();
  oscillators.push(bassOsc);
  gains.push(bassGain);

  // Sub bass (sine for weight)
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'sine';
  subOsc.frequency.value = 55;
  subGain.gain.value = 0.4;
  subOsc.connect(subGain);
  subGain.connect(masterGain);
  subOsc.start();
  oscillators.push(subOsc);
  gains.push(subGain);

  // Pad (atmospheric)
  const padOsc = ctx.createOscillator();
  const padGain = ctx.createGain();
  padOsc.type = 'triangle';
  padOsc.frequency.value = 220; // A3
  padGain.gain.value = 0.15;
  padOsc.connect(padGain);
  padGain.connect(masterGain);
  padOsc.start();
  oscillators.push(padOsc);
  gains.push(padGain);

  // Lead synth (melody carrier)
  const leadOsc = ctx.createOscillator();
  const leadGain = ctx.createGain();
  leadOsc.type = 'square';
  leadOsc.frequency.value = 440;
  leadGain.gain.value = 0.08;
  leadOsc.connect(leadGain);
  leadGain.connect(masterGain);
  leadOsc.start();
  oscillators.push(leadOsc);
  gains.push(leadGain);

  // Arpeggio synth
  const arpOsc = ctx.createOscillator();
  const arpGain = ctx.createGain();
  arpOsc.type = 'sawtooth';
  arpOsc.frequency.value = 330;
  arpGain.gain.value = 0.06;
  arpOsc.connect(arpGain);
  arpGain.connect(masterGain);
  arpOsc.start();
  oscillators.push(arpOsc);
  gains.push(arpGain);

  bgmNodes = { oscillators, gains, masterGain };

  // Sequence patterns - cyberpunk action feel
  // A minor progression: Am - F - C - G (i - VI - III - VII)
  const bassNotes = [55, 55, 44, 44, 52, 52, 49, 49]; // A1, F1, C2-ish, G1
  const padNotes = [220, 220, 175, 175, 262, 262, 196, 196]; // A3, F3, C4, G3
  const leadMelody = [
    440, 523, 659, 523, 440, 392, 349, 392,
    349, 440, 523, 440, 523, 659, 784, 659,
  ];
  const arpNotes = [
    220, 330, 440, 330, 175, 262, 349, 262,
    262, 392, 523, 392, 196, 294, 392, 294,
  ];

  let step = 0;
  const bpm = 140;
  const stepTime = (60 / bpm) * 1000 / 2; // 16th notes

  bgmInterval = window.setInterval(() => {
    if (!bgmNodes) return;
    const ctx2 = getCtx();
    const t = ctx2.currentTime;

    // Bass (changes every 4 steps)
    const bassIdx = Math.floor(step / 4) % bassNotes.length;
    bassOsc.frequency.setValueAtTime(bassNotes[bassIdx], t);
    subOsc.frequency.setValueAtTime(bassNotes[bassIdx], t);

    // Bass pulse effect (volume pumping)
    if (step % 4 === 0) {
      bassGain.gain.setValueAtTime(0.5, t);
      bassGain.gain.linearRampToValueAtTime(0.25, t + stepTime / 1000 * 3);
    }

    // Pad (changes every 8 steps)
    const padIdx = Math.floor(step / 8) % padNotes.length;
    padOsc.frequency.setValueAtTime(padNotes[padIdx], t);

    // Lead melody (every 2 steps)
    if (step % 2 === 0) {
      const leadIdx = Math.floor(step / 2) % leadMelody.length;
      leadOsc.frequency.setValueAtTime(leadMelody[leadIdx], t);
      leadGain.gain.setValueAtTime(0.1, t);
      leadGain.gain.linearRampToValueAtTime(0.04, t + stepTime / 1000);
    }

    // Arpeggio (every step)
    const arpIdx = step % arpNotes.length;
    arpOsc.frequency.setValueAtTime(arpNotes[arpIdx], t);
    arpGain.gain.setValueAtTime(0.08, t);
    arpGain.gain.linearRampToValueAtTime(0.02, t + stepTime / 1000 * 0.8);

    step++;
  }, stepTime);
}

// ── Clear BGM (celebratory) ──
let clearBgmNodes: { oscillators: OscillatorNode[]; gains: GainNode[]; masterGain: GainNode } | null = null;
let clearBgmInterval: number | null = null;

/**
 * Celebratory victory BGM - upbeat, happy fanfare loop.
 */
export function startClearBGM(): void {
  if (clearBgmNodes) return;
  const ctx = getCtx();

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.15;
  masterGain.connect(ctx.destination);

  const oscillators: OscillatorNode[] = [];
  const gains: GainNode[] = [];

  // Bass (bouncy)
  const bassOsc = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bassOsc.type = 'sine';
  bassOsc.frequency.value = 130;
  bassGain.gain.value = 0.4;
  bassOsc.connect(bassGain);
  bassGain.connect(masterGain);
  bassOsc.start();
  oscillators.push(bassOsc);
  gains.push(bassGain);

  // Chords (bright)
  const chordOsc = ctx.createOscillator();
  const chordGain = ctx.createGain();
  chordOsc.type = 'triangle';
  chordOsc.frequency.value = 523;
  chordGain.gain.value = 0.2;
  chordOsc.connect(chordGain);
  chordGain.connect(masterGain);
  chordOsc.start();
  oscillators.push(chordOsc);
  gains.push(chordGain);

  // Melody (celebratory)
  const melodyOsc = ctx.createOscillator();
  const melodyGain = ctx.createGain();
  melodyOsc.type = 'sine';
  melodyOsc.frequency.value = 659;
  melodyGain.gain.value = 0.15;
  melodyOsc.connect(melodyGain);
  melodyGain.connect(masterGain);
  melodyOsc.start();
  oscillators.push(melodyOsc);
  gains.push(melodyGain);

  // High sparkle
  const sparkleOsc = ctx.createOscillator();
  const sparkleGain = ctx.createGain();
  sparkleOsc.type = 'sine';
  sparkleOsc.frequency.value = 1047;
  sparkleGain.gain.value = 0.05;
  sparkleOsc.connect(sparkleGain);
  sparkleGain.connect(masterGain);
  sparkleOsc.start();
  oscillators.push(sparkleOsc);
  gains.push(sparkleGain);

  clearBgmNodes = { oscillators, gains, masterGain };

  // C major / G major / Am / F - happy progression
  const bassNotes = [130, 130, 164, 164, 110, 110, 87, 87]; // C, E, A, F
  const chordNotes = [523, 659, 523, 659, 440, 523, 440, 523]; // C5, E5, A4, C5
  const melodyNotes = [
    784, 880, 1047, 880, 784, 880, 1047, 1175,
    1047, 880, 784, 880, 1047, 880, 784, 659,
  ];
  const sparkleNotes = [
    1568, 1760, 2093, 1760, 1568, 1760, 2093, 2349,
    2093, 1760, 1568, 1760, 2093, 1760, 1568, 1318,
  ];

  let step = 0;
  const bpm = 160;
  const stepTime = (60 / bpm) * 1000 / 2;

  clearBgmInterval = window.setInterval(() => {
    if (!clearBgmNodes) return;
    const ctx2 = getCtx();
    const t = ctx2.currentTime;

    const bassIdx = Math.floor(step / 4) % bassNotes.length;
    bassOsc.frequency.setValueAtTime(bassNotes[bassIdx], t);

    if (step % 4 === 0) {
      bassGain.gain.setValueAtTime(0.4, t);
      bassGain.gain.linearRampToValueAtTime(0.2, t + stepTime / 1000 * 3);
    }

    const chordIdx = Math.floor(step / 4) % chordNotes.length;
    chordOsc.frequency.setValueAtTime(chordNotes[chordIdx], t);

    if (step % 2 === 0) {
      const melIdx = Math.floor(step / 2) % melodyNotes.length;
      melodyOsc.frequency.setValueAtTime(melodyNotes[melIdx], t);
      melodyGain.gain.setValueAtTime(0.18, t);
      melodyGain.gain.linearRampToValueAtTime(0.08, t + stepTime / 1000);
    }

    const sparkIdx = step % sparkleNotes.length;
    sparkleOsc.frequency.setValueAtTime(sparkleNotes[sparkIdx], t);
    sparkleGain.gain.setValueAtTime(0.06, t);
    sparkleGain.gain.linearRampToValueAtTime(0.02, t + stepTime / 1000 * 0.5);

    step++;
  }, stepTime);
}

export function stopClearBGM(): void {
  if (clearBgmNodes) {
    clearBgmNodes.masterGain.gain.linearRampToValueAtTime(0.001, getCtx().currentTime + 0.5);
    const nodes = clearBgmNodes;
    setTimeout(() => {
      nodes.oscillators.forEach(o => { try { o.stop(); } catch {} });
      nodes.masterGain.disconnect();
    }, 600);
    clearBgmNodes = null;
  }
  if (clearBgmInterval) {
    clearInterval(clearBgmInterval);
    clearBgmInterval = null;
  }
}

export function stopBGM(): void {
  if (bgmNodes) {
    bgmNodes.masterGain.gain.linearRampToValueAtTime(0.001, getCtx().currentTime + 0.5);
    const nodes = bgmNodes;
    setTimeout(() => {
      nodes.oscillators.forEach(o => { try { o.stop(); } catch {} });
      nodes.masterGain.disconnect();
    }, 600);
    bgmNodes = null;
  }
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}
