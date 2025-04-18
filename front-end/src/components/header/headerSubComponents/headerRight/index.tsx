import { Link } from 'react-router-dom';
import { RefObject } from 'react';

interface AuthSectionProps {
  username: string | null;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  handleLogout: () => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

const AuthSection = ({
  username,
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
  dropdownRef,
}: AuthSectionProps) => {
  return (
    <div className="right-section">
      {username ? (
        <div className="user-dropdown" ref={dropdownRef}>
          <button className="username-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {username}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/friends" onClick={() => setDropdownOpen(false)}>
                👥 Friends
              </Link>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">
            Login
          </Link>
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthSection;
