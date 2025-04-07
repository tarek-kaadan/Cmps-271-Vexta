import "./StyleComponents/gameCard.css";

interface Props {
  title: string;
  description: string;
  rating: number;
  image: string;
  category: string;
  originCountry: string;
  numberOfPlayers: number;
}

export default function GameCard({
  title,
  description,
  rating,
  image,
  category,
  originCountry,
  numberOfPlayers,
}: Props) {
  return (
    <>
      <h1>{title}</h1>
      <div className="container">
        <div className="placeHolder">
          <img src={image} alt={title} className="game-image" />
        </div>
        <div className="gameCard">
          <p className="Rating">Rating: {rating}</p>
          <hr className="divider" />
          <p>Category: {category}</p>
          <p>Origin Country: {originCountry}</p>
          <p>Number of Players: {numberOfPlayers}</p>
        </div>
      </div>
      <p className="description">{description}</p>
    </>
  );
}
