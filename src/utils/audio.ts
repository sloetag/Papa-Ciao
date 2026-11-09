/**
 * Elegant synthesized organic audio feedback using the Web Audio API.
 * Designed to mimic soft crystal resonance, acoustic chimes, and gentle vinyl warmth.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private vinylGain: GainNode | null = null;
  private isMuted: boolean = true;
  private vinylPlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopVinyl();
    } else {
      this.initContext();
      this.playChime(523.25, 0.15); // soft C5 greeting chime
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays a gentle, warm acoustic harmonic chime (e.g. on card click or revelation)
   */
  public playChime(freq: number = 440, duration: number = 0.8) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft sine harmonic
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      // Gentle pitch decay for organic feel
      osc.frequency.exponentialRampToValueAtTime(freq * 1.01, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(freq, now + duration);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);

      // Add a subtle overtone
      const overtone = this.ctx.createOscillator();
      const overGain = this.ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2.02, now);
      overGain.gain.setValueAtTime(0, now);
      overGain.gain.linearRampToValueAtTime(0.02, now + 0.03);
      overGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      overtone.connect(overGain);
      overGain.connect(this.ctx.destination);
      overtone.start(now);
      overtone.stop(now + duration);
    } catch {
      // Audio fallback silent
    }
  }

  /**
   * Wax seal unsealing crackle & snap sound
   */
  public playWaxSnap() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Low thud
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);

      // Crisp papery flutter
      this.playChime(659.25, 0.4); // E5
      setTimeout(() => this.playChime(880, 0.6), 120); // A5
    } catch {
      // silent
    }
  }

  /**
   * Subtle steam pour / brew sound
   */
  public playSteamPour() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.2;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.4);
      filter.Q.value = 3.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.45);

      setTimeout(() => this.playChime(587.33, 0.5), 180);
    } catch {
      // silent
    }
  }

  /**
   * Background gentle vinyl crackle warmth toggle
   */
  public toggleVinylWarmth(): boolean {
    if (this.vinylPlaying) {
      this.stopVinyl();
      return false;
    } else {
      this.startVinyl();
      return true;
    }
  }

  public isVinylActive(): boolean {
    return this.vinylPlaying;
  }

  private startVinyl() {
    this.isMuted = false;
    this.initContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // very low soft filtered crackle
        const r = Math.random();
        data[i] = r > 0.998 ? (Math.random() * 2 - 1) * 0.15 : (Math.random() * 2 - 1) * 0.005;
      }

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start();
      this.vinylGain = gain;
      this.vinylPlaying = true;
    } catch {
      this.vinylPlaying = false;
    }
  }

  private stopVinyl() {
    if (this.vinylGain && this.ctx) {
      try {
        this.vinylGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      } catch {
        // silent
      }
    }
    this.vinylPlaying = false;
  }
}

export const sound = new SoundEngine();
