import { useEffect, useState } from "react";

interface Ship {
  name: string;
  model?: string;
}

function StarShips() {
  const [starShips, setStarShips] = useState<Ship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetching() {
    try {
      const response = await fetch("https://swapi.dev/api/starships/");
      const data = await response.json();
      setStarShips(data.results);
      console.log(data.results); // Verifica si los datos se están obteniendo correctamente
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetching();
  }, []);

  return (
    <>
      <div className="tab-content d-flex justify-content-center align-items-center gap-5" id="pills-tabContent">
        {/* Pestaña Starships */}
        <div
          className="tab-pane fade show active"
          id="pills-starships"
          role="tabpanel"
          aria-labelledby="pills-starships-tab"
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="cardContainer">
              {starShips.length > 0 ? (
                starShips.map((ship, index) => (
                  <div key={index} className="starShipsCards d-flex flex-column">
                    <h5>{ship.name}</h5>
                    <p>{ship.model ? ship.model : "Model not available"}</p>
                  </div>
                ))
              ) : (
                <p>No starships available.</p>
              )}
            </div>
          )}
        </div>

        {/* Pestaña Home */}
        <div
          className="tab-pane fade"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <p>Zona "Home"</p>
        </div>
      </div>
    </>
  );
}

export default StarShips;
