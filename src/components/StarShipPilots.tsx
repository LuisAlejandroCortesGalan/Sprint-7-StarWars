import { useEffect, useState } from "react";
import chewbacca from "../assets/img/pilots/chewbacca.jfif"

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

interface Pilot {
  name: string;
}

const StarShipPilots = ({ ship }: { ship: Ship }) => {
  const [pilotsData, setPilotsData] = useState<Pilot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPilots = async () => {
      if (!ship.pilots || ship.pilots.length === 0) {
        setPilotsData([]);
        return;
      }

      setIsLoading(true);
      try {
        const pilotPromises = ship.pilots.map((pilotUrl) =>
          fetch(pilotUrl).then((res) => res.json())
        );
        const pilots = await Promise.all(pilotPromises);
        setPilotsData(pilots);
      } catch (error) {
        console.error("Error fetching pilots:", error);
        setPilotsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPilots();
  }, [ship.pilots]); 

  return (
    <>
      {isLoading ? (
        <p>Cargando pilotos...</p>
      ) : pilotsData.length > 0 ? (
        <div className="d-flex flex-wrap gap-4">
          {pilotsData.map((pilot, index) => (
            <div className="pilotCard">
                <div>
                <img src={chewbacca} alt={pilot.name} />
                </div>
            <div>
            <p key={index}>{pilot.name.toLocaleUpperCase()}</p> 
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

export default StarShipPilots;