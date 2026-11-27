"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { IRegisterRepresentative } from "@/@types/representative.interface";
import toast from "react-hot-toast";
import { northeastStates } from "@/constants/northeastStates";
import { numberRgx } from "@/utils/numberRgx";
import { IResponsePayload } from "@/@types/responsePayload.interface";
import { checkContacts } from "@/utils/checkContacts";

const initialFormValues: IRegisterRepresentative = {
  empresa: "",
  nome_fantasia: "",
  cnpj_cpf: "",
  estado: "",
  uf: "",
  cidade: "",
  cep: "",
  numero: 0,
  email: "",
  contato: "",
};

export const CandidateForm = () => {
  const [formData, setFormData] =
    useState<IRegisterRepresentative>(initialFormValues);

  const handleInputChange = (
    field: keyof IRegisterRepresentative,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const defineUf = () => {
    const stateUf = northeastStates.find((s) => s.name === formData.estado);
    if (!stateUf) throw new Error("UF do estado não encontrado");
    formData.uf = stateUf.uf;
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      checkContacts(formData);
      defineUf();

      formData.numero = Number(formData.numero);

      const res = await fetch("/api/register-representative", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(`Houve um erro. Tente novamente mais tarde`);
        return;
      }

      return toast.success(data.message);
    } catch (e) {
      toast.error(
        (e as IResponsePayload<{ message: string; status: number }>).message
      );
    }
  };

  return (
    <section className={styles.candidateSection} id={"candidatura"}>
      <div className={styles.candidateHeader}>
        <h2>Não encontrou representante no seu estado?</h2>
        <p>
          Você pode se candidatar para ser um de nossos representates no seu
          estado!
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className={styles.candidateForm}>
        {/* Linha 1: Empresa e Nome fantasia */}
        <div className={styles.formRow}>
          <div className={styles.inputField}>
            <label className={styles.isRequired} htmlFor="empresa">
              Empresa
            </label>
            <input
              id="company"
              type="text"
              placeholder="Razão social da empresa"
              value={formData.empresa}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("empresa", e.target.value)
              }
              required
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="nome_fantasia">Nome fantasia</label>
            <input
              id="trading_name"
              type="text"
              placeholder="Nome comercial da empresa"
              value={formData.nome_fantasia ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("nome_fantasia", e.target.value)
              }
            />
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Linha 2: CNPJ */}
        <div className={styles.formRow}>
          <div className={styles.inputField}>
            <label className={styles.isRequired} htmlFor="cnpj_cpf">
              CNPJ
            </label>
            <input
              id="cnpj"
              type="text"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj_cpf}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("cnpj_cpf", numberRgx(e.target.value))
              }
              required
            />
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Linha 3: Estado, Cidade, CEP e Número */}
        <div className={styles.formRow}>
          <div className={styles.inputField}>
            <label className={styles.isRequired} htmlFor="estado">
              Estado
            </label>
            <input
              id="state"
              type="text"
              placeholder="Ex: Pernambuco"
              value={formData.estado}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("estado", e.target.value)
              }
              required
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.isRequired} htmlFor="cidade">
              Cidade
            </label>
            <input
              id="city"
              type="text"
              placeholder="Ex: Recife"
              value={formData.cidade}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("cidade", e.target.value)
              }
              required
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.isRequired} htmlFor="cep">
              CEP
            </label>
            <input
              id="cep"
              type="text"
              placeholder="00000-000"
              value={formData.cep}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("cep", numberRgx(e.target.value))
              }
              required
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="numero">Número</label>
            <input
              id="number"
              type="text"
              placeholder="Ex: 123"
              value={formData.numero}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("numero", e.target.value)
              }
            />
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Linha 4: Email e Contato(celular/fixo) */}
        <div className={styles.formRow}>
          <div className={styles.inputField}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("email", e.target.value)
              }
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="contato">Contato (celular/fixo)</label>
            <input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.contato ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("contato", numberRgx(e.target.value))
              }
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Me candidatar
        </button>
        <span className={styles.contactWarning}>
          Aviso: Pelo menos uma forma de contato deve ser informada*
        </span>
      </form>
    </section>
  );
};
