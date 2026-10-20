import "./movieDetailsModal.css";
import MovieTrailer from "./MovieTrailer";

function MovieDetailsModal({ movie, onClose }) {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : null;

  const genres = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="movie-modal__backdrop">
      <section
        className="movie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
      >
        <button type="button" onClick={onClose}>
          Fermer
        </button>

        {backdropUrl && <img src={backdropUrl} alt="" />}

        <h2 id="movie-modal-title">{movie.title}</h2>
        <p>{genres}</p>
        <p className="movie-modal__meta">
          {movie.release_date?.slice(0, 4)} . {movie.runtime} minutes
        </p>
        <p className="movie-modal__tagline">{movie.tagline}</p>
        <p className="movie-modal__overview">{movie.overview}</p>
        {movie.vote_average > 0 && (
          <p className="movie-modal__rating">
            ★ {movie.vote_average.toFixed(1)}/10
            <span> ({movie.vote_count.toLocaleString("fr-Fr")} votes)</span>
          </p>
        )}
        <MovieTrailer videos={movie.videos?.results} title={movie.title} />
      </section>
    </div>
  );
}

export default MovieDetailsModal;
