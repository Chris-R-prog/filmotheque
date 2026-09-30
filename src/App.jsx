import moviesData from "./Components/data/movies";
import MovieCard from "./Components/MovieCard/MovieCard";

function App() {
  return (
    <main className="movie-list">
      {moviesData.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          overview={movie.overview}
        />
      ))}
    </main>
  );
}

export default App;
