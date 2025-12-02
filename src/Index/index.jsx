import Gallerie from '../Gallerie';

export default function Index({ collection, onSelect }) {
    return (
        <>
        
        <div className='card-container'>
            <div className="bt-play">
                <button onClick={()=>onSelect(collection.galleries[0].manifest, true)}>Play</button>)
            </div>
            <div class="card">
                {collection.index.image && (<img src={collection.index.image} alt={collection.index.title} />)}
                <div class="content">
                    <div class="meta"></div>
                    {collection.index.title && (<h1>{collection.index.title}</h1>)}
                    {collection.index.summary && (<p>{collection.index.summary}</p>)}
                    {collection.index.copyright && (<div className='copyright'>{collection.index.copyright}</div>)}
                </div>
            </div>
        </div>
        <Gallerie items={collection.galleries} onSelect={onSelect}/>
        </>
    )
}