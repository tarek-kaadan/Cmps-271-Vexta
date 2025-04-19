import React, { useState, useEffect } from 'react';

interface GradientCardProps {
  name: string;
  onClick: () => void;
}

const GradientCard: React.FC<GradientCardProps> = ({ name, onClick }) => {
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
        backgroundColor: 'rgba(84, 84, 84, 0.8)',
        padding: isMobile ? '20px' : '30px',
        paddingLeft: isMobile ? '30px' : '50px',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        width: isMobile ? '90%' : '20%',
        margin: isMobile ? '10px auto' : undefined,
        boxSizing: 'border-box',
      }}
      onClick={onClick}
    >
      <h1
        style={{
          background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontFamily: '"Jersey 10", sans-serif',
          margin: 0,
          fontSize: isMobile ? '1.5rem' : '2rem',
        }}
      >
        {name}
      </h1>
      <p style={{ color: '#fff', fontSize: isMobile ? '0.9rem' : '1rem' }}>click to know more</p>
    </div>
  );
};

export default GradientCard;
