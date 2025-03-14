import { useEffect, useState } from "react";
import loadingGif from "../assets/video/loading.gif";
import { useStarships } from "../hooks/useStarShips";

const LoadingScreen = ({ asSpinner = false }) => {
  const [showLoading, setShowLoading] = useState(!asSpinner);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const { isLoading } = useStarships();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (asSpinner) {
      if (isLoading) {
        setShowLoading(true);
        setMinTimeElapsed(false);
        timeout = setTimeout(() => setMinTimeElapsed(true), 1000);
      } else if (!isLoading && showLoading) {
        if (minTimeElapsed) {
          setShowLoading(false);
        } else {
          timeout = setTimeout(() => setShowLoading(false), 1000);
        }
      }
    } else {
      setShowLoading(true);
    }

    return () => clearTimeout(timeout);
  }, [asSpinner, isLoading, minTimeElapsed, showLoading]);

  return (
    <div className="m-3 rounded-3 gif">
      {showLoading && (
        <div className="d-flex justify-content-center align-items-center">
          <img 
            src={loadingGif} 
            alt="Cargando..." 
            className="w-32 h-32 gif"
            style={{ animation: 'infinite' }} 
          />
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;