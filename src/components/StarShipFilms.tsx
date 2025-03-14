import { useEffect, useState } from "react";
import aNewHope from "../assets/img/films/aNewHope.jpg";

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
  const [filmData, setFilmData] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFilms = async () => {
      if (!ship.films || ship.films.length === 0) {
        setFilmData([]);
        return;
      }

      setIsLoading(true);
      try {
        const filmPromises = ship.films.map((filmUrl) =>
          fetch(filmUrl).then((res) => res.json())
        );
        const films = await Promise.all(filmPromises);
        setFilmData(films);
      } catch (error) {
        console.error("Error fetching films:", error);
        setFilmData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, [ship.films]);

  return (
    <>
      {isLoading ? (
        <p>Cargando películas...</p>
      ) : filmData.length > 0 ? (
        <div className="d-flex flex-wrap gap-4">
          {filmData.map((film, index) => (
            <div key={film.title || index} className="pilotCard">
              <div>
                <img src={aNewHope} alt={film.title} />
              </div>
              <div>
                <p>{film.title.toLocaleUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay películas registradas.</p>
      )}
    </>
  );
};

export default StarShipFilms;