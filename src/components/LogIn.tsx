import starWarsLogo from "../assets/img/star-wars-logo.jpg";
import disney from "../assets/img/disney.png";
import sponsors from "../assets/img/sponsors.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

const LogIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    setError(null);
    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email");
      }
      console.log("Datos de inicio de sesión:", { email, password });

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log("Usuario autenticado exitosamente:", userCredential.user);

      navigate("/starShips");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <section className="login">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <Link to="/">
          <img
            src={starWarsLogo}
            alt="Logo de Star Wars"
            id="star-wars-logo"
            className="starWarsLoginLogo"
          />
        </Link>
        <Link to="/starShips">
          <i className="fas fa-times CloseBtn"></i>
        </Link>

        <div className="flex-column card">
          <img src={disney} alt="MyDisney logo" id="disneyLogo" />
          <h3>Enter your email to continue</h3>
          <div>
            <p>
              Log in to Star Wars with your MyDisney account. If you don't have
              one, you will be prompted to create one.
            </p>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-danger">{error}</p>}
          </div>
          <button onClick={handleSignIn}>Continue</button>
          <hr />
          <div>
            <p className="fw-semibold">
              Star Wars is part of The Walt Disney Family of Companies.
            </p>
            <p className="fs-little">
              MyDisney lets you seamlessly log in to services and experiences
              across The Walt Disney Family of Companies, such as Disney+, ESPN,
              Walt Disney World,{" "}
              <a href="https://my.disney.com/" target="_blank" rel="noopener noreferrer">
                and more.
              </a>
            </p>
          </div>
          <img src={sponsors} alt="Sponsors" />
        </div>
      </div>
    </section>
  );
};

export default LogIn;