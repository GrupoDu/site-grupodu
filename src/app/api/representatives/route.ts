import { supabaseClient } from "@/services/supabaseClient.service";
import { NextResponse } from "next/server";
import { IRepresentative } from "@/@types/representative.interface";
import { errorResponse } from "@/utils/errorResponse";
import { PostgrestError } from "@supabase/supabase-js";
import { CACHE_CONTROL_DIRECTIVES } from "@/constants/cacheControlDirectives.constant";
import { IResponsePayload } from "@/@types/responsePayload.interface";

interface IRepresentativeResponseDto {
  representatives: IRepresentative[];
  error: PostgrestError | null;
}

export async function GET() {
  try {
    const payload = await getRepresentatives();

    const repsGroupedByUf = groupRepresentativesByUf(payload.data);

    return NextResponse.json(
      {
        data: repsGroupedByUf,
        message: payload.message,
        status: payload.status,
      },
      {
        headers: {
          "Cache-Control": CACHE_CONTROL_DIRECTIVES,
        },
      }
    );
  } catch (e) {
    return errorResponse((e as Error).message);
  }
}

/**
 * Busca `representatives` no banco.
 */
async function getRepresentatives(): Promise<
  IResponsePayload<IRepresentative[]>
> {
  const URL = process.env.API_URL;

  const res = await fetch(`${URL}/representativesPublic/all`);

  const data: IResponsePayload<IRepresentative[]> = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}

/**
 * Agrupa representates pela `UF`
 *
 * @param {IRepresentative[]} representatives - Lista de representantes.
 */
function groupRepresentativesByUf(
  representatives: IRepresentative[]
): Record<string, IRepresentative[]> {
  return representatives.reduce<Record<string, IRepresentative[]>>(
    (acc, representative) => {
      (acc[representative.uf] ??= []).push(representative);
      return acc;
    },
    {}
  );
}
