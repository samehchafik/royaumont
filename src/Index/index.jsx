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
        <Gallerie items={collection.galleries} onSelect={onSelect}/>
        </>
    )
}