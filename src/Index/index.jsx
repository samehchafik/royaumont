import Gallerie from '../Gallerie';

export default function Index({ collection, onSelect }) {
    return (
        <>
        
        <div className='card-container home'>
            <div className="card">
                {collection.index.image && (<img src={collection.index.image} alt={collection.index.title} />)}
                <div className="content">
                    <div className="meta"></div>
                    {collection.index.title && (<h1>{collection.index.title}</h1>)}
                    {collection.index.summary && (<div className="summary" dangerouslySetInnerHTML={{ __html: collection.index.summary }}/>)}
                    <button className="commencer" onClick={()=>onSelect(collection.galleries[0].manifest, true)}>Commencer</button>
                    {collection.index.copyright && (<div className='copyright'>{collection.index.copyright}</div>)}
                </div>
            </div>
        </div>
        <Gallerie items={collection.galleries} onSelect={onSelect}/>
        </>
    )
}