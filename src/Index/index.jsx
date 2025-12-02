import Gallerie from '../Gallerie';

export default function Index({ collection, onSelect }) {
    return (
        <>
        
        <div className='card-container'>
            <div className="bt-play">
                <button onClick={()=>onSelect(collection.galleries[0].manifest, true)}>Play</button>)
            </div>
            <div class="card">
            <img src={collection.index.image} alt={collection.index.title} />
            <div class="content">
                <div class="meta"></div>
                <h1>{collection.index.title}</h1>
                <p>
                {collection.index
                .summary}
                </p>
            </div>
            </div>
        </div>
        <Gallerie items={collection.galleries} onSelect={onSelect}/>
        </>
    )
}