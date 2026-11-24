import MovieGrid from "../components/MovieGrid";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p className="status">No favorites yet. Tap the heart on any movie.</p>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </>
  );
}