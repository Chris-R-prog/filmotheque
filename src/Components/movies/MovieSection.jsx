import MovieCard from "./MovieCard";
import "./movieSection.css";

// On passe le titre de la section et le flux API
function MovieSection({ title, movies, onSelect }) {
  return (
    <section className="movie-section">
      <h2 className="movie-section__title">{title}</h2>

      <div className="movie-section__track">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            posterPath={movie.poster_path}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
