import { useState } from "react";
import { PageContext } from "./PageContext";

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

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState(1);
  const [starShips, setStarShips] = useState<Ship[]>([]);

  return (
    <PageContext.Provider value={{ page, setPage, starShips, setStarShips }}>
      {children}
    </PageContext.Provider>
  );
};