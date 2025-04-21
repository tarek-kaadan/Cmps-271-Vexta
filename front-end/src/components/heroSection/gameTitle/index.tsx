import React, { useState, useEffect } from 'react';

interface GradientCardProps {
  name: string;
  onClick: () => void;
  LoggedIn: boolean;
}

const GradientCard: React.FC<GradientCardProps> = ({ name, onClick, LoggedIn }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // run on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'rgba(26, 26, 26, 0.42)',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        cursor: 'pointer',
        height: "100%",
        width: '100%',
        boxSizing: 'border-box',
      }}
      //onClick={onClick}
    >
      <h1
        style={{
          color: "rgba(255, 255, 255, 0.9)",
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          fontFamily: '"Poppins", "sans-serif"',
          fontWeight: 600,
          fontStyle: "bold",
          margin: 0,
          fontSize: isMobile ? '1.5rem' : '50px',
        }}
      >
        {name}
      </h1>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: LoggedIn ? "20px" : "0px",
        alignContent: "center",
        alignItems: "center"
      }}>
        {LoggedIn && <button style={{
          padding: '15px',
          borderRadius: '30px'
        }}>Click here</button>}
        <button style={{
          padding: '15px 30px 15px 30px',
          background: "linear-gradient(to right, #FFC107, #FF7043)",
          border: "none",
          fontFamily: '"Poppins", "sans-serif"',
          fontWeight: 400,
          fontStyle: "bold",
          color: "black",
          borderRadius: '30px',
        }}>Discover Games</button>
      </div>
    </div>
  );
};

export default GradientCard;
