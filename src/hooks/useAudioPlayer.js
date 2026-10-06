import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudioPlayer(src) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const wasPlayingBeforeHidden = useRef(false);
  const targetVolume = 0.6;

  // Initialize audio element
  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;

    const handleError = (e) => {
      console.warn('Audio playback not available or failed to load:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audioRef.current = null;
    };
  }, [src]);

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    audio.volume = 0;
    const step = 0.05;
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume + step >= targetVolume) {
        audio.volume = targetVolume;
        clearFade();
      } else {
        audio.volume = Math.min(targetVolume, audio.volume + step);
      }
    }, 50);
  }, [targetVolume]);

  const fadeOut = useCallback((onComplete) => {
    const audio = audioRef.current;
    if (!audio) {
      if (onComplete) onComplete();
      return;
    }

    clearFade();
    const step = 0.08;
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume - step <= 0) {
        audio.volume = 0;
        clearFade();
        audio.pause();
        if (onComplete) onComplete();
      } else {
        audio.volume = Math.max(0, audio.volume - step);
      }
    }, 40);
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => {
        setIsPlaying(true);
        fadeIn();
      })
      .catch((err) => {
        console.warn('Playback error (possibly user interaction needed):', err);
        setIsPlaying(false);
      });
  }, [fadeIn]);

  const pause = useCallback(() => {
    fadeOut(() => {
      setIsPlaying(false);
    });
  }, [fadeOut]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Page Visibility API support
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        if (isPlaying) {
          wasPlayingBeforeHidden.current = true;
          fadeOut(() => {
            setIsPlaying(false);
          });
        }
      } else {
        if (wasPlayingBeforeHidden.current) {
          wasPlayingBeforeHidden.current = false;
          play();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, play, fadeOut]);

  return { isPlaying, play, pause, toggle };
}
