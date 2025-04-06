import GameCard from "./GameCard";
import { useParams } from "react-router-dom";

export default function GameDetail() {
  const { title } = useParams();
  return (
    <>
      <h1>Game Detail Page</h1>
      <p>Here you can see detailed information about the selected game.</p>

      <GameCard />
    </>
  );
}
