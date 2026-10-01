import MovieCard from "../MovieCard/MovieCard";
import "./movieSection.css";

// On passe le titre de la section et le flux API
function MovieSection({ title, movies }) {
  return (
    <section className="movie-section">
      <h2 className="movie-section__title">{title}</h2>

      <div className="movie-section__grid">
        {movies.slice(0, 5).map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
