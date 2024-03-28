import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../helper";
import axios from "axios";
import LandingLogo from "../../components/LandingLogo/LandingLogo";
import Input from "../../components/Input/Input";

function Login() {
  const [error, setError] = useState(null);
  const [shakeMessage, setShakeMessage] = useState(false);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShakeMessage(false);
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });
      sessionStorage.setItem("token", response.data.token);
      navigate("/user/progress");
    } catch (error) {
      // console.log(error);
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
          {error && (
            <div className={`login__message ${shakeMessage && "shake"}`}>
              !! {error}
            </div>
          )}
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
          <div className="login__note">Note: any field with * is required.</div>
          <button className="login__button">Login</button>
        </form>
        <h2 className="login__text">
          Do not have an account yet?
          <Link to="/" className="login__link">
            Register Here
          </Link>
        </h2>
      </section>
    </main>
  );
}

export default Login;
