import { useStarships } from "../hooks/useStarShips";
import { StarShipData } from "./StarShipData";
import { useEffect, useState } from "react";
import { usePageContext } from "../hooks/usePageContext";
import LoadingScreen from "./LoadingScreen";

function StarShips() {
  const { starShips, isLoading } = useStarships();
  const [selectedShip, setSelectedShip] = useState<number | null>(null);
  const { setPage } = usePageContext();


  const handleClick = (index: number) => {
    setSelectedShip(selectedShip === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prevPage) => {
          if (prevPage < 4) {
            return prevPage + 1;
          }
          return prevPage;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setPage]);
  

  return (
    <div
      className="tab-content d-flex justify-content-center align-items-center gap-5 bgImg"
      id="pills-tabContent"
    >
      <div
        className="tab-pane fade show active"
        id="pills-starships"
        role="tabpanel"
        aria-labelledby="pills-starships-tab"
      >
        {isLoading && starShips.length === 0 ? 
        (<LoadingScreen/>) : (
          <div className="d-flex flex-column justify-content-between gap-3 rounded-5">
            {starShips.length > 0 ? (
              starShips.map((ship, index) => (
                <div key={ship.url || index}>
                  <div
                    className={`starShipsCards d-flex flex-column ${
                      selectedShip === index ? "goldenShadow" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick(index)}
                  >
                    <h5>{ship.name}</h5>
                    <p>{ship.model ? ship.model : "Model not available"}</p>
                  </div>

                  {selectedShip === index && (
                    <div className="starship-details">
                      <StarShipData
                        model={ship.model}
                        selectedShip={selectedShip}
                      />
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

      <div
        className="tab-pane fade"
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
      <LoadingScreen/>
      </div>
    </div>
  );
}

export default StarShips;
