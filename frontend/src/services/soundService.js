// Interactive Web Audio API motor rev simulator for Terron EV Scooters

let audioCtx = null;
let currentOsc = null;
let currentGain = null;

export function playMotorRev(durationMs = 1200) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Electric motor whine: harmonic mixture
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(320, now + durationMs / 1000);

    // Smooth envelope
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000);

    // Subtle low-pass filter to sound like an enclosed electric motor
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(2200, now + 0.4);
    filter.frequency.linearRampToValueAtTime(600, now + durationMs / 1000);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + durationMs / 1000);
  } catch (err) {
    console.debug('Web audio not permitted yet:', err);
  }
}
