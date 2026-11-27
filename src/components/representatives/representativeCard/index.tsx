import React from "react";
import styles from "./styles.module.scss";
import { IRepresentative } from "@/@types/representative.interface";
import { LuMapPin, LuPhone, LuMail, LuFileText } from "react-icons/lu";

interface RepresentativeCardProps {
  representative: IRepresentative;
}

export const RepresentativeCard = ({
  representative,
}: RepresentativeCardProps) => {
  const { company, tradingName, cnpjCpf, email, phone, city, uf, cep, number } =
    representative;

  return (
    <div className={styles.folderCard}>
      <div className={styles.cityTab}>
        <LuMapPin className={styles.pinIcon} />
        <span>{`${city} - ${uf}`}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.companyHeader}>
          <span className={styles.companyName}>{company}</span>
          {tradingName && (
            <span className={styles.tradingName}>{tradingName}</span>
          )}
        </div>
        <div className={styles.detailsList}>
          <div className={styles.detailItem}>
            <LuFileText className={styles.icon} />
            <span>{`CNPJ/CPF: ${cnpjCpf}`}</span>
          </div>
          {phone && (
            <div className={styles.detailItem}>
              <LuPhone className={styles.icon} />
              <span>{phone}</span>
            </div>
          )}
          {email && (
            <div className={styles.detailItem}>
              <LuMail className={styles.icon} />
              <span>{email}</span>
            </div>
          )}
          <div className={styles.detailItem}>
            <LuMapPin className={styles.icon} />
            <span>{`Nº ${number} - CEP: ${cep}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
