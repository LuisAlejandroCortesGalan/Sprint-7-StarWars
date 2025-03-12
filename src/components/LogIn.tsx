import starWarsLogo from "../assets/img/star-wars-logo.jpg";
import disney from "../assets/img/disney.png";
import sponsors from "../assets/img/sponsors.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
      if (!email.trim() || !password) {
        throw new Error("Please enter both email and password");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email");
      }

      const cleanedEmail = email.trim();

      console.log("Datos de inicio de sesión:", { email: cleanedEmail, password });

      const userCredential = await signInWithEmailAndPassword(auth, cleanedEmail, password);

      console.log("Usuario autenticado exitosamente:", userCredential.user);

      navigate("/starShips");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("wrong-password")) {
          setError("Incorrect password. Please try again.");
        } else if (error.message.includes("user-not-found")) {
          setError("No user found with that email. Please register.");
          navigate("/register");
        } else {
          setError(error.message);
          navigate("/register");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);
      navigate("/starShips");
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
      console.error("Error during Google sign-in:", error);
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
          <h3 className="fw-bold">Enter your email to continue</h3>
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
          {/* Botón de inicio de sesión con Google */}
          <button className="google-btn" onClick={handleGoogleSignIn}>
            Sign in with 
            {" "}<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google.png/1024px-Google.png" alt="Google" className="google-icon" />
          </button>
          <div>
          <hr />

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
