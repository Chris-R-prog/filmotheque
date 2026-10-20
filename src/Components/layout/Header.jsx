import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { isAuthenticated } from "../../services/auth";
import "./header.css";

// En-tête commun à toutes les pages.
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  useEffect(() => {
    function updateAuthentication() {
      setIsLoggedIn(isAuthenticated());
    }

    window.addEventListener("cinebox-auth-change", updateAuthentication);

    return () => {
      window.removeEventListener("cinebox-auth-change", updateAuthentication);
    };
  }, []);

  return (
    <header className="site-header">
      <Link className="site-header__brand" to="/" aria-label="Accueil Cinebox">
        <span className="site-header__logo" aria-hidden="true">
          <img src={logo} alt="" />
        </span>
        <span className="site-header__title">
          CINE<span>BOX</span>
        </span>
      </Link>

      <nav className="site-header__nav" aria-label="Compte utilisateur">
        {!isLoggedIn && (
          <NavLink className="site-header__register" to="/register">
            S'inscrire
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
