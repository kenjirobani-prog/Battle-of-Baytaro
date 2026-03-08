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
 * City Pop BGM - bright, funky, upbeat looping music.
 * Major 7th chords, groovy bass, and shimmering melody.
 */
export function startBGM(): void {
  if (bgmNodes) return; // already playing
  const ctx = getCtx();

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.13;
  masterGain.connect(ctx.destination);

  const oscillators: OscillatorNode[] = [];
  const gains: GainNode[] = [];

  // Funky bass (sine for round tone)
  const bassOsc = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bassOsc.type = 'sine';
  bassOsc.frequency.value = 130;
  bassGain.gain.value = 0.45;
  bassOsc.connect(bassGain);
  bassGain.connect(masterGain);
  bassOsc.start();
  oscillators.push(bassOsc);
  gains.push(bassGain);

  // Chord pad 1 (triangle - warm)
  const pad1Osc = ctx.createOscillator();
  const pad1Gain = ctx.createGain();
  pad1Osc.type = 'triangle';
  pad1Osc.frequency.value = 330;
  pad1Gain.gain.value = 0.12;
  pad1Osc.connect(pad1Gain);
  pad1Gain.connect(masterGain);
  pad1Osc.start();
  oscillators.push(pad1Osc);
  gains.push(pad1Gain);

  // Chord pad 2 (sine - smooth)
  const pad2Osc = ctx.createOscillator();
  const pad2Gain = ctx.createGain();
  pad2Osc.type = 'sine';
  pad2Osc.frequency.value = 415;
  pad2Gain.gain.value = 0.10;
  pad2Osc.connect(pad2Gain);
  pad2Gain.connect(masterGain);
  pad2Osc.start();
  oscillators.push(pad2Osc);
  gains.push(pad2Gain);

  // Lead melody (triangle - bright but soft)
  const leadOsc = ctx.createOscillator();
  const leadGain = ctx.createGain();
  leadOsc.type = 'triangle';
  leadOsc.frequency.value = 660;
  leadGain.gain.value = 0.08;
  leadOsc.connect(leadGain);
  leadGain.connect(masterGain);
  leadOsc.start();
  oscillators.push(leadOsc);
  gains.push(leadGain);

  // Hi shimmer (sine - sparkle)
  const shimmerOsc = ctx.createOscillator();
  const shimmerGain = ctx.createGain();
  shimmerOsc.type = 'sine';
  shimmerOsc.frequency.value = 1320;
  shimmerGain.gain.value = 0.03;
  shimmerOsc.connect(shimmerGain);
  shimmerGain.connect(masterGain);
  shimmerOsc.start();
  oscillators.push(shimmerOsc);
  gains.push(shimmerGain);

  bgmNodes = { oscillators, gains, masterGain };

  // City Pop progression: Cmaj7 - Am7 - Dm7 - G7 (IΔ7 - vim7 - iim7 - V7)
  // Funky syncopated bass line
  const bassNotes = [
    130, 0, 130, 164, 146, 0, 146, 130,   // C groove
    110, 0, 110, 130, 146, 0, 130, 110,   // Am groove
    146, 0, 146, 164, 174, 0, 164, 146,   // Dm groove
    196, 0, 196, 220, 246, 0, 220, 196,   // G7 groove
  ];
  // Maj7 chord voicings (root + 3rd + 5th + 7th)
  const pad1Notes = [
    330, 330, 330, 330, 330, 330, 330, 330,  // Cmaj7: E4
    330, 330, 330, 330, 330, 330, 330, 330,  // Am7: E4
    349, 349, 349, 349, 349, 349, 349, 349,  // Dm7: F4
    392, 392, 392, 392, 392, 392, 392, 392,  // G7: G4
  ];
  const pad2Notes = [
    494, 494, 494, 494, 494, 494, 494, 494,  // Cmaj7: B4
    440, 440, 440, 440, 440, 440, 440, 440,  // Am7: A4
    440, 440, 440, 440, 440, 440, 440, 440,  // Dm7: A4
    494, 494, 494, 494, 494, 494, 494, 494,  // G7: B4
  ];
  // Bright pentatonic melody
  const leadMelody = [
    784, 880, 988, 880, 784, 660, 784, 880,
    660, 784, 880, 784, 660, 523, 660, 784,
    698, 784, 880, 784, 698, 587, 698, 784,
    784, 880, 988, 1046, 988, 880, 784, 660,
  ];
  // Shimmer arpeggio
  const shimmerNotes = [
    1318, 1568, 1760, 1568, 1318, 1568, 1760, 1976,
    1318, 1568, 1760, 1568, 1046, 1318, 1568, 1318,
    1396, 1568, 1760, 1568, 1396, 1568, 1760, 1976,
    1568, 1760, 1976, 2093, 1976, 1760, 1568, 1318,
  ];

  let step = 0;
  const bpm = 115; // relaxed city pop tempo
  const stepTime = (60 / bpm) * 1000 / 2; // 8th notes

  bgmInterval = window.setInterval(() => {
    if (!bgmNodes) return;
    const ctx2 = getCtx();
    const t = ctx2.currentTime;

    // Bass (funky syncopated)
    const bassIdx = step % bassNotes.length;
    const bassNote = bassNotes[bassIdx];
    if (bassNote === 0) {
      bassGain.gain.setValueAtTime(0, t);
    } else {
      bassOsc.frequency.setValueAtTime(bassNote, t);
      bassGain.gain.setValueAtTime(0.45, t);
      bassGain.gain.linearRampToValueAtTime(0.2, t + stepTime / 1000 * 0.8);
    }

    // Chord pads (smooth changes)
    const padIdx = step % pad1Notes.length;
    pad1Osc.frequency.setValueAtTime(pad1Notes[padIdx], t);
    pad2Osc.frequency.setValueAtTime(pad2Notes[padIdx], t);

    // Chord strum effect on chord changes (every 8 steps)
    if (step % 8 === 0) {
      pad1Gain.gain.setValueAtTime(0.15, t);
      pad1Gain.gain.linearRampToValueAtTime(0.10, t + stepTime / 1000 * 4);
      pad2Gain.gain.setValueAtTime(0.13, t);
      pad2Gain.gain.linearRampToValueAtTime(0.08, t + stepTime / 1000 * 4);
    }

    // Lead melody (every 2 steps for a relaxed feel)
    if (step % 2 === 0) {
      const leadIdx = Math.floor(step / 2) % leadMelody.length;
      leadOsc.frequency.setValueAtTime(leadMelody[leadIdx], t);
      leadGain.gain.setValueAtTime(0.10, t);
      leadGain.gain.linearRampToValueAtTime(0.04, t + stepTime / 1000 * 1.5);
    }

    // Shimmer (every step, soft)
    const shimIdx = step % shimmerNotes.length;
    shimmerOsc.frequency.setValueAtTime(shimmerNotes[shimIdx], t);
    shimmerGain.gain.setValueAtTime(0.04, t);
    shimmerGain.gain.linearRampToValueAtTime(0.01, t + stepTime / 1000 * 0.6);

    step++;
  }, stepTime);
}

