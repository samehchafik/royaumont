// ControlsBridge.jsx
import { useEffect, useMemo } from 'react';
import { useComplexTimeline } from 'player-iiif-video';

export default function ControlsBridge({ onReady }) {
  const s = useComplexTimeline((st) => ({
    play: st.play,
    pause: st.pause,
    playPause: st.playPause,
    setTime: st.setTime,
    setDurationPercent: st.setDurationPercent,
    isReady: st.isReady,
    isPlaying: st.isPlaying,
    isMuted: st.isMuted,
    duration: st.duration,
  }));

  const api = useMemo(
    () => ({
      play: s.play,
      pause: s.pause,
      playPause: s.playPause,
      setTime: s.setTime,                     // en secondes
      setDurationPercent: s.setDurationPercent, // 0..1
      getState: () => ({
        isReady: s.isReady,
        isPlaying: s.isPlaying,
        isMuted: s.isMuted,
        duration: s.duration,
      }),
    }),
    [s.play, s.pause, s.playPause, s.setTime, s.setDurationPercent, s.isReady, s.isPlaying, s.isMuted, s.duration]
  );

  useEffect(() => {
    onReady?.(api);
  }, [onReady, api]);

  return null;
}
