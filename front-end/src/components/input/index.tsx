import React from 'react';

interface Props {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const AuthInput: React.FC<Props> = ({ type = 'text', placeholder, value, onChange, required }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
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

export default AuthInput;
