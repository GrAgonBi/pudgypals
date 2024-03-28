import "./Footer.scss";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <NavLink className="footer__link" to="/user/progress">
        progress
      </NavLink>
      <NavLink className="footer__link" to="/user/profile">
        profile
      </NavLink>
    </footer>
  );
}

export default Footer;
