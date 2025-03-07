import { useEffect, useState } from "react";
import aNewHope from "../assets/img/films/aNewHope.jpg"

interface Ship {
  name: string;
  model?: string;
  cost_in_credits?: string;
  max_atmosphering_speed?: string;
  manufacturer?: string;
  length?: string;
  crew?: string;
  url?: string;
  pilots?: string[];
  films?: string[];
}

interface Film {
    title: string;
}

const StarShipFilms = ({ ship }: { ship: Ship }) => {
  const [filmData, setfilmData] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchfilms = async () => {
      if (!ship.films || ship.films.length === 0) {
        setfilmData([]);
        return;
      }

      setIsLoading(true);
      try {
        const filmPromises = ship.films.map((filmUrl) =>
          fetch(filmUrl).then((res) => res.json())
        );
        const films = await Promise.all(filmPromises);
        setfilmData(films);
      } catch (error) {
        console.error("Error fetching films:", error);
        setfilmData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchfilms();
  }, [ship.films]); 

  return (
    <>
      {isLoading ? (
        <p>Cargando peliculas...</p>
      ) : filmData.length > 0 ? (
        <div className="pilotCardContainer">
          {filmData.map((film, index) => (
            <div className="pilotCard">
                <div>
                <img src={aNewHope} alt={film.title} />
                </div>
            <div>
            <p key={index}>{film.title.toLocaleUpperCase()}</p> 
            </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay pilotos registrados.</p>
      )}
    </>
  );
};

export default StarShipFilms;