import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Footer from "./components/Footer";

type Game = {
  id: string;
  title: string;
  description: string;
  overlayImage: string;
  averageRating: number;
};

const AllGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchGames();
  }, [search, page]);

  const fetchGames = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/games/AllGames", {
        params: { search, page, limit: 6 },
      });
      setGames(res.data.games);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      <Header className="gameDetail-header" />
      <div style={{ padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{ padding: "10px", width: "300px", fontSize: "16px" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {games.map((game) => (
            <Card
              title={game.title}
              description={game.description}
              image={game.overlayImage}
              rating={game.averageRating}
            />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handlePrev}
            disabled={page === 1}
            style={{ borderRadius: "30px", border: "none" }}
          >
            Prev
          </button>
          <span style={{ margin: "0 15px" }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            style={{ borderRadius: "30px", border: "none" }}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllGames;
