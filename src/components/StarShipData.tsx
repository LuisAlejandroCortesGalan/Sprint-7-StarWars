import { useStarships } from "../hooks/useStarShips";
import { useStarshipImg } from "../hooks/useStarShipImg";

export const StarShipData = ({
  name,
  selectedShip,
}: {
  name: string;
  selectedShip: number;
}) => {
  const { starShips, isLoading } = useStarships();
  const { starShipsImg } = useStarshipImg(selectedShip);

  // Buscar la nave por el nombre
  const ship = starShips.find((ship) => ship.name === name);

  console.log("ver img  ", starShipsImg);
  console.log("ver los datos: ", starShips);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!ship) {
    return <p>No se encontró la nave con el nombre: {name}</p>;
  }

  return (
    <div className="starShipsContainer mt-3">
      <div className="imageDiv">
        <img className="starShipsImage" src={starShipsImg} alt={ship.name} />
        <div className="informationDiv">
          <h6>{ship.name}</h6>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            labore unde inventore sint recusandae quos accusamus, quis velit,
            cum tenetur dignissimos alias similique explicabo! In unde deleniti
            quia fuga nam?
          </p>
          <div className="d-flex justify-content-between gap-3">
            <div>
              <p>Model: {ship.model}</p>
              <p>Credit Cost: {ship.cost_in_credits}</p>
              <p>Atmospheric speed: {ship.max_atmosphering_speed}</p>
            </div>
            <div>
              <p>Manufacturer: {ship.manufacturer}</p>
              <p>Length: {ship.length}</p>
              <p>Crew: {ship.crew}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agrega más detalles de la nave aquí */}
    </div>
  );
};
