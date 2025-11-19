// App.jsx (JS pur)
import { useEffect, useState, useRef } from 'react';
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

  const [playing, setPlaying] = useState(false);

  const { manifest, gallerie } = query;

  const ctlRef = useRef(null);

  const manifestUrl = manifest || 'https://gist.githubusercontent.com/stephenwf/57cc5024144c53d48cc3c07cc522eb94/raw/a87a5d9a8f949bfb11cebd4f011a204abe8a932b/manifest.json';

  return (
    <>
      {!playing ? <div className='bt-play'>
        <button onClick={() => {
        ctlRef.current?.play()
      }}>Play</button> 
      </div>: ""}
      {gallerie ? (
        <div>
          <Gallerie manifest={manifestUrl} url={gallerie} />
        </div>
      ) : null}
      <div className='player'>
        <Player manifest={manifestUrl} onControlsReady={(api) => { ctlRef.current = api; }} onPlay={()=>{setPlaying(true)}} onPause = {()=>{setPlaying(false)}}/>
      </div>
    </>
  );
}
