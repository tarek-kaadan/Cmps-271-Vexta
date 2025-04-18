import React, { ChangeEvent } from 'react';

interface SignupInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SignupInput: React.FC<SignupInputProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      required
      style={{
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        outline: 'none',
        transition: '0.2s ease',
      }}
    />
  );
};

export default SignupInput;
