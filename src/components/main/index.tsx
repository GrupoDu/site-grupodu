"use client";

import { CardProduto } from "../cardsComponents/cardProduto";
import styles from "./styles.module.scss";
import Loading from "../loading";
import { useCheckPathnameProduct } from "@/hooks/useCheckPathnameProduct";
import { useFetchProductsData } from "@/hooks/useFetchProductsData";
import { useLoading } from "@/hooks/useLoading";

export const Main = ({ id }: { id: string }) => {
  const productType = useCheckPathnameProduct();
  const productsData = useFetchProductsData(productType);
  const { isLoading } = useLoading();
  const isProductsEmpty = productsData.length > 0;
  const productImage = (image: string) =>
    image.length < 10 ? "https://placehold.net/600x600.png" : image;

  if (isLoading) return <Loading />;

  if (!isProductsEmpty) {
    return (
      <main className={styles.main} id={id} style={{ display: "flex" }}>
        <div className={styles.emptyListText}>
          <h3>
            Nenhum produto encontrado da categoria {productType} encontrado.
          </h3>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main} id={id} style={{ display: "grid" }}>
      {productsData.map((product) => (
        <CardProduto
          key={product.uuid}
          nomeProduto={product.name}
          imagemProduto={productImage(product.image)}
          descricaoProduto={product.description}
          altImagem={product.type}
          caracteristicas={product.features}
        />
      ))}
    </main>
  );
};
