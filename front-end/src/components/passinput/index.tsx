import React from 'react';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  togglePassword: () => void;
}

const AuthPasswordInput: React.FC<Props> = ({ value, onChange, showPassword, togglePassword }) => (
  <div style={{ position: 'relative' }}>
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="Password"
      value={value}
      onChange={onChange}
      required
      style={{
        width: '100%',
        padding: '0.75rem',
        paddingRight: '3rem',
        marginBottom: '1rem',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        outline: 'none',
        transition: '0.2s ease',
      }}
    />
    <span
      onClick={togglePassword}
      style={{
        position: 'absolute',
        right: '12px',
        top: '40%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        fontSize: '1.2rem',
        lineHeight: 1,
      }}
    >
      {showPassword ? '🙈' : '👁️'}
    </span>
  </div>
);

export default AuthPasswordInput;
