import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  _id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
}

export default function Card({ title, description, image, rating, _id }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const userId = localStorage.getItem("userId");

  // Check if already bookmarked
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}/bookmarks`);
        const isBookmarked = res.data.some((game: any) => game.title === title);
        setBookmarked(isBookmarked);
      } catch (err) {
        console.error("Failed to check bookmark:", err);
      }
    };

    fetchBookmarkStatus();
  }, [userId, title]);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop link navigation
    try {
      await axios.post(`http://localhost:5000/api/users/${userId}/bookmark`, {
        gameId: _id,
      });
      setBookmarked((prev) => !prev);
    } catch (error) {
      console.error("Bookmark failed:", error);
    }
  };

  return (
    <Link
      to={`/games/title/${title}`}
      className="card"
      style={{
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
        minHeight: "320px",
      }}
    >
      {/* Heart at Top Right */}
      <button
        onClick={handleBookmark}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "22px",
          cursor: "pointer",
          color: bookmarked ? "red" : "gray",
        }}
        title="Save to Bookmarks"
      >
        {bookmarked ? "❤️" : "🤍"}
      </button>

      <img
        src={image}
        alt="Game Picture"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h2 style={{ fontSize: "18px", marginTop: "10px" }}>{title}</h2>
      <p style={{ fontSize: "14px", color: "#555", marginTop: "5px" }}>{description}</p>
      <p style={{ fontSize: "13px", marginTop: "auto" }}>⭐ {rating}</p>
    </Link>
  );
}
