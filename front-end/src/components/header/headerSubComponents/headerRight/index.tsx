import { Link } from 'react-router-dom';
import { RefObject } from 'react';

interface AuthSectionProps {
  username: string | null;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  handleLogout: () => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
  profilePicture: string;
}

const AuthSection = ({
  username,
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
  dropdownRef,
  profilePicture,
}: AuthSectionProps) => {
  return (
    <div className="right-section">
      {username ? (
        <div className="user-dropdown" ref={dropdownRef}>
          <button className="username-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img
              src={profilePicture}
              alt="Profile"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            {username}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/friends" onClick={() => setDropdownOpen(false)}>
                👥 Friends
              </Link>
              <Link to="/bookmarked" onClick={() => setDropdownOpen(false)}>
                Bookmarked
              </Link>
              <Link to="/change-profile-picture" onClick={() => setDropdownOpen(false)}>
                  Change Picture
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
