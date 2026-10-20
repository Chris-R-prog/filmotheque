import tmdbApi from "./tmdbapi";

const CURRENT_USER_KEY = "cinebox.currentUser";
const SESSION_ID_KEY = "tmdb.sessionId";
const configuredUser = {
  id: Number(import.meta.env.VITE_CINEBOX_USER_ID ?? 1),
  user: import.meta.env.VITE_TMDB_USERNAME,
  password: import.meta.env.VITE_TMDB_PASSWORD,
};

export async function login(username, password) {
  // 1. On vérifie les identifiants configurés dans .env.local.
  const user =
    configuredUser.user &&
    configuredUser.password &&
    configuredUser.user.toLowerCase() === username.trim().toLowerCase() &&
    configuredUser.password === password
      ? configuredUser
      : null;

  if (!user) {
    return false;
  }

  // 2. TMDB crée un token temporaire avec l'URL qui se termine par /new.
  const tokenResponse = await tmdbApi.get("/authentication/token/new");
  const requestToken = tokenResponse.data.request_token;

  // 3. Les identifiants configurés valident ce token chez TMDB.
  await tmdbApi.post("/authentication/token/validate_with_login", {
    username: user.user,
    password: user.password,
    request_token: requestToken,
  });

  // 4. Le token validé est transformé en session TMDB.
  const sessionResponse = await tmdbApi.post("/authentication/session/new", {
    request_token: requestToken,
  });

  // 5. On conserve la session et l'utilisateur, sans son mot de passe.
  sessionStorage.setItem(SESSION_ID_KEY, sessionResponse.data.session_id);
  sessionStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({ id: user.id, user: user.user }),
  );

  window.dispatchEvent(new Event("cinebox-auth-change"));
  return true;
}

export function isAuthenticated() {
  return (
    sessionStorage.getItem(CURRENT_USER_KEY) !== null &&
    sessionStorage.getItem(SESSION_ID_KEY) !== null
  );
}
