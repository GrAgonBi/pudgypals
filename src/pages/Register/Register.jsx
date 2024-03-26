import "./Register.scss";
import LandingLogo from "../../components/LandingLogo/LandingLogo";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";

function Register() {
  return (
    <main>
      <LandingLogo />
      <section className="register">
        <h1 className="register__title">Register an Account</h1>
        <form className="register__form">
          <Input name="username" type="text" label="Username" />
          <Input name="email" type="text" label="Email" />
          <Input name="password" type="password" label="Password" />
          <button className="register__button">Sign up</button>
        </form>
        <h2 className="register__text">
          Already have an account?
          <Link to="/login" className="register__link">
            Login Here
          </Link>
        </h2>
      </section>
    </main>
  );
}

export default Register;
