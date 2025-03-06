import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import starWarsLogo from "../assets/img/star-wars-logo.jpg";
import disney from "../assets/img/disney.png";
import sponsors from "../assets/img/sponsors.png";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [receiveOffers, setReceiveOffers] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleTerms, setIsVisibleTerms] = useState(false);
  const navigate = useNavigate(); 

  const toggleVisibility = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsVisible((prev: boolean) => !prev);
  };

  const toggleVisibilityTerms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsVisibleTerms((prev: boolean) => !prev);
  };

  const handleSignUp = async () => {
    setError(null);
    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario creado exitosamente:", userCredential.user);
      console.log();
      
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
    <section className="register">
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
          <img src={disney} alt="myDisney logo" id="disneyLogo" />
          <h3>Create an account to continue</h3>
          <div>
            <p>
              With a MyDisney account, you can log in to Star Wars and other
              services across The Walt Disney Family of Companies. Create your
              account using {email || "your email"}{" "}
              <Link to="/login">edit</Link>
            </p>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password" 
              className="form-control mb-3"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <div className="checkBoxDiv">
            <input
              type="checkbox"
              checked={receiveOffers}
              onChange={(e) => setReceiveOffers(e.target.checked)}
            />
            <p>
              Yes! I would like to receive by email special offers and updates
              about Lucasfilm Ltd. and other products and services from{" "}
              <a
                href="https://privacy.thewaltdisneycompany.com/en/definitions/#The-Walt-Disney-Family-of-Companies"
                target="_blank"
              >
                The Walt Disney Family of Companies.
              </a>
            </p>
          </div>
          <p className="termsP">
            By creating an account, you agree to our{" "}
            <a href="https://disneytermsofuse.com/english/" target="_blank">
              Terms of Use
            </a>
            , and acknowledge that you have read our{" "}
            <a
              href="https://privacy.thewaltdisneycompany.com/en/current-privacy-policy/"
              target="_blank"
            >
              Privacy Policy
            </a>
            ,
            <a
              href="https://privacy.thewaltdisneycompany.com/en/current-privacy-policy/cookies-policy/"
              target="_blank"
            >
              Cookies Policy
            </a>{" "}
            and{" "}
            <a
              href="https://privacy.thewaltdisneycompany.com/en/current-privacy-policy/privacy-notice/"
              target="_blank"
            >
              UK & EU Privacy Rights
            </a>{" "}
            <a href="#" onClick={toggleVisibilityTerms}>
              {isVisibleTerms ? "less..." : "More..."}
            </a>
            .
          </p>
          {isVisibleTerms && (
            <div className="visibleTerms">
              <ul>How we use your personal data and your rights:</ul>
              <li>
                When you visit, shop or register with Disney online or use any
                Disney online product, service or mobile application, your
                personal data is controlled by The Walt Disney Company Limited
                of 3 Queen Caroline Street, London, W6 9PE, United Kingdom.
              </li>
              <li>
                If you are a Disney+ service EU subscriber residing outside the
                United Kingdom, your personal data is also jointly controlled by
                The Walt Disney Company (Benelux) B.V., the provider of the
                Disney+ service.
              </li>
              <li>
                Your personal data is primarily used to provide you with the
                Disney products and services you request. It may also be used to
                comply with legal obligations we are subject to or to fulfill
                our legitimate interests, such as to personalize your
                experience, develop and improve our services or to detect
                illegal activities. With your prior consent, it may also be used
                to send you offers and promotions.
              </li>
              <li>
                You have a number of rights including the right to request
                access to, change, or remove your personal data, or to change
                your marketing preferences (including withdrawing your consent
                at any time) – please see our Privacy Policy to learn more about
                managing your marketing preferences or deleting your account.
              </li>
              <li>
                Our Data Protection Officer can be contacted by emailing:
                dataprotection@disney.co.uk.
              </li>
              <li>
                If you are in the EU, you may reach us through our local
                Representatives. For more information about our Representatives
                please check here.
              </li>
              <li>
                You have a right to lodge a complaint with your local Data
                Protection Supervisory Authority or with the UK Information
                Commissioner’s Office: https://ico.org.uk/.
              </li>
              <li>
                For more information about Disney’s data collection and use
                practices please read our Privacy Policy.
              </li>
            </div>
          )}
          <p>
            My home country/region: Spain.{" "}
            <Link to="/LogIn" target="_blank">
              edit
            </Link>
          </p>
          <button onClick={handleSignUp}>Continue</button>

          <a href="#" onClick={toggleVisibility}>
            Learn more about MyDisney{" "}
            <i className="fas fa-chevron-down arrow-down"></i>
          </a>
          {isVisible && (
            <div className="MoreInformationDiv">
              <p className="fw-semibold">
                Star Wars is part of The Walt Disney Family of Companies.
              </p>
              <p className="fs-little">
                MyDisney lets you seamlessly log in to services and experiences
                across The Walt Disney Family of Companies, such as Disney+,
                ESPN, Walt Disney World,
                <a href="https://my.disney.com/" target="_blank">
                  and more.
                </a>
              </p>
              <img src={sponsors} alt="sponsors" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Register;
