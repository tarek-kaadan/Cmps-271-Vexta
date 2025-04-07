import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import GameCard from "./GameCard";

interface Game {
  id: number;
  title: string;
  image: string;
  category: string;
  OriginCountry: string;
  numberOfPlayers: number;
  description: string;
  fullDescription: string;
  rating: number;
}

export default function GameDetail() {
  const { title } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/games/title/${title}`
        );
        setGame(res.data);
      } catch (error) {
        setError("Game not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [title]);

  if (loading) return <p className="loading-message">Loading game...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!game) return <p>Game not found.</p>;

  return (
    <>
      <Header className="gameDetail-header" />
      <GameCard
        title={game.title}
        description={game.description}
        rating={game.rating}
        image={game.image}
        category={game.category}
        originCountry={game.OriginCountry}
        numberOfPlayers={game.numberOfPlayers}
      />
    </>
  );
}
