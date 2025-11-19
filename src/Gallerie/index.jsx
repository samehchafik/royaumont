import React, { useEffect, useState } from 'react';
import qs from 'query-string';

export default function Gallerie({ manifest, url, onSelect }) {
  const [items, setItems] = useState([]);
  const [state, setState] = useState({ loading: true, error: null });

  useEffect(() => {
    if (!url) return;
    const ac = new AbortController();

    (async () => {
      try {
        setState({ loading: true, error: null });

        const res = await fetch(url, {
          signal: ac.signal,
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();

        // Accepte soit un tableau, soit un objet { items: [...] }
        let list = Array.isArray(json) ? json : (json.items || json.data || []);

        // Normalisation douce
        list = list
          .map((it, idx) => ({
            id: `item-${idx}`,
            manifestUrl: it.manifest,
            image: it.image,
            label: it.label,
          }))
          .filter((it) => it.manifestUrl);

        setItems(list);
        setState({ loading: false, error: null });
      } catch (err) {
        if (ac.signal.aborted) return;
        setState({ loading: false, error: err.message || String(err) });
      }
    })();

    return () => ac.abort();
  }, [url]);

  const handleClick = (manifestUrl) => (e) => {
    e.preventDefault();
    if (onSelect) return onSelect(manifestUrl);

    // Par défaut: on met juste à jour le hash `manifest=...` et on garde le reste
    const current = qs.parse(window.location.hash.slice(1));
    const next = { ...current, manifest: manifestUrl };
    window.location.hash = qs.stringify(next);
  };

  if (!url) return null;
  if (state.loading) return <div className="gallerie loading">Chargement…</div>;
  if (state.error) return <div className="gallerie error">Erreur : {state.error}</div>;
  if (!items.length) return <div className="gallerie empty">Aucun élément</div>;

  return (
    <ul className="gallerie">
      {items.map((item) => {
        const href = `#manifest=${item.manifestUrl}&gallerie=${url}`;

        return (
          <li key={item.id} className="item">
          { manifest !== item.manifestUrl ? 
            <a href={href} onClick={handleClick(item.manifestUrl)}>
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
          </li>
        );
      })}
    </ul>
  );
}
