import axios from "axios";

// Client Axios commun à tous les appels vers l'API TMDB.
const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  headers: {
    // Ce token identifie notre application auprès de TMDB.
    // Ce n'est pas encore la session d'un utilisateur connecté.
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
  },
});

export default tmdbApi;
