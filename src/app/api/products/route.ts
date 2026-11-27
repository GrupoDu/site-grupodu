import { errorResponse } from "@/utils/errorResponse";
import { NextResponse } from "next/server";
import { CACHE_CONTROL_DIRECTIVES } from "@/constants/cacheControlDirectives.constant";
import { supabaseClient } from "@/services/supabaseClient.service";
import { PostgrestError } from "@supabase/supabase-js";
import { IProductResponse } from "@/app/api/products/productResponse.interface";
import { IResponsePayload } from "@/@types/responsePayload.interface";

export async function GET() {
  try {
    const payload = await getProducts();

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": CACHE_CONTROL_DIRECTIVES,
      },
    });
  } catch (err) {
    const error = err as Error;
    return errorResponse(error.message);
  }
}

async function getProducts(): Promise<IResponsePayload<IProduct[]>> {
  const URL = process.env.API_URL;
  const res = await fetch(`${URL}/productPublic/all`);
  const data: IResponsePayload<IProduct[]> = await res.json();

  if (!res.ok) throw new Error(data.message);

  return {
    data: data.data,
    message: data.message,
    status: 200,
  };
}

function textNormalization(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, " ");
}
