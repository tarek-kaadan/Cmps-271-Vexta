import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookmarkedGames = () => {
  const [games, setGames] = useState<any[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}/bookmarks`);
        setGames(res.data);
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
      }
    };

    if (userId) fetchBookmarks();
  }, [userId]);

  return (
    <div className="bookmarked-page" style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "20px", textAlign: "center" }}>❤️ Your Bookmarked Games</h2>
  
      {games.length === 0 ? (
        <p style={{ fontSize: "18px" , textAlign: "center"}}>No bookmarks yet.</p>
      ) : (
        <div
          className="games-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {games.map((game) => (
            <div
              key={game._id}
              className="game-card"
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
            >
              <Link
                to={`/games/title/${game.title}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={game.image}
                  alt={game.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h3 style={{ fontSize: "18px", marginTop: "10px" }}>{game.title}</h3>
                <p style={{ fontSize: "14px", color: "#555" }}>{game.description}</p>
                <p style={{ fontSize: "14px", color: "#f39c12" }}>⭐ {game.rating}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );  
};

export default BookmarkedGames;
