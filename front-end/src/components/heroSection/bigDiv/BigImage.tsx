import GradientCard from "../gameTitle";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  image: string;
  link?: string;
  margintop?: string;
}

export default function BigImage({ name, image, margintop }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/title/${name}`);
  };
  const LoggedIn = name !== "Discover our Big colletion of games";
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "600px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        backgroundAttachment: "fixed",
        boxSizing: "border-box",
        marginTop: margintop,
      }}
    >
      <GradientCard name={name} onClick={handleClick} LoggedIn={LoggedIn} />
    </div>
  );
}
