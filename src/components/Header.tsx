import { useState } from "react";
import "../App.css";
import starWarsLogo from "../assets/img/star-wars-logo.jpg";

function Header() {
  const [mostrarRedes] = useState(false);
  return (
    <>
      <header>
        <div className="redes">{mostrarRedes && <p>redes</p>}</div>
        <img src={starWarsLogo} alt="Star Wars Logo" id="star-wars-logo"></img>

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
