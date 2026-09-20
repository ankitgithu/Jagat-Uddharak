import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  Volume1,
  VolumeX,
  ExternalLink,
  Radio,
  Music,
  ListMusic,
  Sparkles,
  Maximize2,
  Minimize2,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { AnimatedSection } from './AnimatedSection';

// YouTube source parameters as requested:
// https://www.youtube.com/watch?v=MI0KcXiktB0&list=PLApb0agNDuAw2Zp9woU4GE65IVgXoWzrw&index=123
const YT_VIDEO_ID = 'MI0KcXiktB0';
const YT_PLAYLIST_ID = 'PLApb0agNDuAw2Zp9woU4GE65IVgXoWzrw';
const YT_PLAYLIST_INDEX = 123;
const YT_FULL_URL = `https://www.youtube.com/watch?v=MI0KcXiktB0&list=${YT_PLAYLIST_ID}&index=${YT_PLAYLIST_INDEX}`;

// Format seconds into MM:SS or HH:MM:SS
function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const totalSecs = Math.floor(seconds);
  const hrs = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 32 pre-computed visual waveform normalized height weightings (0.2 to 1.0)
const WAVEFORM_BASE_WEIGHTS = [
  0.28, 0.45, 0.72, 0.58, 0.85, 0.64, 0.92, 0.78,
  0.55, 0.88, 0.98, 0.65, 0.42, 0.75, 0.82, 0.95,
  0.68, 0.52, 0.79, 0.91, 0.84, 0.63, 0.74, 0.89,
  0.58, 0.48, 0.76, 0.86, 0.69, 0.54, 0.38, 0.25,
];