// ── Clear BGM (celebratory) ──
let clearBgmNodes: { oscillators: OscillatorNode[]; gains: GainNode[]; masterGain: GainNode } | null = null;
let clearBgmInterval: number | null = null;

/**
 * Celebratory City Pop victory BGM - bright, groovy, euphoric loop.
 */
export function startClearBGM(): void {
  if (clearBgmNodes) return;
  const ctx = getCtx();

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.15;
  masterGain.connect(ctx.destination);

  const oscillators: OscillatorNode[] = [];
  const gains: GainNode[] = [];

  // Bouncy bass (sine)
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

  // Chord pad (triangle - warm)
  const chordOsc = ctx.createOscillator();
  const chordGain = ctx.createGain();
  chordOsc.type = 'triangle';
  chordOsc.frequency.value = 523;
  chordGain.gain.value = 0.15;
  chordOsc.connect(chordGain);
  chordGain.connect(masterGain);
  chordOsc.start();
  oscillators.push(chordOsc);
  gains.push(chordGain);

  // Melody (triangle - bright)
  const melodyOsc = ctx.createOscillator();
  const melodyGain = ctx.createGain();
  melodyOsc.type = 'triangle';
  melodyOsc.frequency.value = 659;
  melodyGain.gain.value = 0.12;
  melodyOsc.connect(melodyGain);
  melodyGain.connect(masterGain);
  melodyOsc.start();
  oscillators.push(melodyOsc);
  gains.push(melodyGain);

  // Sparkle (sine)
  const sparkleOsc = ctx.createOscillator();
  const sparkleGain = ctx.createGain();
  sparkleOsc.type = 'sine';
  sparkleOsc.frequency.value = 1047;
  sparkleGain.gain.value = 0.04;
  sparkleOsc.connect(sparkleGain);
  sparkleGain.connect(masterGain);
  sparkleOsc.start();
  oscillators.push(sparkleOsc);
  gains.push(sparkleGain);

  clearBgmNodes = { oscillators, gains, masterGain };

  // City Pop victory: Fmaj7 - Em7 - Dm7 - Cmaj7 (bright descending)
  const bassNotes = [
    174, 0, 174, 196, 164, 0, 164, 174,  // Fmaj7 groove
    146, 0, 146, 164, 130, 0, 130, 146,  // Em7 groove
    146, 0, 146, 174, 196, 0, 174, 146,  // Dm7 groove
    130, 0, 164, 196, 220, 0, 196, 164,  // Cmaj7 groove
  ];
  const chordNotes = [
    440, 440, 440, 440, 523, 523, 523, 523,  // F: A4, C5
    494, 494, 494, 494, 392, 392, 392, 392,  // Em: B4, G4
    440, 440, 440, 440, 349, 349, 349, 349,  // Dm: A4, F4
    494, 494, 494, 494, 523, 523, 523, 523,  // C: B4, C5
  ];
  const melodyNotes = [
    880, 1046, 1175, 1046, 880, 784, 880, 1046,
    784, 880, 1046, 880, 784, 659, 784, 880,
    698, 880, 1046, 880, 698, 587, 698, 880,
    784, 880, 1046, 1175, 1318, 1175, 1046, 880,
  ];
  const sparkleNotes = [
    1760, 2093, 2349, 2093, 1760, 2093, 2349, 2637,
    1568, 1760, 2093, 1760, 1568, 1318, 1568, 1760,
    1396, 1760, 2093, 1760, 1396, 1175, 1396, 1760,
    1568, 1760, 2093, 2349, 2637, 2349, 2093, 1760,
  ];

  let step = 0;
  const bpm = 125; // upbeat city pop
  const stepTime = (60 / bpm) * 1000 / 2;

  clearBgmInterval = window.setInterval(() => {
    if (!clearBgmNodes) return;
    const ctx2 = getCtx();
    const t = ctx2.currentTime;

    // Bass (syncopated groove)
    const bassIdx = step % bassNotes.length;
    const bassNote = bassNotes[bassIdx];
    if (bassNote === 0) {
      bassGain.gain.setValueAtTime(0, t);
    } else {
      bassOsc.frequency.setValueAtTime(bassNote, t);
      bassGain.gain.setValueAtTime(0.4, t);
      bassGain.gain.linearRampToValueAtTime(0.18, t + stepTime / 1000 * 0.8);
    }

    // Chord (smooth)
    const chordIdx = step % chordNotes.length;
    chordOsc.frequency.setValueAtTime(chordNotes[chordIdx], t);
    if (step % 8 === 0) {
      chordGain.gain.setValueAtTime(0.18, t);
      chordGain.gain.linearRampToValueAtTime(0.12, t + stepTime / 1000 * 4);
    }

    // Melody (every 2 steps)
    if (step % 2 === 0) {
      const melIdx = Math.floor(step / 2) % melodyNotes.length;
      melodyOsc.frequency.setValueAtTime(melodyNotes[melIdx], t);
      melodyGain.gain.setValueAtTime(0.14, t);
      melodyGain.gain.linearRampToValueAtTime(0.06, t + stepTime / 1000 * 1.5);
    }

    // Sparkle (every step)
    const sparkIdx = step % sparkleNotes.length;
    sparkleOsc.frequency.setValueAtTime(sparkleNotes[sparkIdx], t);
    sparkleGain.gain.setValueAtTime(0.05, t);
    sparkleGain.gain.linearRampToValueAtTime(0.01, t + stepTime / 1000 * 0.5);

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
