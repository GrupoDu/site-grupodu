"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { northeastStates } from "@/constants/northeastStates";
import { IRepresentative } from "@/@types/representative.interface";
import { RepresentativeCard } from "../representativeCard";
import Link from "next/link";
import { IResponsePayload } from "@/@types/responsePayload.interface";

interface RepresentativesViewerProps {
  initialRepresentatives: IRepresentative[];
}

type DisplayOptionsProps = {
  selectedUf: string;
  setSelectedUf: (value: string) => void;
};

type DisplayRepresentativesProps = {
  representatives: IRepresentative[];
};

export const RepresentativesViewer = ({
  initialRepresentatives,
}: RepresentativesViewerProps) => {
  const [selectedUf, setSelectedUf] = useState<string>("PE");

  const currentState = northeastStates.find((state) => state.uf === selectedUf);
  const currentStateName = currentState ? currentState.name : selectedUf;

  const filteredRepresentatives = initialRepresentatives.filter(
    (representative) => representative.uf === selectedUf
  );

  return (
    <div className={styles.viewerContainer}>
      <aside className={styles.leftColumn}>
        <span className={styles.columnTitle}>Selecione o Estado</span>
        <div className={styles.statesList}>
          {" "}
          <DisplayOptions
            selectedUf={selectedUf}
            setSelectedUf={setSelectedUf}
          />
        </div>
      </aside>
      <section className={styles.rightColumn}>
        <div className={styles.header}>
          <h2 className={styles.stateTitle}>{currentStateName}</h2>
          <p className={styles.stateDescription}>
            Veja todos os representantes nessa região
          </p>
        </div>
        <DisplayRepresentatives representatives={filteredRepresentatives} />
      </section>
    </div>
  );
};

/**
 * Monta opções de `UF`
 *
 * @param {DisplayOptionsProps} param0                - DisplayOptionsProps
 * @param {string}              param0.selectedUf     - `UF` atualmente selecionado
 * @param {string}              param0.setSelectedUf  - função para alterar valor de selectedUf
 * @see DisplayOptionsProps
 * @constructor
 */
function DisplayOptions({ selectedUf, setSelectedUf }: DisplayOptionsProps) {
  return northeastStates.map((state) => (
    <label
      key={state.uf}
      className={`${styles.radioOption} ${
        isStateSelected(selectedUf, state.uf) ? styles.selectedOption : ""
      }`}
    >
      <input
        type="radio"
        name="estado"
        value={state.uf}
        checked={isStateSelected(selectedUf, state.uf)}
        onChange={() => setSelectedUf(state.uf)}
        className={styles.radioInput}
      />
      <span className={styles.stateLabel}>
        {state.name} ({state.uf})
      </span>
    </label>
  ));
}

/**
 * Verifica se o `UF` selecionado é igual ao `stateUf` atual
 *
 * @param {string} selectedUf - `UF` selecionado
 * @param {string} stateUf    - `UF` atual
 */
function isStateSelected(selectedUf: string, stateUf: string) {
  return selectedUf === stateUf;
}

/**
 * Monta lista de representantes
 *
 * @param {DisplayRepresentativesProps} param0                 - DisplayRepresentativesProps
 * @param {IRepresentative[]}           param0.representatives - Representantes
 * @see DisplayRepresentativesProps
 * @constructor
 */
function DisplayRepresentatives({
  representatives,
}: DisplayRepresentativesProps) {
  if (representatives.length < 1) return <EmptyNotice />;

  return (
    <div className={styles.representativesGrid}>
      {representatives.map((representative, index) => (
        <RepresentativeCard
          key={`${representative.cnpjCpf}-${index}`}
          representative={representative}
        />
      ))}
    </div>
  );
}

/**
 * Monta aviso de lista de representantes vazia.
 *
 * @constructor
 */
function EmptyNotice() {
  return (
    <div className={styles.emptyNotice}>
      <h4>Nenhum representante cadastrado para este estado no momento.</h4>
      <span>
        Interessado em se candidatar como um de nossos Representantes?
      </span>
      <Link href={"/representantes/#candidatura"}>Clique aqui</Link>
    </div>
  );
}
