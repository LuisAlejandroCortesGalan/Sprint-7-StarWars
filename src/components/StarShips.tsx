import { useState } from "react";
import { useStarships } from "../hooks/useStarShips"; 
import { StarShipData } from "./StarShipData";

function StarShips() {
  const { starShips, isLoading } = useStarships(); 
  const [selectedShip, setSelectedShip] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (selectedShip === index) {
      setSelectedShip(null); // Si ya está seleccionada, deselecciona
    } else {
      setSelectedShip(index); // Si no, selecciona esta nave
    }
  };

  return (
    <>
      <div className="tab-content d-flex justify-content-center align-items-center gap-5" id="pills-tabContent">
        {/* Starships */}
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
                  <div key={index}>
                    <div
                      className="starShipsCards d-flex flex-column" 
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(index)}
                    >
                      <h5>{ship.name}</h5>
                      <p>{ship.model ? ship.model : "Model not available"}</p>
                    </div>

                    {/* Información adicional desplegada */}
                    {selectedShip === index && (
                      <div className="starship-details">
                        <StarShipData name={ship.name} selectedShip={selectedShip} />
                        </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No starships available.</p>
              )}
            </div>
          )}
        </div>

        {/* Home */}
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
