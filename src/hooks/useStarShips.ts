import { useEffect, useState } from "react";


interface Ship {
    name: string;
    model?: string;
    cost_in_credits?: string;
    max_atmosphering_speed?: string;
    manufacturer?: string;
    length?: string;
    crew?: string;
  }

export function useStarships() {
  const [starShips, setStarShips] = useState<Ship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://swapi.dev/api/starships/");
        const data = await response.json();
        setStarShips(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return { starShips, isLoading };
}
