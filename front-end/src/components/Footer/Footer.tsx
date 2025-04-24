import './Footer.css';
import VextaLogo from '../VextaIcon';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">All Games</a></li>
              <li><a href="#">World Map</a></li>
            </ul>
          </div>

          <div className="footer-column" />

          <div className="footer-column align-right">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="footer-social">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Vexta. All rights reserved.</p>
          <div className="footer-logo-wrapper">
            <VextaLogo />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
