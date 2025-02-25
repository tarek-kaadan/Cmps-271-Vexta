import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Vexta</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/all-games">All Games</Link></li>
        <li><Link to="/recommended">Recommended for You</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <div className="login-btn">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
