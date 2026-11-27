import styles from "./page.module.scss";
import { RepresentativesViewer } from "@/components/representatives/representativesViewer";
import { CandidateForm } from "@/components/representatives/candidateForm";
import { Metadata } from "next";
import { IResponsePayload } from "@/@types/responsePayload.interface";
import { IRepresentative } from "@/@types/representative.interface";
import { CACHE_CONTROL_DIRECTIVES } from "@/constants/cacheControlDirectives.constant";

export const metadata: Metadata = {
  title: "Representantes | Grupo Du",
  description:
    "Pesquise representantes do Grupo Du na sua região ou candidate-se como representante.",
};

export default async function RepresentantesPage() {
  const representatives: IRepresentative[] = (await getRepresentatives()) ?? [];

  return (
    <main className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Representantes</h1>
          <p>Pesquise se existem representantes proximos da sua região</p>
        </div>
      </header>

      <div className={styles.mainContent}>
        <RepresentativesViewer initialRepresentatives={representatives} />
        <hr className={styles.sectionDivider} />
        <CandidateForm />
      </div>
    </main>
  );
}

async function getRepresentatives() {
  const URL = process.env.API_URL;

  try {
    const res = await fetch(`${URL}/representativePublic/all`, {
      headers: {
        "Cache-Control": CACHE_CONTROL_DIRECTIVES,
      },
      next: { revalidate: 604800 },
    });

    const data: IResponsePayload<IRepresentative[]> = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data.data;
  } catch (e) {
    console.error((e as Error).message);
  }
}
