import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../filterSection/Card/Card";
import Game from "../../data/interfaces/GameInterface";
import Seperator from "../seperator";
import { API_BASE_URL } from '../../config'; 
const BookmarkedGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users/${userId}/bookmarks`);
        setGames(res.data);
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
      }
    };

    if (userId) fetchBookmarks();
  }, [userId]);

  return (
    <div style={{ padding: "40px 20px" }}>
      <Seperator text="❤️ Your Bookmarked Games" />

      {games.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "18px" }}>
          You haven't bookmarked any games yet.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "25px",
            marginTop: "20px",
          }}
        >
          {games.map((game) => (
            <Card
              key={game._id}
              _id={game._id}
              title={game.title}
              description={game.description}
              image={game.overlayImage}
              rating={game.averageRating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedGames;
