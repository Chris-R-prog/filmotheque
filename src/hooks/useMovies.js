import { useEffect, useState } from "react";
import axios from "axios";

//Le hook est générique pour appeler les éléments thématiques de la section
function useMovies({ endpoint, genreId }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        },
        params: {
          language: "fr-FR",
          page: 1,
          ...(genreId
            ? {
                with_genres: genreId,
                sort_by: "popularity.desc",
              }
            : {}),
        },
      })
      .then(({ data }) => {
        const moviesWithOverview = data.results.filter((movie) =>
          Boolean(movie.overview?.trim()),
        );
        setMovies(moviesWithOverview);
      })
      .catch((requestError) => {
        console.error(requestError);
        setError("Impossible de charger les films.");
      })
      .finally(() => {
        // Délai artificiel conservé pour la démonstration.
        setTimeout(() => setIsLoading(false), 1000);
      });
  }, [endpoint, genreId]);
  return { movies, isLoading, error };
}

export default useMovies;
