"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import toast from "react-hot-toast";
import { Button } from "../../ui/buttons/button";
import { IProductRequest } from "../types";
import { useFetchProductsData } from "@/hooks/useFetchProductsData";
import { useCheckPathnameProduct } from "@/hooks/useCheckPathnameProduct";
import { IResponseAPI } from "@/services/types";

const PRODUCT_INIT_SET = {
  nome: "",
  email: "",
  contato: "",
  empresa: "",
  quantidade: 0,
  modelo: "",
};

async function sendProductRequest(
  productRequestInfos: IProductRequest
): Promise<IResponseAPI> {
  const res = await fetch("/api/emailPedido", {
    method: "POST",
    body: JSON.stringify(productRequestInfos),
  });

  const data: IResponseAPI = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

export const FormProduto = () => {
  const [productRequestInfos, setProductRequestInfos] =
    useState<IProductRequest>(PRODUCT_INIT_SET);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);
  const productType = useCheckPathnameProduct();
  const productsData = useFetchProductsData(productType);

  useEffect(() => productsData && setProducts(productsData), [productsData]);

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const productRequest = await sendProductRequest(productRequestInfos);
      toast.success(productRequest.message);
    } catch (err) {
      const error = err as Error;
      toast.error(`Ocorreu uma erro ao enviar o solicitação: ${error.message}`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>Formulário para contato</h3>
      <form className={styles.formulario} onSubmit={handleEmail}>
        <label className={`${styles.inputContainer} ${styles.inputNome}`}>
          <span>Nome Completo</span>
          <input
            type="text"
            placeholder="Seu nome"
            value={productRequestInfos.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProductRequestInfos((prevProductRequestInfos) => ({
                ...prevProductRequestInfos,
                nome: e.target.value,
              }))
            }
            required
          />
        </label>
        <label className={`${styles.inputContainer} ${styles.inputEmail}`}>
          <span>Email</span>
          <input
            type="email"
            placeholder="Seu email"
            value={productRequestInfos.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProductRequestInfos((prevProductRequestInfos) => ({
                ...prevProductRequestInfos,
                email: e.target.value,
              }))
            }
            required
          />
        </label>
        <label className={`${styles.inputContainer} ${styles.inputNumero}`}>
          <span>Número de celular</span>
          <input
            type="text"
            placeholder="Seu celular"
            value={productRequestInfos.contato}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProductRequestInfos((prevProductRequestInfos) => ({
                ...prevProductRequestInfos,
                contato: e.target.value,
              }))
            }
            required
          />
        </label>
        <label className={`${styles.inputContainer} ${styles.inputModelo}`}>
          <span>Modelo do produto</span>
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setProductRequestInfos((prevProductRequestInfos) => ({
                ...prevProductRequestInfos,
                modelo: e.target.value,
              }))
            }
            value={productRequestInfos.modelo}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Escolha o modelo
            </option>
            {products.map((product) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label className={`${styles.inputContainer} ${styles.inputQuantidade}`}>
          <span>Quantidade</span>
          <input
            type="number"
            placeholder="Quantidade"
            value={productRequestInfos.quantidade}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProductRequestInfos((prevProductRequestInfos) => ({
                ...prevProductRequestInfos,
                quantidade: Number(e.target.value),
              }))
            }
            required
          />
        </label>
        <label className={`${styles.inputContainer} ${styles.inputEmpresa}`}>
          <span>Empresa</span>
          <input
            type="text"
            placeholder="Sua empresa"
            value={productRequestInfos.empresa}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProductRequestInfos((prevProductRequestInfos) => ({
                ...prevProductRequestInfos,
                empresa: e.target.value,
              }))
            }
          />
        </label>
        <Button type="submit" desativado={isSending}>
          Solicitar produto
        </Button>
      </form>
    </div>
  );
};
