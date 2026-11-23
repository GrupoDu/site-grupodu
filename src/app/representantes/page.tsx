import styles from "./page.module.scss";
import { RepresentativesViewer } from "@/components/representatives/representativesViewer";
import { CandidateForm } from "@/components/representatives/candidateForm";
import { mockRepresentatives } from "@/constants/mockRepresentatives";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Representantes | Grupo Du",
  description:
    "Pesquise representantes do Grupo Du na sua região ou candidate-se como representante.",
};

const RepresentantesPage = () => {
  return (
    <main className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Representantes</h1>
          <p>Pesquise se existem representantes proximos da sua região</p>
        </div>
      </header>

      <div className={styles.mainContent}>
        <RepresentativesViewer initialRepresentatives={mockRepresentatives} />
        <hr className={styles.sectionDivider} />
        <CandidateForm />
      </div>
    </main>
  );
};

export default RepresentantesPage;
