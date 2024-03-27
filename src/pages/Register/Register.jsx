import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../../helper";
import axios from "axios";
import LandingLogo from "../../components/LandingLogo/LandingLogo";
import Input from "../../components/Input/Input";

function Register() {
  const [error, setError] = useState(null);
  const [shakeMessage, setShakeMessage] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShakeMessage(false);
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, {
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
      });
      sessionStorage.setItem("token", response.data.token);
      navigate("/initialSetup");
    } catch (error) {
      setError(error.response.data);
      setShakeMessage(true);
    }
  };
  return (
    <main>
      <LandingLogo />
      <section className="register">
        <h1 className="register__title">Register an Account</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          {error && (
            <div className={`register__message ${shakeMessage && "shake"}`}>
              !! {error}
            </div>
          )}
          <Input
            name="username"
            type="text"
            label="Username"
            className={`field__input${
              error
                ? error.toLowerCase().includes("username")
                  ? "--error"
                  : ""
                : ""
            }`}
          />
          <Input
            name="email"
            type="text"
            label="Email"
            className={`field__input${
              error
                ? error.toLowerCase().includes("email")
                  ? "--error"
                  : ""
                : ""
            }`}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            className={`field__input${
              error
                ? error.toLowerCase().includes("password")
                  ? "--error"
                  : ""
                : ""
            }`}
          />
          <div className="register__note">
            Note: any field with * is required.
          </div>

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
