import { useContext } from "react";
import { LoadingContext } from "@/contexts/loading.context";

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) throw new Error("useLoading deve ser usado com um Provider");

  return context;
};
