import {useState } from 'react';
import qs from 'query-string';

export default function Gallerie({ manifest, items, onSelect }) {
  const [info, setInfo] = useState({});
  const [infoBox, setInfoBox] = useState("info-box");

  

  const handleClick = (manifestUrl) => (e) => {
    e.preventDefault();
    window.location.hash = `manifest=${manifestUrl}`
    if (onSelect) return onSelect(manifestUrl);

    // Par défaut: on met juste à jour le hash `manifest=...` et on garde le reste
    const current = qs.parse(window.location.hash.slice(1));
    const next = { ...current, manifest: manifestUrl };
    window.location.hash = qs.stringify(next);
  };

  if (!items || !items.length) return <div className="gallerie empty">Aucun élément</div>;

  
  return (
    <div className='gallerie-container'>
        <ul className="gallerie">
        {items.map((item) => {
            const href = `#manifest=${item.manifest}`;

            return (
            <li key={item.id} className={`item${manifest !== item.manifest?'':' active'}`}>
            { manifest !== item.manifest ? 
                <a href={href} onClick={handleClick(item.manifest)}>
                {item.image && (
                    <img className="img" src={item.image} alt={item.label} loading="lazy" />
                )}
                <span className="label">{item.label}</span>
               
                </a> : <div>
                {item.image && (
                    <img className="img" src={item.image} alt={item.label} loading="lazy" />
                )}
                <span className="label">{item.label}</span>
                </div>}
                 <button className='info' onClick={()=>{
                  setInfoBox("info-box open"); setInfo(item.info)} 
                }>i</button>
            </li>
            );
        })}
        </ul>
        <div className={infoBox}>
            <button className='close' onClick={()=>{setInfoBox("info-box close")}}>×</button>
            <div className='card-container'>
              <div class="card">
                <img src={info.image} alt={info.title} />
                <div class="content">
                  <div class="meta"></div>
                  <h1>{info.title}</h1>
                  <h2>{info.creator}</h2>
                  <p>
                    {info.summary}
                  </p>
                  <p class="copyright">{info.copyright}</p>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}
