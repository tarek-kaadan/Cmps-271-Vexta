import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  image: string;
  rating: number;
}

export default function Card({ title, description, image, rating }: Props) {
  return (
    <Link
      to={`/games/title/${title}`}
      className="card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <img src={image} alt="Game Picture"></img>
      <h2>{title}</h2>
      <div className="rating">
        <p>{rating}</p>
      </div>
      <p>{description}</p>
    </Link>
  );
}
