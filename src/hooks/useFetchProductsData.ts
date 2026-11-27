import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IResponsePayload } from "@/@types/responsePayload.interface";
import { useLoading } from "@/hooks/useLoading";

export const useFetchProductsData = (productType?: string) => {
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          productType ? `/api/products/${productType}` : "/api/products"
        );
        const data: IResponsePayload<IProduct[]> = await response.json();
        setProductsData(data.data);
      } catch (err) {
        const error = err as Error;
        toast.error(`Erro ao buscar dados: ${error.message}`);
        console.log(`Erro ao buscar dados: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productType]);

  return productsData;
};
