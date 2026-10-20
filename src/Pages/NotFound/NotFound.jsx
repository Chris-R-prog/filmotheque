import { Link } from "react-router";
import "../auth.css";

function NotFound() {
  return (
    <section className="auth-page">
      <div className="auth-card auth-card--centered">
        <p className="auth-card__eyebrow">Erreur 404</p>
        <h2>Page introuvable</h2>
        <p className="auth-card__intro">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link className="auth-card__home-link" to="/">
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
