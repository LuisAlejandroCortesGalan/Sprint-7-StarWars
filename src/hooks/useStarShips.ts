import { useEffect, useState } from "react";
import { usePageContext } from "./usePageContext";

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

export function useStarships() {
  const { page, starShips, setStarShips } = usePageContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStarships = async () => {
      if (starShips.length >= 36) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_STARSHIPS_API}/?page=${page}`);
        const data = await response.json();
        setStarShips((prevStarships) => {
          const newShips = data.results.filter(
            (ship: Ship) => !prevStarships.some((s) => s.url === ship.url || s.name === ship.name)
          );
          return [...prevStarships, ...newShips];
        });
      } catch (error) {
        console.error("Error fetching starships:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
      fetchStarships();
    
  }, [page, starShips.length, setStarShips]);


  return { starShips, isLoading };
}
