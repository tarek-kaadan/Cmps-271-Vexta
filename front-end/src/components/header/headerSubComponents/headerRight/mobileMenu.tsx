import { Link } from 'react-router-dom';
import { RefObject } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  username: string | null;
  handleLogout: () => void;
  setIsOpen: (value: boolean) => void;
  mobileMenuRef: RefObject<HTMLDivElement | null>;
}

export default function MobileMenu({
  isOpen,
  username,
  handleLogout,
  setIsOpen,
  mobileMenuRef,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="mobile-menu" ref={mobileMenuRef}>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/recommendations" onClick={() => setIsOpen(false)}>
              All Games
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mobile-auth">
        {username ? (
          <>
            <Link to="/friends" onClick={() => setIsOpen(false)}>
              👥 Friends
            </Link>
            <button onClick={handleLogout}>🚪 Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
