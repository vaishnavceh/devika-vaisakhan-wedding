import React, { useState, useRef, useEffect, useCallback } from 'react';
import { VolumeX, Pause, Play, Sparkles, Music } from 'lucide-react';

const START_TIME_SECONDS = 330; // 5:30 (5 minutes 30 seconds)
const TARGET_VOLUME = 0.30; // 30% volume

interface AudioChain {
  ctx: AudioContext;
  bassFilter: BiquadFilterNode;
  trebleFilter: BiquadFilterNode;
  compressor: DynamicsCompressorNode;
}

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showAutoplayPrompt, setShowAutoplayPrompt] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioChainRef = useRef<AudioChain | null>(null);
  const isManuallyPausedRef = useRef<boolean>(false);
  const hasAttemptedAutoplayRef = useRef<boolean>(false);

  // Initialize Web Audio API nodes for Bass, Treble & Dynamic Range Stabilization
  const initAudioChain = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioChainRef.current) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const source = ctx.createMediaElementSource(audio);

      // 1. Bass Stabilizer (Low-shelf filter centered at 150Hz)
      const bassFilter = ctx.createBiquadFilter();
      bassFilter.type = 'lowshelf';
      bassFilter.frequency.value = 150;
      bassFilter.gain.value = 1.0;

      // 2. Mid Presence Filter (Peaking at 1200Hz for warm vocal clarity)
      const midFilter = ctx.createBiquadFilter();
      midFilter.type = 'peaking';
      midFilter.frequency.value = 1200;
      midFilter.Q.value = 0.8;
      midFilter.gain.value = 0.5;

      // 3. Treble Stabilizer (High-shelf filter at 6500Hz to prevent piercing highs)
      const trebleFilter = ctx.createBiquadFilter();
      trebleFilter.type = 'highshelf';
      trebleFilter.frequency.value = 6500;
      trebleFilter.gain.value = -2.0;

      // 4. Dynamics Compressor (Smooths out sudden volume peaks across time)
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-24, ctx.currentTime);
      compressor.knee.setValueAtTime(30, ctx.currentTime);
      compressor.ratio.setValueAtTime(4, ctx.currentTime);
      compressor.attack.setValueAtTime(0.005, ctx.currentTime);
      compressor.release.setValueAtTime(0.25, ctx.currentTime);

      // Connect Signal Chain:
      // Audio -> Bass -> Mid -> Treble -> Compressor -> Output
      source.connect(bassFilter);
      bassFilter.connect(midFilter);
      midFilter.connect(trebleFilter);
      trebleFilter.connect(compressor);
      compressor.connect(ctx.destination);

      audioChainRef.current = {
        ctx,
        bassFilter,
        trebleFilter,
        compressor,
      };
    } catch (_err) {
      // Graceful fallback to native audio element if Web Audio API is restricted
    }
  }, []);

  // Time-based stabilization: dynamically tune bass & treble according to playback progression from 5:30
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    const chain = audioChainRef.current;
    if (!audio || !chain) return;

    const currentTime = audio.currentTime;
    const now = chain.ctx.currentTime;
    const elapsed = Math.max(0, currentTime - START_TIME_SECONDS);

    // Dynamic equalization curves calibrated to "Walk of the Bride" crescendo:
    // - 5:30 to 6:00 (elapsed 0-30s): Melodic entrance — warm rounded bass (+1.2dB), gentle treble (-1.5dB)
    // - 6:00 to 7:00 (elapsed 30-90s): Peak orchestration — firm controlled bass (+0.5dB), smooth de-harshing (-2.8dB)
    // - 7:00+ (elapsed > 90s): Steady harmonic balance (+0.8dB bass, -2.0dB treble)
    let targetBass = 1.0;
    let targetTreble = -2.0;

    if (elapsed < 30) {
      targetBass = 1.2;
      targetTreble = -1.5;
    } else if (elapsed >= 30 && elapsed < 90) {
      targetBass = 0.5;
      targetTreble = -2.8;
    } else {
      targetBass = 0.8;
      targetTreble = -2.0;
    }

    try {
      chain.bassFilter.gain.setTargetAtTime(targetBass, now, 0.4);
      chain.trebleFilter.gain.setTargetAtTime(targetTreble, now, 0.4);
    } catch (_e) {
      // Ignore timing set errors
    }
  }, []);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      initAudioChain();

      if (audioChainRef.current && audioChainRef.current.ctx.state === 'suspended') {
        await audioChainRef.current.ctx.resume();
      }

      audio.volume = TARGET_VOLUME;
      if (audio.currentTime < START_TIME_SECONDS) {
        audio.currentTime = START_TIME_SECONDS;
      }

      await audio.play();
      setIsPlaying(true);
      setShowAutoplayPrompt(false);
    } catch (_err) {
      setIsPlaying(false);
      // Browser blocked unmuted autoplay without prior interaction
      setShowAutoplayPrompt(true);
    }
  }, [initAudioChain]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = TARGET_VOLUME;

    const handleLoadedMetadata = () => {
      audio.currentTime = START_TIME_SECONDS;
    };

    const handleEnded = () => {
      audio.currentTime = START_TIME_SECONDS;
      audio.play().catch(() => {});
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowAutoplayPrompt(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    // 1. Attempt immediate autoplay when website is loaded
    if (!hasAttemptedAutoplayRef.current) {
      hasAttemptedAutoplayRef.current = true;
      audio.currentTime = START_TIME_SECONDS;
      playAudio().catch(() => {
        setShowAutoplayPrompt(true);
      });
    }

    // 2. Universal user gesture listener: any click, touch, or keypress on the page immediately unlocks audio
    const unlockAutoplay = (e?: Event) => {
      if (isManuallyPausedRef.current) return;

      removeListeners();
      if (e && e.target && (e.target as HTMLElement).closest('aside[aria-label="Wedding Ambient Audio"]')) {
        return;
      }
      playAudio().catch(() => {});
    };

    const removeListeners = () => {
      window.removeEventListener('pointerdown', unlockAutoplay);
      window.removeEventListener('click', unlockAutoplay);
      window.removeEventListener('touchstart', unlockAutoplay);
      window.removeEventListener('keydown', unlockAutoplay);
      window.removeEventListener('scroll', unlockAutoplay);
    };

    window.addEventListener('pointerdown', unlockAutoplay, { passive: true, once: true });
    window.addEventListener('click', unlockAutoplay, { passive: true, once: true });
    window.addEventListener('touchstart', unlockAutoplay, { passive: true, once: true });
    window.addEventListener('keydown', unlockAutoplay, { passive: true, once: true });
    window.addEventListener('scroll', unlockAutoplay, { passive: true, once: true });

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      removeListeners();
    };
  }, [playAudio, handleTimeUpdate]);

  const togglePlayback = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      isManuallyPausedRef.current = true;
      setIsPlaying(false);
      setShowAutoplayPrompt(false);
    } else {
      isManuallyPausedRef.current = false;
      playAudio().catch(() => {});
    }
  };

  return (
    <>
      {/* Subtle, elegant prompt if browser autoplay policy blocked sound before gesture */}
      {showAutoplayPrompt && !isPlaying && (
        <div
          onClick={() => {
            isManuallyPausedRef.current = false;
            playAudio().catch(() => {});
          }}
          className="fixed top-18 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer animate-bounce"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy-800 text-ivory-50 text-xs font-sans tracking-wide shadow-heirloom border border-gold-400 hover:bg-burgundy-900 transition-all">
            <Music className="w-3.5 h-3.5 text-gold-400 animate-spin" />
            <span>Tap anywhere to play wedding music</span>
            <Sparkles className="w-3 h-3 text-gold-300" />
          </div>
        </div>
      )}

      <aside aria-label="Wedding Ambient Audio" className="fixed bottom-6 right-6 z-50">
        <audio
          ref={audioRef}
          src="/bgm.mp3"
          preload="auto"
          autoPlay
          playsInline
        />

        <button
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music (starts at 5:30)'}
          aria-pressed={isPlaying}
          className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-gold-500/40 bg-ivory-50/95 backdrop-blur-md shadow-heirloom text-charcoal-700 hover:text-burgundy-800 hover:border-gold-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 ${
            isPlaying ? 'ring-1 ring-gold-500/60 shadow-gold-glow' : ''
          }`}
        >
          <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-burgundy-700 text-ivory-50 group-hover:bg-burgundy-800 transition-colors">
            {isPlaying ? (
              <Pause className="w-3 h-3 text-gold-300" />
            ) : (
              <Play className="w-3 h-3 text-gold-300 ml-0.5" />
            )}
          </span>

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-burgundy-900 leading-tight">
              {isPlaying ? 'Pause Music' : 'Play Music'}
            </span>
            <span className="text-[9px] font-serif italic text-gold-700 leading-tight flex items-center gap-1">
              <span>Seetha Kalyanam • 5:30</span>
              <Sparkles className="w-2 h-2 text-gold-500 opacity-80" />
            </span>
          </div>

          {/* Dynamic Soundwave equalizer bars when playing */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 px-1 ml-1" aria-hidden="true">
              <span className="w-0.5 h-full bg-gold-500 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2 bg-burgundy-700 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-3 bg-gold-600 rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.1s]" />
              <span className="w-0.5 h-1.5 bg-forest-700 rounded-full animate-[bounce_0.7s_ease-in-out_infinite_0.3s]" />
            </div>
          ) : (
            <span className="text-gold-600 text-xs ml-1">
              <VolumeX className="w-3.5 h-3.5 opacity-60" />
            </span>
          )}
        </button>
      </aside>
    </>
  );
};
