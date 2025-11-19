// App.jsx (JS pur)
import { useEffect, useState, useRef, useCallback } from 'react';
import qs from 'query-string';


import Player from './Player';
import Gallerie from './Gallerie';

import './styles/index.css'


export default function App() {
  const [query, setQuery] = useState(() => qs.parse(window.location.hash.slice(1))); // <- plus de types
  useEffect(() => {
    const onHashChange = () => setQuery(qs.parse(window.location.hash.slice(1)));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const [playing, setPlaying] = useState("bt-play");

  const { manifest, gallerie } = query;

  const ctlRef = useRef(null);

  const manifestUrl = manifest || 'https://gist.githubusercontent.com/stephenwf/57cc5024144c53d48cc3c07cc522eb94/raw/a87a5d9a8f949bfb11cebd4f011a204abe8a932b/manifest.json';


  const handleControlsReady = useCallback((api) => { ctlRef.current = api; }, []);
  const handlePlay         = useCallback(() => {console.log("play"); setPlaying('bt-play hide')}, []);
  const handlePause        = useCallback(() => {console.log("pause");setPlaying('bt-play')}, []);


  return (
    <>
      <div className='signature'></div>
      <div className={playing}>
        <button onClick={() => {
        ctlRef.current?.play();
        setPlaying('bt-play hide')
        setTimeout(()=>{ctlRef.current?.play()}, 200);
      }}>Play</button> 
      </div>
      <div className="appWrap">
      {gallerie ? (
          <Gallerie manifest={manifestUrl} url={gallerie} />
      ) : null}
      <div className='player'>
        <Player
          manifest={manifestUrl}
          onControlsReady={handleControlsReady}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </div>
      </div>
    </>
  );
}
