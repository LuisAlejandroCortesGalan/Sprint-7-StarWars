import { useStarships } from "../hooks/useStarShips";
import LoadingScreen from "./LoadingScreen";
import StarShipFilms from "./StarShipFilms";
import StarShipPilots from "./StarShipPilots";


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

  const parts = url?.split("/");

  const numberImg = parts && parts.length > 1 ? parts[parts.length - 2] : undefined;
  const shipImg = `../public/data/starships/${numberImg}.jpg`;

  if (!ship) {
    return <p>No se encontró la nave con el modelo: {model}</p>;
  }



  return (
    <>
    {
      isLoading ? (<LoadingScreen/>) :(
        <>
      <div className="starShipsContainer mt-3">
      <h6 className="detailsTittle">STARSHIP</h6>
      <div className="w-60 d-flex">
        <img src={shipImg} alt={ship.name} />
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
    <div className="pilotsDiv">
      <h6 className="detailsTittle">PILOTS</h6>
      <StarShipPilots ship={ship}/>
      </div>
      <div className="filmsDiv"> 
      <h6 className="detailsTittle">FILMS</h6>
      <StarShipFilms ship={ship}/>
      </div>
      </>
    )}

    </>
  );
};
// function setShowLoading(arg0: boolean): void {
//   throw new Error("Function not implemented.");
// }

