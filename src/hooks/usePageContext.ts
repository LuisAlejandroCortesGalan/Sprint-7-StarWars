import { useContext } from "react";
import { PageContext } from "../pageContext/PageContext";

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext debe usarse dentro de un PageProvider");
  }
  return context;
};