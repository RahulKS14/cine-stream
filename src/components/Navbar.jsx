import { NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">Cine-Stream</NavLink>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/favorites">Favorites ({favorites.length})</NavLink>
      </div>
    </nav>
  );
}