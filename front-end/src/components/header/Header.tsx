import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import VextaLogo from '../VextaIcon';
import DesktopNav from './headerSubComponents/navigationBar';
import AuthSection from './headerSubComponents/headerRight';
import MobileMenu from './headerSubComponents/headerRight/mobileMenu';

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

    console.log("🧠 Stored profile picture:", storedProfilePicture);
    
    setUsername(storedUsername || null);
    if (storedProfilePicture) {
      setProfilePicture(`http://localhost:5001/${storedProfilePicture}`);
    } else {
      setProfilePicture("http://localhost:5001/uploads/default.jpg");
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
        backgroundColor: 'rgba(84, 84, 84, 0.3)',
        height: '80px',
        marginBottom: '80px',
        backdropFilter: 'blur(10px)',
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
