import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { Star } from "lucide-react";
import "./StyleComponents/gameCard.css";
import GamesGenre from "./GamesGenre";
import GamesRegion from "./GamesRegion";
import Recommendation from "./Recommendations";

interface Game {
  id: number;
  title: string;
  overlayImage: string;
  category: string;
  OriginCountry: string;
  numberOfPlayers: number;
  description: string;
  Video?: string;
  fullDescription: string;
  averageRating: number;
}

const getYouTubeEmbedUrl = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

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

  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        fill={index < rating ? "#FFD700" : "#ddd"}
        color={index < rating ? "#FFD700" : "#ddd"}
      />
    ));
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading game details...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );

  if (!game) return <p>Game not found.</p>;

  return (
    <>
      <Header className="gameDetail-header" />
      <div className="game-detail-container">
        <main className="game-content">
          <div className="game-hero">
            <img
              src={game.overlayImage}
              alt={game.title}
              className="game-main-image"
            />
            <div className="game-basic-info">
              <h1>{game.title}</h1>
              <div className="rating-container">
                {renderRating(game.averageRating)}
                <span>({game.averageRating}/5)</span>
              </div>
            </div>
          </div>

          <div className="game-details-grid">
            <div className="detail-card">
              <h3>📚 Category</h3>
              <p>{game.category}</p>
            </div>

            <div className="detail-card">
              <h3>🌍 Origin</h3>
              <p>{game.OriginCountry}</p>
            </div>

            <div className="detail-card">
              <h3>👥 Players</h3>
              <p>{game.numberOfPlayers}+</p>
            </div>

            <div className="detail-card">
              <h3>⭐ Popularity</h3>
              <p>Top 10 in {game.OriginCountry}</p>
            </div>
          </div>

          <section className="game-description">
            <h2>About {game.title}</h2>
            <p className="short-description">{game.description}</p>
            <p className="full-description">{game.fullDescription}</p>
          </section>
          {game.Video && (
            <div className="video-container">
              <iframe
                width="100%"
                height="400"
                src={getYouTubeEmbedUrl(game.Video)}
                title={`${game.title} gameplay`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </main>
      </div>
      <Recommendation />
      <GamesGenre />
      <GamesRegion />
    </>
  );
}
