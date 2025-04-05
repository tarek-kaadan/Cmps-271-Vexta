import "./StyleComponents/BigDiv.css";

interface Props {
  name: String,
  image: String,
  link: String
}

export default function BigImage({ name, image, link }: Props) {
  return (
    <div
      className="BigDiv"
      style={{
        backgroundImage: `url(${image})`
      }}
    >
      <h2>{name}</h2>
      <button>Click here</button>
    </div>
  );
}
