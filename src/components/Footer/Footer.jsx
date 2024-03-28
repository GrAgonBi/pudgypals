import "./Footer.scss";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      {/* <div className="footer__link-container"> */}
      <NavLink className="footer__link" to="/user/progress">
        progress
      </NavLink>
      {/* </div> */}
      {/* <div className="footer__link-container"></div> */}
      <NavLink className="footer__link" to="/user/profile">
        profile
      </NavLink>
    </footer>
  );
}

export default Footer;
