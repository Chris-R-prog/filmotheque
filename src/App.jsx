import MovieSection from "./Components/MovieSection/MovieSection";
import useMovies from "./hooks/useMovies";
import Header from "./Components/Header/Header";

function App() {
  const popular = useMovies({
    endpoint: "movie/popular",
  });

  const fantasy = useMovies({
    endpoint: "discover/movie",
    genreId: 14,
  });

  const isLoading = popular.isLoading || fantasy.isLoading;
  const error = popular.error || fantasy.error;

  if (isLoading) {
    return <p>Chargement des films...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <>
      <main>
        <Header />
        <MovieSection title="Films populaires" movies={popular.movies} />
        <MovieSection
          title="Le meilleur du fantastique"
          movies={fantasy.movies}
        />
      </main>
    </>
  );
}

export default App;
