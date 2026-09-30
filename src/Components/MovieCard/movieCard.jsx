import "./movieCard.css";

function MovieCard({ title, overview, posterPath }) {
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : null;

  return (
    <article className="movie-card">
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
    </article>
  );
}

export default MovieCard;
