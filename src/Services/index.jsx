const getMetainfo = async (url) => {

    const res = await fetch(url, {
        headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();

    const index = {}

    if(json.metadata){
        for(const md of json.metadata){
            if (md.label && md.value) {
                index[md.label.fr[0].toLowerCase()] = md.value.fr[0];
            }
        }
    }
    if(json.summary){
        index.summary = json.summary.fr[0];
    }

    if(json.requiredStatement){
        for(const h in json.requiredStatement){
            if(h.toLowerCase() === 'value'){
                index['copyright'] = json.requiredStatement[h].fr[0]
            }
            
        }
    }

    if(json.thumbnail){
        index['image'] = json.thumbnail[0].id
    }

    return index
}

export const collectionLoader = async (url) => {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();

  const galleries = [];

  const index = {

  }
  if(json.summary){
        index.summary = json.summary.fr[0];
}
  if(json.metadata){
    for(const md of json.metadata){
        if (md.label && md.value) {
            index[md.label.fr[0].toLowerCase()] = md.value.fr[0];
        }
    }
  }
  if(json.requiredStatement){
    
    for(const h in json.requiredStatement){
        if(h.toLowerCase() === 'value'){
            index['copyright'] = json.requiredStatement[h].fr[0]
        }
        
    }
  }
  if(json.thumbnail){
    index['image'] = json.thumbnail[0].id
  }
  const provider = {}
  if(json.provider){
    for(const md of json.provider){
        if (md.type.toLowerCase() === 'agent') {
            if (md.label && md.label.fr) {
                provider.nom = md.label.fr[0];
            }
            if (md.homepage) {
                md.homepage = md.homepage[0]
                provider.url = md.homepage.id
            }
            if (md.logo) {
                md.logo = md.logo[0]
                provider.logo = md.logo.id;
            }
        }
    }
  }
  if(json.items){
    for(const item of json.items){
        const info = await getMetainfo(item.id)
        const gallerie = {
            manifest: item.id,
            image: item.thumbnail ? item.thumbnail[0].id : null,
            label: item.label ? item.label.fr[0] : null,
            info: info
        }

        galleries.push(gallerie);
    }
  }
  return {index: index, provider: provider, galleries: galleries, raw: json };
}