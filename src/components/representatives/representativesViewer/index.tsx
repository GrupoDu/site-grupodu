"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { northeastStates } from "@/constants/northeastStates";
import { IRepresentative } from "@/@types/representative.interface";
import { RepresentativeCard } from "../representativeCard";
import Link from "next/link";

interface RepresentativesViewerProps {
  initialRepresentatives: IRepresentative[];
}

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
          {northeastStates.map((state) => {
            const isSelected = selectedUf === state.uf;
            return (
              <label
                key={state.uf}
                className={`${styles.radioOption} ${
                  isSelected ? styles.selectedOption : ""
                }`}
              >
                <input
                  type="radio"
                  name="estado"
                  value={state.uf}
                  checked={isSelected}
                  onChange={() => setSelectedUf(state.uf)}
                  className={styles.radioInput}
                />
                <span className={styles.stateLabel}>
                  {state.name} ({state.uf})
                </span>
              </label>
            );
          })}
        </div>
      </aside>

      <section className={styles.rightColumn}>
        <div className={styles.header}>
          <h2 className={styles.stateTitle}>{currentStateName}</h2>
          <p className={styles.stateDescription}>
            Veja todos os representantes de {currentStateName}
          </p>
        </div>

        {filteredRepresentatives.length > 0 ? (
          <div className={styles.representativesGrid}>
            {filteredRepresentatives.map((representative, index) => (
              <RepresentativeCard
                key={`${representative.cnpj_cpf}-${index}`}
                representative={representative}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyNotice}>
            <h4>
              Nenhum representante cadastrado para este estado no momento.
            </h4>
            <span>
              Interessado em se candidatar como um de nossos Representantes?
            </span>
            <Link href={"/representantes/#candidatura"}>Clique aqui</Link>
          </div>
        )}
      </section>
    </div>
  );
};
