"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { IRepresentativeCandidateForm } from "../types";
import { submitRepresentativeCandidate } from "@/services/submitRepresentativeCandidate";

const initialFormValues: IRepresentativeCandidateForm = {
  company: "",
  trading_name: "",
  cnpj: "",
  state: "",
  city: "",
  cep: "",
  number: "",
  email: "",
  phone: "",
};

export const CandidateForm = () => {
  const [formData, setFormData] =
    useState<IRepresentativeCandidateForm>(initialFormValues);

  const handleInputChange = (
    field: keyof IRepresentativeCandidateForm,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitRepresentativeCandidate(formData);
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
            <label htmlFor="company">Empresa</label>
            <input
              id="company"
              type="text"
              placeholder="Razão social da empresa"
              value={formData.company}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("company", e.target.value)
              }
              required
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="trading_name">Nome fantasia</label>
            <input
              id="trading_name"
              type="text"
              placeholder="Nome comercial da empresa"
              value={formData.trading_name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("trading_name", e.target.value)
              }
              required
            />
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Linha 2: CNPJ */}
        <div className={styles.formRow}>
          <div className={styles.inputField}>
            <label htmlFor="cnpj">CNPJ</label>
            <input
              id="cnpj"
              type="text"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("cnpj", e.target.value)
              }
              required
            />
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Linha 3: Estado, Cidade, CEP e Número */}
        <div className={styles.formRow}>
          <div className={styles.inputField}>
            <label htmlFor="state">Estado</label>
            <input
              id="state"
              type="text"
              placeholder="Ex: Pernambuco"
              value={formData.state}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("state", e.target.value)
              }
              required
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="city">Cidade</label>
            <input
              id="city"
              type="text"
              placeholder="Ex: Recife"
              value={formData.city}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("city", e.target.value)
              }
              required
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="cep">CEP</label>
            <input
              id="cep"
              type="text"
              placeholder="00000-000"
              value={formData.cep}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("cep", e.target.value)
              }
              required
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="number">Número</label>
            <input
              id="number"
              type="text"
              placeholder="Ex: 123"
              value={formData.number}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("number", e.target.value)
              }
              required
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
              value={formData.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("email", e.target.value)
              }
              required
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="phone">Contato (celular/fixo)</label>
            <input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("phone", e.target.value)
              }
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Me candidatar
        </button>
      </form>
    </section>
  );
};
