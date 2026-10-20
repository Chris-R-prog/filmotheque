import { useState } from "react";
import MovieDetailsModal from "../../Components/movies/MovieDetailsModal";
import MovieSection from "../../Components/movies/MovieSection";
import SearchBar from "../../Components/search/SearchBar";
import useMovieDetails from "../../hooks/useMovieDetails";
import useMovies from "../../hooks/useMovies";
import useMovieSearch from "../../hooks/useMovieSearch";
import { isAuthenticated, login } from "../../services/auth";
import "../auth.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    const formData = new FormData(event.currentTarget);

    try {
      const loginSucceeded = await login(
        formData.get("username"),
        formData.get("password"),
      );

      if (!loginSucceeded) {
        setLoginError("Identifiant ou mot de passe Cinebox incorrect.");
        return;
      }

      setIsLoggedIn(true);
    } catch {
      setLoginError("La connexion à TMDB a échoué.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  const topRated = useMovies({ endpoint: "movie/top_rated" });
  const popular = useMovies({ endpoint: "movie/popular" });
  const fantasy = useMovies({
    endpoint: "discover/movie",
    genreId: 14,
  });

  const search = useMovieSearch(searchQuery);
  const movieDetails = useMovieDetails(selectedMovieId);

  const hasSearch = Boolean(searchQuery);
  const displayedMovies = hasSearch ? search.movies : topRated.movies;
  const sectionTitle = hasSearch
    ? `Résultats pour "${searchQuery}"`
    : "Les mieux notés";

  const selectedMovie =
    movieDetails.movie?.id === selectedMovieId ? movieDetails.movie : null;
  const isLoading =
    topRated.isLoading || popular.isLoading || fantasy.isLoading;
  const error = topRated.error || popular.error || fantasy.error;

  if (isLoading) {
    return <p className="page-message">Chargement des films...</p>;
  }

  if (error) {
    return (
      <p className="page-message" role="alert">
        {error}
      </p>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <section className="search-section" aria-label="Recherche de films">
          <SearchBar onSearch={setSearchQuery} />

          {search.isLoading ? (
            <p role="status">Recherche en cours...</p>
          ) : search.error ? (
            <p role="alert">{search.error}</p>
          ) : hasSearch && search.movies.length === 0 ? (
            <p role="status">Aucun film trouvé pour "{searchQuery}"</p>
          ) : (
            <MovieSection
              title={sectionTitle}
              movies={displayedMovies.slice(0, 5)}
              onSelect={setSelectedMovieId}
            />
          )}
        </section>
      ) : (
        <section className="auth-page auth-page--home">
          <div className="auth-card">
            <p className="auth-card__eyebrow">Espace membre</p>
            <h2>Connexion Cinebox</h2>
            <p className="auth-card__intro">
              Connectez-vous pour utiliser la recherche.
            </p>

            {loginError && (
              <p className="auth-message auth-message--error" role="alert">
                {loginError}
              </p>
            )}

            <form className="auth-form" onSubmit={handleLogin}>
              <label htmlFor="cinebox-username">Identifiant</label>
              <input
                id="cinebox-username"
                name="username"
                autoComplete="username"
                required
              />

              <label htmlFor="cinebox-password">Mot de passe</label>
              <input
                id="cinebox-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />

              <button type="submit" disabled={isLoggingIn}>
                {isLoggingIn ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>
        </section>
      )}

      <MovieSection
        title="Films populaires"
        movies={popular.movies}
        onSelect={setSelectedMovieId}
      />
      <MovieSection
        title="Le meilleur du fantastique"
        movies={fantasy.movies}
        onSelect={setSelectedMovieId}
      />

      <MovieDetailsModal
        movie={selectedMovie}
        onClose={() => setSelectedMovieId(null)}
      />
    </>
  );
}

export default Home;
