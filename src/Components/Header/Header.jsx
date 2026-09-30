import "./header.css";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__logo" aria-hidden="true">
        <img src={logo} alt="" />
      </div>

      <h1 className="site-header__title">
        CINE<span>BOX</span>
      </h1>

      <button className="site-header__login" type="button">
        Connexion
      </button>
    </header>
  );
}

export default Header;
