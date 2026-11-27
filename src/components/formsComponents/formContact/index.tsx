"use client";

import React, { ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.scss";
import { Button } from "../../ui/buttons/button";
import { LuSend } from "react-icons/lu";
import { useState } from "react";
import toast from "react-hot-toast";
import { IGeneralContactInfos } from "@/components/formsComponents/types";
import { IResponseAPI } from "@/services/types";

const INIT_SET: IGeneralContactInfos = {
  contato: "",
  nome: "",
  assunto: "",
  email: "",
  mensagem: "",
  empresa: "",
};

/**
 * Envia a mensagem para contato.
 *
 * @param {IGeneralContactInfos} contactInfos - Informações para contato.
 */
export async function sendEmailContact(
  contactInfos: IGeneralContactInfos
): Promise<IResponseAPI> {
  const res = await fetch("/api/email", {
    method: "POST",
    body: JSON.stringify(contactInfos),
  });

  const data: IResponseAPI = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

/** Componente que exibe o formulário de contato */
export const FormContact = () => {
  const [contactInfos, setContactInfos] =
    useState<IGeneralContactInfos>(INIT_SET);
  const [sending, setSending] = useState<boolean>(false);

  const handleEmailContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      const emailContact = await sendEmailContact(contactInfos);
      toast.success(emailContact.message);
    } catch (err) {
      toast.error((err as Error).message);
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>Envie sua Mensagem</h3>
      <form onSubmit={handleEmailContactSubmit}>
        <label htmlFor="nome" className={styles.nome}>
          <span>Nome completo</span>
          <input
            type="text"
            name="nome-completo"
            placeholder="Seu nome completo"
            value={contactInfos.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContactInfos((prevContactInfos) => ({
                ...prevContactInfos,
                nome: e.target.value,
              }))
            }
            required
          />
        </label>
        <label htmlFor="email" className={styles.email}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={contactInfos.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContactInfos((prevContactInfos) => ({
                ...prevContactInfos,
                email: e.target.value,
              }))
            }
            required
          />
        </label>
        <label htmlFor="telefone" className={styles.telefone}>
          <span>Telefone</span>
          <input
            type="text"
            name="telefone"
            placeholder="(81) 99999-9999"
            value={contactInfos.contato}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContactInfos((prevContactInfos) => ({
                ...prevContactInfos,
                contato: e.target.value,
              }))
            }
            required
          />
        </label>
        <label htmlFor="empresa" className={styles.empresa}>
          <span>Empresa</span>
          <input
            type="text"
            name="empresa"
            placeholder="Nome da sua empresa"
            value={contactInfos.empresa}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContactInfos((prevContactInfos) => ({
                ...prevContactInfos,
                empresa: e.target.value,
              }))
            }
          />
        </label>
        <label htmlFor="assunto" className={styles.assunto}>
          <span>Assunto</span>
          <input
            type="text"
            name="assunto"
            placeholder="Sobre o que você gostaria de falar"
            value={contactInfos.assunto}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContactInfos((prevContactInfos) => ({
                ...prevContactInfos,
                assunto: e.target.value,
              }))
            }
            required
          />
        </label>
        <label htmlFor="mensagem" className={styles.mensagem}>
          <span>Mensagem</span>
          <textarea
            name="mensage"
            placeholder="Digite sua mensagem aqui"
            value={contactInfos.mensagem}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContactInfos((prevContactInfos) => ({
                ...prevContactInfos,
                mensagem: e.target.value,
              }))
            }
            required
          ></textarea>
        </label>
        <Button type="submit" className={styles.button} desativado={sending}>
          Enviar Mensagem <LuSend color="white" width={16} />
        </Button>
      </form>
    </div>
  );
};
