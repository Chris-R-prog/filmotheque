import "./movieCard.css";

// Carte interactive ouvrant le détail d'un film.
function MovieCard({ id, title, overview, posterPath, onSelect }) {
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : null;

  return (
    <button
      className="movie-card"
      type="button"
      onClick={() => onSelect(id)}
    >
      {posterUrl ? (
        <img
          className="movie-card__poster"
          src={posterUrl}
          alt={`Affiche du film ${title}`}
        />
      ) : (
        <div className="movie-card__placeholder">Affiche indisponible</div>
      )}
      <div className="movie-card__content">
        <h3>{title}</h3>
        <p>{overview}</p>
      </div>
    </button>
  );
}

export default MovieCard;
