import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/services/supabaseClient.service";
import { errorResponse } from "@/utils/errorResponse";
import { CACHE_CONTROL_DIRECTIVES } from "@/constants/cacheControlDirectives.constant";

interface IProductResponse {
  products: IProduct[];
  error?: PostgrestError | null;
}

export const GET = async (request: NextRequest) => {
  try {
    const { products, error } = await getProducts();

    if (error) return errorResponse(error.message);

    return NextResponse.json(products, {
      headers: {
        "Cache-Control": CACHE_CONTROL_DIRECTIVES,
      },
    });
  } catch (err) {
    const error = err as Error;
    return errorResponse(error.message);
  }
};

async function getProducts(): Promise<IProductResponse> {
  const supabase = supabaseClient();

  const { data, error } = await supabase.from("products").select("*");

  return {
    products: data as IProduct[],
    error,
  };
}

function textNormalization(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, " ");
}
