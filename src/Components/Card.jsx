import './Card.css'

export default function Card({name, imageLink, cost, ratings, onClick}) {
  return (
    <div className="card" onClick={onClick}>
        <img src={imageLink} alt={name}/>
        <div className="card-body">
            <h2>{name}</h2>
            <p>Price: {cost}</p>
            <p>Rating: {ratings}</p>
        </div>
    </div>
  )
}
