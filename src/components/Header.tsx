import "../App.css";
import starWarsLogo from "../assets/img/star-wars-logo.jpg";
import facebookLogo from "../assets/img/facebook.png";
import instagramLogo from "../assets/img/instagram.png";
import twitterLogo from "../assets/img/twitter.png";
// import youtubeLogo from "../assets/img/youtube.png";
// import tiktokLogo from "../assets/img/tiktok.png";

function Header() {
  return (
    <>
      <header>
        <div className="redes">
        <ul className="socialList">
        <li className="facebook">
          <a href="https://www.facebook.com/starwars.es" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="Facebook" />
          </a>
        </li>
        <li className="instagram">
          <a href="https://www.instagram.com/starwars.es" target="_blank" rel="noopener noreferrer">
            <img src={instagramLogo} alt="Instagram" />
          </a>
        </li>
        <li className="twitter">
          <a href="https://x.com/starwars" target="_blank" rel="noopener noreferrer">
            <img src={twitterLogo} alt="Twitter" />
          </a>
        </li>
        {/* <li className="youtube">
          <a href="https://www.youtube.com/user/starwars" target="_blank" rel="noopener noreferrer">
            <img src={youtubeLogo} alt="YouTube" />
          </a>
        </li>
        <li className="tiktok">
          <a href="https://www.tiktok.com/@starwars" target="_blank" rel="noopener noreferrer">
            <img src={tiktokLogo} alt="TikTok" />
          </a>
        </li> */}
      </ul>
        </div>
        <img src={starWarsLogo} alt="Logo de Star Wars" id="star-wars-logo" />

        <div className="d-flex align-items-center">
          <button className="btn btn-dark border-none">LOG IN</button>
          <p className="m-0 p-2">//</p>
          <button className="btn btn-dark border-none ">SIGN UP</button>
        </div>
      </header>
    </>
  );
}

export default Header;
