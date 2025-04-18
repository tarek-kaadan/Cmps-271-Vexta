import React from 'react';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      height: '90vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        backgroundColor: 'rgba(84, 84, 84, 0.8)',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  </div>
);

export default AuthWrapper;
