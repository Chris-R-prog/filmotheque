import MovieCard from "./Components/MovieCard/MovieCard";
import useMovies from "./hooks/useMovies";
import Header from "./Components/Header/Header";

function App() {
  const { movies, isLoading, error } = useMovies();

  if (isLoading) {
    return <p>Chargement des films...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <>
      <Header />
      <main className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            posterPath={movie.poster_path}
          />
        ))}
      </main>
    </>
  );
}

export default App;
