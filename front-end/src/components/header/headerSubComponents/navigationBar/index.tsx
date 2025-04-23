import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/About" },
  { label: "All Games", path: "/All-Games" },
  { label: "World Map", path: "/Map" },
];

const DesktopNav = () => {
  return (
    <nav className="desktop-nav">
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "20px",
          margin: 0,
          padding: 0,
        }}
      >
        {navItems.map(({ label, path }) => (
          <li key={path}>
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
