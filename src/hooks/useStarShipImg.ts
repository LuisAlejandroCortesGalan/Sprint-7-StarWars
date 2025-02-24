
import { useEffect, useState } from "react";


export function useStarshipImg(selectedShip: number | null) {
    const [starShipsImg, setStarShipsImg] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
    if (selectedShip === null) return; 
    
    async function fetchData() {
        try {
        const response = await fetch("https://starwars-databank-server.vercel.app/api/v1/vehicles");
        const data = await response.json();
        const dataImg = data.data[selectedShip!].image; 
        setStarShipsImg(dataImg); 
        } catch (err) {
        console.error(err);
        } finally {
        setIsLoading(false);
        }
    }
    fetchData();
    }, [selectedShip]);

    return { starShipsImg, isLoading };
}

