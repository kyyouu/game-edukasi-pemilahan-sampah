/**
 * Sound Effects & Cheerful Background Music – Web Audio API
 * Pahlawan Lingkungan – Desa Sukaraja
 */

let _ctx = null;
let _bgmInterval = null;
let _bgmMuted = false;
let _bgmStep = 0;

function getCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_ctx.state === 'suspended') {
    _ctx.resume();
  }
  return _ctx;
}

function playTone(freq, duration = 0.12, type = 'sine', vol = 0.35, delay = 0) {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch (_) {}
}

export const sfx = {
  // Button click
  click: () => playTone(800, 0.08, 'sine', 0.3),

  // Collect trash
  collect: () => playTone(660, 0.07, 'sine', 0.35),

  // Combo
  combo: () => {
    playTone(880, 0.08, 'square', 0.25);
    playTone(1100, 0.08, 'square', 0.25, 0.09);
  },

  // Correct answer ✅
  correct: () => {
    playTone(523, 0.12, 'sine', 0.35);
    playTone(659, 0.12, 'sine', 0.35, 0.12);
    playTone(784, 0.2,  'sine', 0.35, 0.24);
  },

  // Wrong answer ❌
  wrong: () => {
    playTone(250, 0.15, 'sawtooth', 0.35);
    playTone(200, 0.2,  'sawtooth', 0.3, 0.18);
  },

  // Level complete 🎉
  levelComplete: () => {
    [523, 659, 784, 1046].forEach((f, i) =>
      playTone(f, 0.18, 'sine', 0.35, i * 0.13)
    );
  },

  // Boss hit 💥
  bossHit: () => {
    playTone(150, 0.15, 'square', 0.45);
    playTone(100, 0.2,  'sawtooth', 0.4, 0.1);
  },

  // Victory 🏆
  victory: () => {
    [523, 659, 784, 659, 784, 1046].forEach((f, i) =>
      playTone(f, 0.15, 'sine', 0.4, i * 0.12)
    );
  },

  // Transition / page change
  whoosh: () => {
    const ctx = getCtx();
    try {
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } catch (_) {}
  },
};

/**
 * Cheerful Upbeat Background Music Synthesizer (BGM)
 * Plays a bright 14-note happy melody loop designed for kids
 */
const BGM_MELODY = [
  { note: 523.25, dur: 0.18 }, // C5
  { note: 659.25, dur: 0.18 }, // E5
  { note: 783.99, dur: 0.18 }, // G5
  { note: 880.00, dur: 0.22 }, // A5
  { note: 783.99, dur: 0.18 }, // G5
  { note: 659.25, dur: 0.18 }, // E5
  { note: 523.25, dur: 0.22 }, // C5
  { note: 587.33, dur: 0.18 }, // D5
  { note: 659.25, dur: 0.18 }, // E5
  { note: 698.46, dur: 0.18 }, // F5
  { note: 783.99, dur: 0.22 }, // G5
  { note: 659.25, dur: 0.18 }, // E5
  { note: 587.33, dur: 0.18 }, // D5
  { note: 523.25, dur: 0.30 }, // C5
];

export const bgm = {
  start: () => {
    _bgmMuted = false;
    if (_bgmInterval) clearInterval(_bgmInterval);
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();

    _bgmStep = 0;
    _bgmInterval = setInterval(() => {
      if (_bgmMuted) return;
      const stepData = BGM_MELODY[_bgmStep % BGM_MELODY.length];
      playTone(stepData.note, stepData.dur, 'triangle', 0.12); // Audible happy melody
      if (_bgmStep % 2 === 0) {
        playTone(261.63, 0.15, 'sine', 0.08); // Bass beat
      }
      _bgmStep++;
    }, 280);
  },

  stop: () => {
    if (_bgmInterval) {
      clearInterval(_bgmInterval);
      _bgmInterval = null;
    }
  },

  toggle: () => {
    _bgmMuted = !_bgmMuted;
    if (_bgmMuted) {
      bgm.stop();
    } else {
      bgm.start();
    }
    return !_bgmMuted;
  },

  isMuted: () => _bgmMuted,
};

/** Call once on first user interaction to unlock AudioContext and start BGM */
export function unlockAudio() {
  const ctx = getCtx();
  if (ctx.state === 'suspended') ctx.resume();
  bgm.start();
}

// Global auto-start listener on any click anywhere in the window
if (typeof window !== 'undefined') {
  const handleFirstInteraction = () => {
    unlockAudio();
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('keydown', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
  };
  window.addEventListener('click', handleFirstInteraction, { once: true });
  window.addEventListener('keydown', handleFirstInteraction, { once: true });
  window.addEventListener('touchstart', handleFirstInteraction, { once: true });
}
