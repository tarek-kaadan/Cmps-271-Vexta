interface SeperatorProps {
  text: string;
  margintop?: number;
}

const Seperator = ({ text, margintop }: SeperatorProps) => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          margin: 0,
          marginTop: margintop,
          fontFamily: '"Jersey 10", sans-serif',
          fontSize: "3.5rem",
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textAlign: "center",
        }}
      >
        {text}
      </h2>
    </div>
  );
};

export default Seperator;
