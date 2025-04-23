import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/filterSection/Card/Card";
import { API_BASE_URL } from ".././config";
interface Game {
  _id: string;
  title: string;
  description: string;
  overlayImage: string;
  OriginCountry: string;
  averageRating: number;
}

export default function CountryGamesPage() {
  const { countryName } = useParams();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/games`).then((res) => {
      setGames(res.data);
    });
  }, []);

  const filtered = games.filter((game) => game.OriginCountry === countryName);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Games from {countryName}</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((game) => (
            <Card
              key={game._id}
              _id={game._id}
              title={game.title}
              description={game.description}
              image={game.overlayImage}
              rating={game.averageRating}
            />
          ))
        ) : (
          <p>No games found for this country.</p>
        )}
      </div>
    </div>
  );
}
