import "./StyleComponents/BigDiv.css";

export default function BigImage() {
  return (
    <div
      className="BigDiv"
      style={{
        backgroundImage:
          "url(https://www.theloadout.com/wp-content/uploads/2021/08/ghost-of-tsushima-2-everything-we-know.jpg)",
      }}
    >
      <h2>Game Name</h2>
      <button>Click here</button>
    </div>
  );
}
