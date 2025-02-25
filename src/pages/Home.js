import React from "react";
import "./Home.css";
import GameCard from "../components/GameCard";

const Home = () => {
  const games = [
    { id: 1, image: "game1.jpg", title: "Adventure Quest", description: "Embark on a thrilling journey filled with mystery and excitement." },
    { id: 2, image: "game2.jpg", title: "Puzzle Mania", description: "Solve puzzles and unlock secrets in this mind-bending game." },
    { id: 3, image: "game3.jpg", title: "Speed Racer", description: "Experience high-octane racing like never before." }
  ];

  return (
    <div>
      <header className="welcome-banner">
        <h2>Welcome to Vexta</h2>
        <p>Your portal to endless gaming adventures. Dive into a world of fun and challenges!</p>
      </header>

      <section className="popular-games">
        <h3>Popular Games</h3>
        <div className="games-grid">
          {games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
        <div className="recommendations-btn-container">
          <a href="/recommended" className="recommendations-btn">Get Recommendations</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
