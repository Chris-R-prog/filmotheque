import MovieCard from "./Components/MovieCard/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        },
        params: {
          language: "fr-FR",
          page: 1,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
        setError("Impossible de charger les films.");
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  if (isLoading) {
    return <p>Chargement des films...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
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
  );
}

export default App;
