import { useEffect, useState } from "react";
import axios from "axios";

function useMovieSearch(query) {
  const [result, setResult] = useState({
    query: "",
    movies: [],
    error: null,
  });

  useEffect(() => {
    if (!query) return;

    let ignore = false;

    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        },
        params: {
          query,
          language: "fr-FR",
          page: 1,
          include_adult: false,
        },
      })
      .then(({ data }) => {
        if (ignore) return;

        const movies = data.results.filter(
          (movie) => movie.overview?.trim() && movie.poster_path,
        );

        setResult({ query, movies, error: null });
      })
      .catch((requestError) => {
        if (ignore) return;

        console.error(requestError);
        setResult({
          query,
          movies: [],
          error: "Imposssible d'effectuer la recherche.",
        });
      });
    return () => {
      ignore = true;
    };
  }, [query]);

  const isCurrentQuery = result.query === query;

  return {
    movies: query && isCurrentQuery ? result.movies : [],
    isLoading: Boolean(query) && !isCurrentQuery,
    error: isCurrentQuery ? result.error : null,
  };
}

export default useMovieSearch;
