interface Props {
  message: string;
  type: 'success' | 'error';
}

const AuthMessage: React.FC<Props> = ({ message, type }) => (
  <p
    style={{
      background: type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 150, 0.1)',
      color: type === 'error' ? '#ff5555' : '#00ffa1',
      padding: '0.5rem',
      borderRadius: '6px',
      marginBottom: '1rem',
    }}
  >
    {message}
  </p>
);

export default AuthMessage;
