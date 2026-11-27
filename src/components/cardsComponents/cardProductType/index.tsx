"use client";

import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import { LuImage, LuCheck } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { ButtonDecoration } from "../../ui/buttons/buttonDecoration";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useFetchProductsData } from "@/hooks/useFetchProductsData";
import { useLoading } from "@/hooks/useLoading";

type CardProductTypeProps = {
  titulo: string;
  bullets: string[];
  buttonScheme: string;
  href: string;
  buttonTxt: string;
  productType: string;
};

const ImageTemplate = () => {
  return (
    <div className={styles.imagemTemplate}>
      <LuImage opacity={0.4} width={80} height={80} />
      <span>Não foi possível carregar os produtos</span>
    </div>
  );
};

/**
 * Componente de card para cada tipo de produto
 *
 * @param {CardProductTypeProps} props
 * @see {CardProductTypeProps}
 */
export const CardProductType = (props: CardProductTypeProps) => {
  const { titulo, href, buttonTxt, buttonScheme, bullets, productType } = props;
  const { isLoading } = useLoading();
  const [produtos, setProdutos] = useState<IProduct[]>([]);
  const productsData = useFetchProductsData(productType);

  return (
    <div className={styles.cardProductContainer}>
      <DisplayProductImage productsData={productsData} titulo={titulo} />
      <div className={styles.content}>
        <h4>{titulo}</h4>
        <ul>
          {bullets.map((bullet, index) => (
            <li key={index}>
              <LuCheck color="#515151" />
              <p>{bullet}</p>
            </li>
          ))}
        </ul>
        <ButtonDecoration
          type="link"
          href={href}
          border={buttonScheme}
          color="white"
          theme={buttonScheme}
          borderRadius="6px"
        >
          {buttonTxt} <MdKeyboardArrowRight />
        </ButtonDecoration>
      </div>
    </div>
  );
};

function DisplayProductImage({
  productsData,
  titulo,
}: {
  productsData: IProduct[];
  titulo: string;
}) {
  const { isLoading } = useLoading();
  const hasNoProducts = productsData.length < 1;

  if (!isLoading && hasNoProducts) {
    return <ImageTemplate />;
  }

  return (
    <Swiper
      className={styles.swiper}
      spaceBetween={50}
      slidesPerView={1}
      modules={[Autoplay]}
      loop={true}
      autoplay={{ delay: 4000 }}
    >
      {productsData.map((produto, index) => (
        <SwiperSlide key={index} className={styles.swiperSlide}>
          <Image
            src={
              produto.image.length > 10
                ? produto.image
                : "https://placehold.co/600x400"
            }
            alt={titulo}
            className={styles.imagem}
            width={400}
            height={400}
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
