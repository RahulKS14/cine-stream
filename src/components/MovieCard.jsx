import { IMG_URL } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(movie.id);

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="movie-card">
      <div className="poster-wrap">
        {movie.poster_path ? (
          <img
            src={`${IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="no-poster">No Image</div>
        )}
        <button
          type="button"
          className={`heart ${fav ? "active" : ""}`}
          onClick={() => toggleFavorite(movie)}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        >
          {fav ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="meta">
          <span>{year}</span>
          <span>⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
}