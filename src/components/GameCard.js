import React from "react";
import "./GameCard.css";

const GameCard = ({ image, title, description }) => {
  return (
    <div className="game-card">
      <img src={image} alt={title} />
      <h4>{title}</h4>
      <p>{description}</p>
      <a href="/game-details" className="btn">View Details</a>
    </div>
  );
};

export default GameCard;
