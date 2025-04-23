import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import VextaLogo from '../VextaIcon';
import DesktopNav from './headerSubComponents/navigationBar';
import AuthSection from './headerSubComponents/headerRight';
import MobileMenu from './headerSubComponents/headerRight/mobileMenu';
import { API_BASE_URL } from '../../config'; 
const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedProfilePicture = localStorage.getItem("profilePicture");

    
    setUsername(storedUsername || null);
    if (storedProfilePicture) {
      setProfilePicture(`${API_BASE_URL}${storedProfilePicture}`);
    } else {
      setProfilePicture(`${API_BASE_URL}/uploads/default.jpg`);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest('.mobile-menu-button')
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        background: 'linear-gradient(to right, #1A237E, #6A1B9A)',
        height: '80px',
        marginBottom: '80px',
        backdropFilter: 'blur(10px)',
        boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '85%',
          margin: '0 auto',
        }}
      >
        <VextaLogo />
        <DesktopNav />
        <AuthSection
          username={username}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          handleLogout={handleLogout}
          dropdownRef={dropdownRef}
          profilePicture ={profilePicture}
        />
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          username={username}
          handleLogout={handleLogout}
          setIsOpen={setIsMobileMenuOpen}
          mobileMenuRef={mobileMenuRef}
        />
      </div>
    </header>
  );
};

export default Header;
