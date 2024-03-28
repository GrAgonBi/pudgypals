import "./Header.scss";
import logo from "../../assets/logos/logo-cat.png";
import { useNavigate } from "react-router";

function Header({ user, text }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <section className="header__name">
        <div className="header__logo">
          <img className="header__logo-image" src={logo} alt="logo" />
        </div>
        <h1 className="header__title">
          {user}'s {text}
        </h1>
      </section>
      <button className="header__button" onClick={() => navigate("/login")}>
        Log out
      </button>
    </header>
  );
}

export default Header;
