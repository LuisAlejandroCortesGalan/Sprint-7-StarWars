import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="video-background d-flex justify-content-center align-items-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-background__video"
      >
        <source src="src/assets/video/background-video.mp4" type="video/mp4" />
      </video>
      <div className="content text-white z-3 text-center">
        <h2>Bienvenido a Star Wars</h2>
        <Link to="/starships">Explora las Naves</Link>
      </div>
    </div>
  );
}

export default Welcome;
