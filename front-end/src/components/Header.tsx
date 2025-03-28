import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "15px 30px", 
      position: "absolute",
      width: "100%",
      top: 0,
      left: 0,
      background: "transparent", 
      color: "white"
    }}>
      {/* Left: Logo */}
      <h1 style={{ margin: 0, fontSize: "35px", fontWeight: "bold" }}>Vexta</h1>

      {/* Center: Navigation Links */}
      <nav>
        <ul style={{ 
          display: "flex", 
          listStyle: "none", 
          gap: "25px", 
          margin: 0, 
          padding: 0 
        }}>
          <li>
            <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>Home</Link>
          </li>
          <li>
            <Link to="/about" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>About</Link>
          </li>
          <li>
            <Link to="/recommendations" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>Recommendations</Link>
          </li>
        </ul>
      </nav>

      {/* Right: Auth Buttons */}
      <div>
        <Link to="/login" style={{ 
          color: "cyan", 
          textDecoration: "none", 
          fontWeight: "bold", 
          marginRight: "15px",
          fontSize: "18px"
        }}>Login</Link>
        <Link to="/signup" style={{ 
          color: "orange", 
          textDecoration: "none", 
          fontWeight: "bold", 
          fontSize: "18px"
        }}>Sign Up</Link>
      </div>
    </header>
  );
}
