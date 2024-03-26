import "./LandingLogo.scss";
import logo from "../../assets/images/pugdypal_bigLogo.png";

function LandingLogo() {
  return (
    <section className="logo">
      <div className="logo__container">
        <img className="logo__image" src={logo} alt="logo" />
      </div>
    </section>
  );
}

export default LandingLogo;
