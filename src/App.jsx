// App.jsx (JS pur)
import { useEffect, useState, useRef, useCallback } from 'react';
import qs from 'query-string';


import Player from './Player';
import Index from './Index';
import Gallerie from './Gallerie';
import { collectionLoader } from './Services';

import './styles/index.css'

const manifestResolver = async ()=>{
  let { manifest, collection } = qs.parse(window.location.hash.slice(1));

  if(!collection){
    collection = document.getElementById('root').dataset.collection;
  }
  if(!manifest){
    collection = document.getElementById('root').dataset.collection;
  }

  collection = await collectionLoader(collection);

  return { manifest, collection };
}

export default function App() {
  const [collection, setCollection] = useState(null);
  const [manifest, setManifest] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadFromHash = async () => {
      setLoading(true);
      const result = await manifestResolver();
      if (!cancelled) {
        setCollection(result.collection);
        setManifest(result.manifest || null);
        setLoading(false);
      }
    };

    // 1. chargement initial
    loadFromHash();

    // 2. recharger quand le hash change
    /*const onHashChange = () => {
      loadFromHash();
    }

    window.addEventListener('hashchange', onHashChange);
    return () => {
      cancelled = true;
      window.removeEventListener('hashchange', onHashChange);
    };*/
  }, []);


  const [btPlaying, setBtPlaying] = useState("bt-play");
  const [contenaireClass, setContenaireClass] = useState("player-contenaire");

  const ctlRef = useRef(null);

  const manifestUrl = manifest || 'https://gist.githubusercontent.com/stephenwf/57cc5024144c53d48cc3c07cc522eb94/raw/a87a5d9a8f949bfb11cebd4f011a204abe8a932b/manifest.json';


  const handleControlsReady = useCallback((api) => { ctlRef.current = api; }, []);
  const handlePlay         = useCallback(() => {console.log("play"); setBtPlaying('bt-play hide'); setContenaireClass("player-contenaire playing")}, []);
  const handlePause        = useCallback(() => {console.log("pause", ctlRef);setBtPlaying('bt-play'); setContenaireClass("player-contenaire")}, []);

  const handleIsPlaying        = useCallback(() => {console.log("isPlaying");}, []);

  if (loading) {
    return <div>Chargement…</div>;
  }
  const style = {}
  if(collection.provider.logo){
    style.backgroundImage = `url(${collection.provider.logo})`;
  }

  const onSelect = (manifestUrl, autoPlay=false) => {
    setManifest(manifestUrl);
    if(autoPlay){
      setTimeout(()=>{
        ctlRef.current?.play();
      }, 1000);
    } else if(manifestUrl === undefined){
      document.location.hash = '';
    }
  }

  return (
    <>
    
      <div className='signature' style={style}></div>
      
      { manifest ? 
        (<div className={ contenaireClass}>
          <div className={btPlaying}>
            {(<button onClick={() => {
            ctlRef.current?.play();
            //setBtPlaying('bt-play hide')
            setTimeout(()=>{ctlRef.current?.play()}, 200);
          }}>Play</button>)}
          </div>
          <div className="appWrap">
            
            <div class="home-button" onClick={()=>onSelect(undefined)}>Accueil</div>
          
            {collection ? (
                <Gallerie manifest={manifestUrl} items={collection.galleries} onSelect={onSelect}/>
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
        </div>) : (<div className={ contenaireClass}><Index collection={collection} onSelect={onSelect}/></div>)
      }
    </>
  );
}
