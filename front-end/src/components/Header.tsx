import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || null);
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header
      className={className}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#000",
        color: "white",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "35px", fontWeight: "bold" }}>Vexta</h1>

      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "25px",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link
              to="/"
              style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/recommendations"
              style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
            >
              Recommendations
            </Link>
          </li>
        </ul>
      </nav>

      <div ref={dropdownRef} style={{ position: "relative" }}>
        {username ? (
          <div>
            <div
              onClick={() => setDropdownOpen(prev => !prev)}
              style={{
                backgroundColor: "#333",
                padding: "8px 16px",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {username}
            </div>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  width: "160px",
                  backgroundColor: "#222",
                  borderRadius: "6px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                  zIndex: 1000,
                  overflow: "hidden",
                }}
              >
                <Link
                  to="/friends"
                  style={{
                    display: "block",
                    padding: "10px 15px",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "15px",
                  }}
                  onClick={() => setDropdownOpen(false)}
                >
                  👥 Friends
                </Link>
                <div
                  onClick={handleLogout}
                  style={{
                    padding: "10px 15px",
                    color: "#ff5555",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  🚪 Log out
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              style={{
                color: "cyan",
                textDecoration: "none",
                fontWeight: "bold",
                marginRight: "15px",
                fontSize: "18px",
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                color: "orange",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
