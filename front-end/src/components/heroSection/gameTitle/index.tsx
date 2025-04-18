// GradientCard.tsx
import React from 'react';

interface GradientCardProps {
  name: string;
  onClick: () => void;
}

const GradientCard: React.FC<GradientCardProps> = ({ name, onClick }) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(84, 84, 84, 0.8)',
        padding: '30px',
        paddingLeft: '50px',
        borderTopRightRadius: '0.5rem',
        borderBottomRightRadius: '0.5rem',
        cursor: 'pointer',
        width: '20%',
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
        }}
      >
        {name}
      </h1>
      <p style={{ color: '#fff' }}>click to know more</p>
    </div>
  );
};

export default GradientCard;
