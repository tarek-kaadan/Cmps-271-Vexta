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
          fontFamily: '"Poppins", "sans-serif"',
          fontWeight: 600,
          fontStyle: "bold",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "rgba(0, 0, 0, 0.76)",
          textAlign: "center",
        }}
      >
        {text}
      </h2>
    </div>
  );
};

export default Seperator;
