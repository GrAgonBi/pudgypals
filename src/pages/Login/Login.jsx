import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../../helper";
import axios from "axios";
import LandingLogo from "../../components/LandingLogo/LandingLogo";
import Input from "../../components/Input/Input";

function Login() {
  const [error, setError] = useState(null);
  const [shakeMessage, setShakeMessage] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShakeMessage(false);
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      sessionStorage.setItem("token", response.data.token);
      navigate("/progress");
    } catch (error) {
      setError(error.response.data);
      setShakeMessage(true);
    }
  };
  return (
    <main>
      <LandingLogo />
      <section className="login">
        <h1 className="login__title">Login to Your Account</h1>
        <form className="login__form" onSubmit={handleSubmit}>
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

          {error && (
            <div className={`register__message ${shakeMessage && "shake"}`}>
              !! {error}
            </div>
          )}
          <button className="register__button">Login</button>
        </form>
        <h2 className="register__text">
          Do not have an account yet?
          <Link to="/register" className="register__link">
            Register Here
          </Link>
        </h2>
      </section>
    </main>
  );
}

export default Login;
