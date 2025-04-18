interface SeperatorProps {
  text: string;
}

const Seperator = ({ text }: SeperatorProps) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(84, 84, 84, 0.8)',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: '"Jersey 10", sans-serif',
          fontSize: '2.5rem',
          background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textAlign: 'center',
        }}
      >
        {text}
      </h2>
    </div>
  );
};

export default Seperator;
