import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import "./Home.css";

export default function Home() {
  const [beers, setBeers] = useState([]);
  const [currentBeer, setCurrentBeer] = useState("");

  useEffect(() => {
    const fetchBeers = async () => {
      const res = await axios.get("https://api.sampleapis.com/beers/ale");
      const parsedData = res.data.map((beer) => ({
        ...beer,
        price: parseFloat(beer.price.replace("$", "")),
        rating: {
          average: beer.rating.average,
          reviews: beer.rating.reviews,
        },
      }));
      setBeers(parsedData);
    };

    fetchBeers();
  }, []);

  const handleSort = () => {
    const sortedData = [...beers].sort((a, b) => a.price - b.price);
    setBeers(sortedData);
  };

  const handleFilter = () => {
    const filteredData = beers.filter((beer) => beer.rating.average > 4.5);
    setBeers(filteredData);
  };

  const handleBeerSelection = (beer) => {
    setCurrentBeer(beer.name);
  };

  return (
    <div>
      <button onClick={handleSort}>Sort</button>
      <button onClick={handleFilter}>Filter</button>
      <div>{currentBeer}</div>
      <div className="beer-list">
        {beers.map((beer) => (
          <Card
            key={beer.id}
            name={beer.name}
            imageLink={beer.image}
            cost={beer.price}
            ratings={beer.rating.average}
            onClick={() => handleBeerSelection(beer)} 
          />
        ))}
      </div>
    </div>
  );
}
