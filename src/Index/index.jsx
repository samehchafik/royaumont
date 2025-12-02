import Gallerie from '../Gallerie';

export default function Index({ collection, onSelect }) {
    return (
        <>
        <div className="index">
            <h1>{collection.index.title}</h1>
            <div className='image'>
                <img src={collection.index.image} alt="Index"/>
            </div>
            <p className='description'>{collection.index.summary}</p>
        </div>
        <div className='card-container'>
            <div class="card">
            <img src={collection.index.image} alt={collection.index.title} />
            <div class="content">
                <div class="meta"></div>
                <h1>{collection.index.title}</h1>
                <p>
                {collection.index.summary}
                </p>
            </div>
            </div>
        </div>
        <Gallerie items={collection.galleries} onSelect={onSelect}/>
        </>
    )
}