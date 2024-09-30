import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw Error("useDataContext should be used within useDataContextProvider");
  return context;
};

export default useDataContext;
