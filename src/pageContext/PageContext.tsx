import { createContext } from "react";

interface Ship {
  name: string;
  model?: string;
  cost_in_credits?: string;
  max_atmosphering_speed?: string;
  manufacturer?: string;
  length?: string;
  crew?: string;
  url?: string;
}

interface PageContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  starShips: Ship[];
  setStarShips: React.Dispatch<React.SetStateAction<Ship[]>>;
}

export const PageContext = createContext<PageContextType | undefined>(undefined);