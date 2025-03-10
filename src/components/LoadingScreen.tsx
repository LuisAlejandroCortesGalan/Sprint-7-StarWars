import { useEffect, useState } from "react";
import loadingGif from "../assets/video/loading.gif";
import { useStarships } from "../hooks/useStarShips";

const LoadingScreen = () => {
  const [showLoading, setShowLoading] = useState(true);
  const { starShips, isLoading } = useStarships();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      setShowLoading(true); // Muestra el gif cuando empieza la carga
      // Si la carga es muy rápida, la imagen se mantendrá visible al menos 1 segundo
      timeout = setTimeout(() => setShowLoading(true), 10000); // Tiempo mínimo de 1 segundo
    } else {
      // Si la carga termina, espera 1 segundo antes de ocultar el gif
      timeout = setTimeout(() => setShowLoading(false), 10000);
    }

    return () => clearTimeout(timeout); // Limpiar el timeout cuando se desmonte
  }, [isLoading]); // Este efecto solo depende de `isLoading`

  return (
    <div>
      {showLoading && (
        <div className="loadingScreen">
          <img src={loadingGif} alt="Cargando..." className="w-32 h-32" />
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
