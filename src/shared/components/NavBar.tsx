import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav style={{ marginBottom: "40px" }}>
      <Link to={`/`} style={{ marginRight: "40px" }}>
        Characters
      </Link>
      <Link to={`/episodes`} style={{ marginRight: "40px" }}>
        Episodes
      </Link>
      <Link to={`/favorites`}>Favorites</Link>
    </nav>
  );
};
