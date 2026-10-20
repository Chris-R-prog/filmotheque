import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../services/auth";
import "../auth.css";

function Connexion() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    let loginSucceeded;

    try {
      loginSucceeded = await login(
        formData.get("username"),
        formData.get("password"),
      );
    } catch {
      setError("La connexion à TMDB a échoué.");
      return;
    }

    if (!loginSucceeded) {
      setError("Identifiant ou mot de passe Cinebox incorrect.");
      return;
    }

    navigate("/");
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Connexion</h2>

        {error && (
          <p className="auth-message auth-message--error" role="alert">
            {error}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-username">Identifiant</label>
          <input
            id="login-username"
            name="username"
            autoComplete="username"
            required
          />

          <label htmlFor="login-password">Mot de passe</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />

          <button type="submit">Se connecter</button>
        </form>
      </div>
    </section>
  );
}

export default Connexion;
