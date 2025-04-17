import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>("/default.jpg");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedProfilePicture = localStorage.getItem("profilePicture");

    setUsername(storedUsername || null);
    setProfilePicture(
      storedProfilePicture
        ? `http://localhost:5000/${storedProfilePicture}`
        : `http://localhost:5000/uploads/default.jpg`
    );
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className={className}>
      <div className="header-content">
        <h1>Vexta</h1>
        <nav className="desktop-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/All-Games">All Games</Link></li>
          </ul>
        </nav>

        <div className="right-section">
          {username ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <button
                className="username-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <img
                  src={profilePicture}
                  alt="Profile"
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                {username}
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/friends" onClick={() => setDropdownOpen(false)}>
                    👥 Friends
                  </Link>
                  <Link to="/change-profile-picture" onClick={() => setDropdownOpen(false)}>
                    🖼️ Change Picture
                  </Link>
                  <button onClick={handleLogout}>🚪 Log out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </div>
          )}
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        {isMobileMenuOpen && (
          <div className="mobile-menu" ref={mobileMenuRef}>
            <nav>
              <ul>
                <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
                <li><Link to="/recommendations" onClick={() => setIsMobileMenuOpen(false)}>All Games</Link></li>
              </ul>
            </nav>

            <div className="mobile-auth">
              {username ? (
                <>
                  <Link to="/friends" onClick={() => setIsMobileMenuOpen(false)}>👥 Friends</Link>
                  <Link to="/change-profile-picture" onClick={() => setIsMobileMenuOpen(false)}>🖼️ Change Picture</Link>
                  <button onClick={handleLogout}>🚪 Log out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
