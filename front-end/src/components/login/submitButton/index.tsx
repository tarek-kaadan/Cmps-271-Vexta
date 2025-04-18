const AuthButton: React.FC<{ text: string }> = ({ text }) => (
  <button
    type="submit"
    style={{
      width: '100%',
      padding: '0.8rem',
      border: 'none',
      borderRadius: '8px',
      background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
      fontWeight: 600,
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    }}
  >
    {text}
  </button>
);

export default AuthButton;
