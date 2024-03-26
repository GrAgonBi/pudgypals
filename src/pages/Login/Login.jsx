import "./Login.scss";
import LandingLogo from "../../components/LandingLogo/LandingLogo";
import Input from "../../components/Input/Input";

function Login() {
  return (
    <main>
      <LandingLogo />
      <section className="login">
        <h1 className="login__title">Login to Your Account</h1>
        <form className="login__form">
          <Input name="email" type="text" label="Email" />
          <Input name="password" type="password" label="Password" />
          <button className="login__button">Login</button>
        </form>
      </section>
    </main>
  );
}

export default Login;