export const SpecialMessageSection: React.FC = () => {
  const { language, t } = useLanguage();

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1420); // default ~23m40s until player reports real duration
  const [volume, setVolume] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [trackTitle, setTrackTitle] = useState<string>(
    language === 'hi'
      ? 'विशेष संदेश • जगतगुरु तत्वदर्शी संत रामपाल जी महाराज'
      : 'Special Message • Jagatguru Tatvdarshi Sant Rampal Ji Maharaj'
  );

  // UI state
  const [isHoveringProgress, setIsHoveringProgress] = useState<boolean>(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPositionRatio, setHoverPositionRatio] = useState<number>(0);
  const [showVideoWindow, setShowVideoWindow] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const [waveAnimationIndex, setWaveAnimationIndex] = useState<number>(0);

  // References
  const ytPlayerRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const tickerIntervalRef = useRef<any>(null);
  const isDraggingSeekRef = useRef<boolean>(false);
  const fallbackTimerRef = useRef<any>(null);

  // Sync title when language changes if no custom title fetched yet
  useEffect(() => {
    if (!ytPlayerRef.current || !ytPlayerRef.current.getVideoData?.()?.title) {
      setTrackTitle(
        language === 'hi'
          ? 'विशेष संदेश • जगतगुरु तत्वदर्शी संत रामपाल जी महाराज'
          : 'Special Message • Jagatguru Tatvdarshi Sant Rampal Ji Maharaj'
      );
    }
  }, [language]);

  // Load YouTube IFrame API and initialize player
  useEffect(() => {
    let isCancelled = false;

    const initYTPlayer = () => {
      if (isCancelled) return;
      if (!(window as any).YT || !(window as any).YT.Player) return;

      try {
        ytPlayerRef.current = new (window as any).YT.Player('ju-special-message-yt-frame', {
          videoId: YT_VIDEO_ID,
          playerVars: {
            listType: 'playlist',
            list: YT_PLAYLIST_ID,
            index: YT_PLAYLIST_INDEX,
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              if (isCancelled) return;
              setIsPlayerReady(true);
              try {
                const dur = event.target.getDuration();
                if (dur && dur > 0) setDuration(dur);
                event.target.setVolume(volume);

                const data = event.target.getVideoData?.();
                if (data && data.title) {
                  setTrackTitle(data.title);
                }
              } catch (e) {
                // Ignore initial query errors
              }
            },
            onStateChange: (event: any) => {
              if (isCancelled) return;
              const state = event.data;
              // YT.PlayerState: PLAYING = 1, PAUSED = 2, ENDED = 0, BUFFERING = 3
              if (state === 1) {
                setIsPlaying(true);
                setIsBuffering(false);
                const dur = event.target.getDuration();
                if (dur && dur > 0) setDuration(dur);
                const data = event.target.getVideoData?.();
                if (data && data.title) {
                  setTrackTitle(data.title);
                }
              } else if (state === 2) {
                setIsPlaying(false);
                setIsBuffering(false);
              } else if (state === 0) {
                setIsPlaying(false);
                setIsBuffering(false);
              } else if (state === 3) {
                setIsBuffering(true);
              }
            },
            onError: (err: any) => {
              console.warn('Special Message player notice:', err);
              setIsBuffering(false);
            },
          },
        });
      } catch (err) {
        console.warn('YT Player init error:', err);
      }
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initYTPlayer();
    } else {
      // Check if script tag already exists
      let tag = document.querySelector('script[src="https://www.youtube.com/iframe_api"]') as HTMLScriptElement;
      if (!tag) {
        tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const existingCallback = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        initYTPlayer();
      };
    }

    return () => {
      isCancelled = true;
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Time ticker while playing
  useEffect(() => {
    if (isPlaying) {
      tickerIntervalRef.current = setInterval(() => {
        if (ytPlayerRef.current && !isDraggingSeekRef.current) {
          try {
            const time = ytPlayerRef.current.getCurrentTime?.();
            if (typeof time === 'number' && !isNaN(time)) {
              setCurrentTime(time);
            }
            const dur = ytPlayerRef.current.getDuration?.();
            if (typeof dur === 'number' && dur > 0) {
              setDuration(dur);
            }
          } catch (e) {
            // fallback increment
            setCurrentTime((prev) => Math.min(prev + 0.3, duration));
          }
        }
      }, 350);
    } else {
      if (tickerIntervalRef.current) clearInterval(tickerIntervalRef.current);
    }

    return () => {
      if (tickerIntervalRef.current) clearInterval(tickerIntervalRef.current);
    };
  }, [isPlaying, duration]);

  // Subtle Waveform Rhythm Step Animation while playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setWaveAnimationIndex((prev) => (prev + 1) % 60);
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Direct Control Handlers
  const handleTogglePlay = useCallback(() => {
    if (ytPlayerRef.current && isPlayerReady) {
      try {
        if (isPlaying) {
          ytPlayerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        }
        return;
      } catch (e) {
        console.warn('Playback action exception:', e);
      }
    }

    // High fidelity simulator fallback if player is loading or restricted in sandbox
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
        fallbackTimerRef.current = setInterval(() => {
          setCurrentTime((t) => (t >= duration ? 0 : t + 1));
        }, 1000);
      } else {
        if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
      }
      return next;
    });
  }, [isPlaying, isPlayerReady, duration]);

  const handleSeekTo = (targetSeconds: number) => {
    const clamped = Math.max(0, Math.min(targetSeconds, duration));
    setCurrentTime(clamped);
    if (ytPlayerRef.current && isPlayerReady) {
      try {
        ytPlayerRef.current.seekTo(clamped, true);
      } catch (e) {
        // ignore
      }
    }
  };

  const handleSkip = (deltaSeconds: number) => {
    handleSeekTo(currentTime + deltaSeconds);
  };

  const handlePreviousTrack = () => {
    if (ytPlayerRef.current && isPlayerReady) {
      try {
        ytPlayerRef.current.previousVideo();
        setCurrentTime(0);
        return;
      } catch (e) {
        // ignore
      }
    }
    handleSeekTo(0);
  };

  const handleNextTrack = () => {
    if (ytPlayerRef.current && isPlayerReady) {
      try {
        ytPlayerRef.current.nextVideo();
        setCurrentTime(0);
        return;
      } catch (e) {
        // ignore
      }
    }
    handleSeekTo(0);
  };

  const handleVolumeChange = (newVolume: number) => {
    const clamped = Math.max(0, Math.min(100, newVolume));
    setVolume(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
      if (ytPlayerRef.current && isPlayerReady) {
        try {
          ytPlayerRef.current.unMute();
        } catch (e) {
          // ignore
        }
      }
    }
    if (ytPlayerRef.current && isPlayerReady) {
      try {
        ytPlayerRef.current.setVolume(clamped);
      } catch (e) {
        // ignore
      }
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (ytPlayerRef.current && isPlayerReady) {
        try {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(volume || 80);
        } catch (e) {
          // ignore
        }
      }
    } else {
      setIsMuted(true);
      if (ytPlayerRef.current && isPlayerReady) {
        try {
          ytPlayerRef.current.mute();
        } catch (e) {
          // ignore
        }
      }
    }
  };

  // Progress Bar scrubbing
  const handleProgressPointer = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const ratio = rect.width > 0 ? offsetX / rect.width : 0;
    const targetSeconds = ratio * duration;
    handleSeekTo(targetSeconds);
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const ratio = rect.width > 0 ? offsetX / rect.width : 0;
    setHoverPositionRatio(ratio);
    setHoverTime(ratio * duration);
  };

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <AnimatedSection id="special-message" className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Context Badge */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100/90 border border-red-200/80 text-red-800 text-xs sm:text-sm font-bold tracking-wide shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>{t.specialMessage?.badge || 'विशेष आध्यात्मिक संदेश'}</span>
            <span className="text-stone-400">•</span>
            <span className="text-xs font-semibold text-stone-600">
              {t.specialMessage?.sourcePlaylist || 'आधिकारिक यूट्यूब प्लेलिस्ट (क्र. 123)'}
            </span>
          </div>

          <h2
            id="special-message-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 mb-3"
          >
            {t.specialMessage?.title || 'विशेष संदेश'}
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-medium leading-relaxed">
            {t.specialMessage?.subtitle ||
              'जगतगुरु तत्वदर्शी संत रामपाल जी महाराज के पावन अमृत वचनों और तत्वज्ञान का विशेष ऑडियो सत्संग प्रसारण'}
          </p>
        </div>

        {/* Premium Audio Player Card - Jagat Uddharak Design Language */}
        <div
          id="special-audio-player-card"
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#260808] via-[#170A0A] to-[#0A0404] text-white shadow-[0_24px_60px_-15px_rgba(185,28,28,0.3)] border border-red-800/40 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-[0_28px_70px_-10px_rgba(220,38,38,0.38)]"
        >
          {/* Spiritual Ambient Glow Orbs */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(220, 38, 38, 0.7) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, transparent 70%)',
            }}
          />

          {/* YouTube Official IFrame API Mount Container (kept active in DOM for seamless official audio playback) */}
          <div
            aria-hidden={!showVideoWindow}
            className={`transition-all duration-300 ${
              showVideoWindow
                ? 'mb-6 rounded-2xl overflow-hidden border border-red-500/40 shadow-xl bg-black max-w-md mx-auto aspect-video'
                : 'absolute w-1 h-1 -bottom-4 -right-4 opacity-[0.001] pointer-events-none overflow-hidden'
            }`}
          >
            <div id="ju-special-message-yt-frame" className="w-full h-full" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column: Sacred Artwork Disc & Live Rotating Visualizer */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              <div
                className="relative group cursor-pointer"
                onClick={handleTogglePlay}
                data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
                title={isPlaying ? 'Pause Audio' : 'Play Audio'}
              >
                {/* Glowing Aura Ring */}
                <div
                  className={`absolute -inset-3 rounded-full blur-xl transition-opacity duration-700 pointer-events-none ${
                    isPlaying ? 'opacity-70 bg-gradient-to-tr from-red-600 via-amber-500 to-red-700' : 'opacity-20 bg-red-900'
                  }`}
                />

                {/* Vinyl / Sacred Chakra Outer Disc */}
                <div
                  className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2.5 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border-2 ${
                    isPlaying ? 'border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.35)]' : 'border-stone-800'
                  } transition-all duration-500 flex items-center justify-center`}
                >
                  {/* Rotating Vinyl Grooves container */}
                  <motion.div
                    className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                      background:
                        'radial-gradient(circle, #242424 0%, #151515 45%, #2a2a2a 50%, #141414 70%, #222 75%, #0d0d0d 100%)',
                    }}
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{
                      repeat: isPlaying ? Infinity : 0,
                      duration: 16,
                      ease: 'linear',
                    }}
                  >
                    {/* Concentric Grooves */}
                    <div className="absolute inset-2 rounded-full border border-stone-700/30 pointer-events-none" />
                    <div className="absolute inset-5 rounded-full border border-stone-800/40 pointer-events-none" />
                    <div className="absolute inset-8 rounded-full border border-stone-700/20 pointer-events-none" />

                    {/* Central Portrait Emblem */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-md">
                      <img
                        src="https://www.jagatgururampalji.org/theme/alpha-v-1.0-2024/assets/img/about-guruji.webp"
                        alt="संत रामपाल जी महाराज"
                        className="w-full h-full object-cover object-top filter brightness-105"
                      />
                      {/* Dark overlay on pause hover */}
                      <div className="absolute inset-0 bg-stone-950/25 group-hover:bg-stone-950/50 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          {isPlaying ? (
                            <Pause className="w-4 h-4 fill-white" />
                          ) : (
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Status Pill & YouTube External Link */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    isPlaying
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-stone-800/80 text-stone-300 border border-stone-700'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-stone-400'}`}
                  />
                  {isPlaying
                    ? t.specialMessage?.playing || 'प्रसारण चल रहा है'
                    : isBuffering
                    ? t.specialMessage?.buffering || 'लोड हो रहा है...'
                    : t.specialMessage?.paused || 'प्रसारण रुका हुआ है'}
                </span>

                <button
                  type="button"
                  onClick={() => setShowVideoWindow(!showVideoWindow)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-stone-800/60 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700/60 transition-colors cursor-pointer"
                  title={showVideoWindow ? 'Hide video preview' : 'View video preview'}
                >
                  {showVideoWindow ? (
                    <>
                      <Minimize2 className="w-3 h-3 text-amber-400" />
                      <span>{t.specialMessage?.audioModeToggle || 'ऑडियो मोड'}</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3 h-3 text-amber-400" />
                      <span>{t.specialMessage?.videoModeToggle || 'वीडियो विंडो'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Information, Dynamic Waveform & Master Audio Controls */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              {/* Header: Track Title & Playlist Info */}
              <div className="mb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Music className="w-3 h-3 text-red-400" />
                      {t.specialMessage?.audioMode || 'प्रीमियम ऑडियो प्लेयर'}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      Track #{YT_PLAYLIST_INDEX}
                    </span>
                  </div>

                  <a
                    href={YT_FULL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 transition-colors font-medium"
                    title="Open playlist directly on YouTube"
                  >
                    <span>{t.specialMessage?.listenOnYoutube || 'YouTube पर पूरी प्लेलिस्ट खोलें'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug line-clamp-2">
                  {trackTitle}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 flex items-center gap-2">
                  <span className="text-amber-400 font-semibold">
                    {language === 'hi' ? 'संत रामपाल जी महाराज' : 'Sant Rampal Ji Maharaj'}
                  </span>
                  <span>•</span>
                  <span>{language === 'hi' ? 'जगत उद्धारक सत्संग अमृत वाणी' : 'Jagat Uddharak Sacred Discourses'}</span>
                </p>
              </div>

              {/* Subtle Animated Waveform / Equalizer Display */}
              <div className="my-3 p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/5">
                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono mb-2 px-1">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'text-red-500 animate-pulse' : 'text-stone-500'}`} />
                    <span>{language === 'hi' ? 'तत्वज्ञान तरंग (Equalizer)' : 'Sound Spectrum Waveform'}</span>
                  </span>
                  <span className="text-amber-400 font-semibold">
                    {isPlaying ? '44.1 kHz • Active Stream' : 'Ready to Play'}
                  </span>
                </div>

                {/* 32-Bar Waveform with Hover & Click Seeking */}
                <div
                  className="h-14 sm:h-16 flex items-end gap-1 sm:gap-1.5 px-1 py-1 cursor-pointer select-none group"
                  onClick={handleProgressPointer}
                  data-cursor="SEEK"
                  title="Click anywhere to seek"
                >
                  {WAVEFORM_BASE_WEIGHTS.map((baseWeight, i) => {
                    // Bar progress fraction
                    const barRatio = i / WAVEFORM_BASE_WEIGHTS.length;
                    const isPassed = barRatio <= currentTime / (duration || 1);

                    // Dynamic wave calculation based on playing state & index
                    let dynamicHeightRatio = baseWeight;
                    if (isPlaying) {
                      const phase = (waveAnimationIndex + i * 4) % 360;
                      const oscillation = Math.sin((phase * Math.PI) / 180) * 0.35;
                      dynamicHeightRatio = Math.max(0.18, Math.min(0.98, baseWeight + oscillation));
                    } else {
                      dynamicHeightRatio = Math.max(0.15, baseWeight * 0.35);
                    }

                    const heightPercent = `${Math.round(dynamicHeightRatio * 100)}%`;

                    return (
                      <div
                        key={i}
                        className="flex-1 h-full flex items-end justify-center"
                      >
                        <div
                          style={{ height: heightPercent }}
                          className={`w-full max-w-[8px] rounded-full transition-all duration-150 ${
                            isPassed
                              ? 'bg-gradient-to-t from-red-600 via-amber-500 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                              : 'bg-stone-700/60 group-hover:bg-stone-600/80'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Bar & Time Stamps */}
              <div className="my-2">
                <div
                  ref={progressBarRef}
                  onClick={handleProgressPointer}
                  onMouseMove={handleProgressMouseMove}
                  onMouseEnter={() => setIsHoveringProgress(true)}
                  onMouseLeave={() => {
                    setIsHoveringProgress(false);
                    setHoverTime(null);
                  }}
                  data-cursor="SEEK"
                  className="relative h-6 flex items-center cursor-pointer group"
                >
                  {/* Track Background */}
                  <div className="w-full h-2 group-hover:h-3 rounded-full bg-stone-800/90 overflow-hidden transition-all duration-200 border border-stone-700/50 relative">
                    {/* Buffer Bar */}
                    <div
                      className="absolute inset-y-0 left-0 bg-stone-700/60 rounded-full"
                      style={{ width: `${Math.min(100, progressPercent + 15)}%` }}
                    />
                    {/* Active Progress Fill */}
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 rounded-full transition-all duration-100"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Scrubber Knob / Thumb */}
                  <div
                    className="absolute w-4 h-4 rounded-full bg-white border-2 border-red-600 shadow-md transform -translate-x-1/2 scale-0 group-hover:scale-110 transition-transform pointer-events-none"
                    style={{ left: `${progressPercent}%` }}
                  />

                  {/* Hover Timestamp Tooltip */}
                  {isHoveringProgress && hoverTime !== null && (
                    <div
                      className="absolute -top-7 transform -translate-x-1/2 bg-stone-900/95 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-lg border border-stone-700 pointer-events-none"
                      style={{ left: `${hoverPositionRatio * 100}%` }}
                    >
                      {formatTime(hoverTime)}
                    </div>
                  )}
                </div>

                {/* Time Readout */}
                <div className="flex items-center justify-between text-xs font-mono text-stone-400 px-0.5">
                  <span className="text-white font-semibold">{formatTime(currentTime)}</span>
                  <span className="text-stone-400">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Master Playback Controls Row */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                {/* Center / Left Controls Group */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Previous Track in Playlist */}
                  <button
                    type="button"
                    onClick={handlePreviousTrack}
                    data-cursor="PREV"
                    className="p-2.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    title={t.specialMessage?.prevTrack || 'पिछला संदेश'}
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  {/* Rewind 10 Seconds */}
                  <button
                    type="button"
                    onClick={() => handleSkip(-10)}
                    data-cursor="-10s"
                    className="p-2.5 rounded-full text-stone-300 hover:text-amber-300 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center relative"
                    title={t.specialMessage?.seekBackward || '10 सेकंड पीछे'}
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span className="text-[9px] font-bold absolute bottom-1">10</span>
                  </button>

                  {/* Prominent Play / Pause Button with Glow & Scale Animation */}
                  <motion.button
                    type="button"
                    onClick={handleTogglePlay}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white flex items-center justify-center shadow-[0_0_24px_rgba(220,38,38,0.6)] hover:shadow-[0_0_32px_rgba(245,158,11,0.7)] transition-all cursor-pointer border border-amber-300/40"
                    title={isPlaying ? t.specialMessage?.pause || 'रोकें' : t.specialMessage?.play || 'चलाएं'}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-white text-white" />
                    ) : (
                      <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                    )}
                  </motion.button>

                  {/* Fast Forward 10 Seconds */}
                  <button
                    type="button"
                    onClick={() => handleSkip(10)}
                    data-cursor="+10s"
                    className="p-2.5 rounded-full text-stone-300 hover:text-amber-300 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center relative"
                    title={t.specialMessage?.seekForward || '10 सेकंड आगे'}
                  >
                    <RotateCw className="w-5 h-5" />
                    <span className="text-[9px] font-bold absolute bottom-1">10</span>
                  </button>

                  {/* Next Track in Playlist */}
                  <button
                    type="button"
                    onClick={handleNextTrack}
                    data-cursor="NEXT"
                    className="p-2.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    title={t.specialMessage?.nextTrack || 'अगला संदेश'}
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Right Controls: Volume Control & Mute */}
                <div
                  className="flex items-center gap-2 relative"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  {/* Mute / Unmute Button */}
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    data-cursor={isMuted ? 'UNMUTE' : 'MUTE'}
                    className="p-2.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    title={isMuted ? t.specialMessage?.unmute || 'ध्वनि चालू करें' : t.specialMessage?.mute || 'ध्वनि म्यूट करें'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5 text-red-400" />
                    ) : volume < 50 ? (
                      <Volume1 className="w-5 h-5 text-stone-200" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-stone-200" />
                    )}
                  </button>

                  {/* Smooth Volume Slider Bar */}
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      data-cursor="VOLUME"
                      className="w-20 sm:w-28 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                      aria-label={t.specialMessage?.volume || 'Volume'}
                    />
                    <span className="text-xs font-mono text-stone-400 w-8 text-right">
                      {isMuted ? '0%' : `${volume}%`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
