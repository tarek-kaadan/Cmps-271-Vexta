import "./StyleComponents/BigDiv.css";
import { useNavigate } from "react-router-dom";

interface Props {
  name: String;
  image: String;
  link: String;
}

export default function BigImage({ name, image, link }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/title/${name}`);
  };

  return (
    <div
      className="BigDiv"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <h2>{name}</h2>
      <button onClick={handleClick}>Click here</button>
    </div>
  );
}
