import VextaLogo from '../VextaIcon';

const Footer = () => {
  return (
    <footer
      style={{
        padding: '5px',
        position: 'relative',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(84, 84, 84, 0.8)',
      }}
    >
      <VextaLogo />
    </footer>
  );
};

export default Footer;
