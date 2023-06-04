import { IPoll } from "@/app/page";
import { createContext, useState, useContext, ReactNode } from "react";

interface Data {
  data: IPoll[] | null | undefined;
  setData: (value: IPoll[]) => void;
}

const DataContext = createContext<Data>({ data: null, setData: () => null });

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<IPoll[]>([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): Data {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData deve ser usado dentro de um DataProvider");
  }
  return context;
}
