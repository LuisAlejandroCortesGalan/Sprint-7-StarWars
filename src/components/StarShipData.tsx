import { useStarships } from "../hooks/useStarShips";

export const StarShipData = ({
  model,
  selectedShip,
}: {
  model: string | undefined;
  selectedShip: number;
}) => {
  const { starShips, isLoading } = useStarships();

  const ship = starShips[selectedShip] || null; 
  if (!ship) {
    return <p>No se encontró la nave seleccionada.</p>;
  }

  const url: string | undefined = ship.url;

  const parts = url?.split('/');
    
  const numberImg = parts && parts.length > 1 ? parts[parts.length - 2] : undefined;
  const shipImg = `../public/data/starships/${numberImg}.jpg`;  
 

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!ship) {
    return <p>No se encontró la nave con el modelo: {model}</p>;
  }

  console.log(starShips);
  

  return (
    <div className="starShipsContainer mt-3">
      <div className="imageDiv">
        <img className="starShipsImage" src={shipImg} alt={ship.name} />
        <div className="informationDiv">
          <h6>{ship.name}</h6>
          <p className="pb-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};
