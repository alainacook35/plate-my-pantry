import { createContext, useContext } from "react";

interface LoadingContextType {
  setLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);
