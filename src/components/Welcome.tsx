import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="video-background">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-background__video"
      >
        <source src="src/assets/video/background-video.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <h1>Bienvenido a Star Wars</h1>
        <Link to="/starships">Explora las Naves</Link>
      </div>
    </div>
  );
}

export default Welcome;
