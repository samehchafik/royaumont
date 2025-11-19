// TimelineEvents.jsx
import { useEffect, useRef, useState } from "react";
import { useComplexTimeline } from "player-iiif-video";

export default function TimelineEvents({
  onReady,
  onPlay,
  onPause,
  onStop,
  onBuffering,
  onPrimeChange,
  onEnter,    // (id, keyframe)
  onExit,     // (id)
}) {

  const [playing, setPlaying] = useState(false); 
  const [timer, setTirmer] = useState(Date.now()); 
  const isReady         = useComplexTimeline(s => s.isReady);
  const isPlaying       = useComplexTimeline(s => s.isPlaying);
  const isBuffering     = useComplexTimeline(s => s.isBuffering);
  const visibleElements = useComplexTimeline(s => s.visibleElements);
  const currentPrime    = useComplexTimeline(s => s.currentPrime);
  const nextKeyIdx      = useComplexTimeline(s => s.nextKeyframeIndex);

  const prevPlaying = useRef(isPlaying);
  useEffect(() => {
    console.log("TimelineEvents.useEffect", prevPlaying, isPlaying, (Date.now() - timer))
    if(isPlaying && prevPlaying.current !== isPlaying){
        setPlaying(true)
        setTirmer(Date.now())
        onPlay()
    } else if( prevPlaying.current !== isPlaying || playing === true && (Date.now() - timer) > 500) {
        setPlaying(false)
        onPause()
    }
  }, [isPlaying])
  // Ready
  /*useEffect(() => { if (isReady) onReady?.(); }, [isReady]);

  // Play / Pause
  const prevPlaying = useRef(isPlaying);
  useEffect(() => {
    if (prevPlaying.current !== undefined && prevPlaying.current !== isPlaying) {
      isPlaying ? onPlay?.() : onPause?.();
    }
    prevPlaying.current = isPlaying;
  }, [isPlaying]);

  // Stop (fin de lecture remise à 0)
  useEffect(() => {
    // Heuristique du store: quand ça passe à pause, plus de "prime" et index de KF remis à 0
    if (!isPlaying && currentPrime == null && nextKeyIdx === 0) {
      onStop?.();
    }
  }, [isPlaying, currentPrime, nextKeyIdx]);

  // Buffering
  useEffect(() => { onBuffering?.(isBuffering); }, [isBuffering]);

  // Prime change
  const prevPrime = useRef(currentPrime);
  useEffect(() => {
    if (prevPrime.current !== currentPrime) onPrimeChange?.(currentPrime);
    prevPrime.current = currentPrime;
  }, [currentPrime]);

  // Enter / Exit de keyframes visibles (images / audio / vidéo / texte)
  const prevVisible = useRef(visibleElements);
  useEffect(() => {
    const prev = prevVisible.current || {};
    const now  = visibleElements || {};
    const prevIds = new Set(Object.keys(prev).filter(k => prev[k]));
    const nowIds  = new Set(Object.keys(now).filter(k => now[k]));

    // Enter
    for (const id of nowIds) {
      if (!prevIds.has(id)) {
        onEnter?.(id, now[id]);
      }
    }
    // Exit
    for (const id of prevIds) {
      if (!nowIds.has(id)) {
        onExit?.(id);
      }
    }
    prevVisible.current = visibleElements;
  }, [visibleElements]);*/

  return null;
}
