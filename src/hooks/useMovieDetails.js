import { useEffect, useState } from "react";
import axios from "axios";

// On passe l'id de la carte pour obtenir le détail du film
function useMovieDetails(movieId) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        },
        params: {
          language: "fr-FR",
          append_to_response: "videos",
        },
      })
      .then(({ data }) => {
        console.log("vidéos :", data.videos?.results);
        setMovie(data);
        setError(null);
      })

      .catch((requestError) => {
        console.error(requestError);
        setError("Impossible de charger le détail du film");
      });
  }, [movieId]);
  return { movie, error };
}

export default useMovieDetails;
