import React, { ChangeEvent } from 'react';

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  toggleShow: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  onChange,
  show,
  toggleShow,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
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
        onClick={toggleShow}
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
        {show ? '🙈' : '👁️'}
      </span>
    </div>
  );
};

export default PasswordInput;
