const AuthHeading: React.FC<{ title: string }> = ({ title }) => (
  <h2
    style={{
      marginBottom: '1.5rem',
      fontSize: '2rem',
      fontWeight: 600,
      color: '#fff',
    }}
  >
    {title}
  </h2>
);

export default AuthHeading;
