import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const username = localStorage.getItem("username");
  const isLoggedIn = !!username;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
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
        position: "relative",
        backgroundColor: "#111",
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
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/recommendations"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              Recommendations
            </Link>
          </li>
        </ul>
      </nav>

      <div style={{ position: "relative" }}>
        {!isLoggedIn ? (
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
        ) : (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                backgroundColor: "#333",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              👤 {username}
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  backgroundColor: "#222",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    color: "white",
                    backgroundColor: "#c0392b",
                    border: "none",
                    padding: "8px 14px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    borderRadius: "6px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  🚪 Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
