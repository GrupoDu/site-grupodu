import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

export const GET = async (request: NextRequest) => {
  const isMissingEnvValue = !supabaseUrl || !supabaseKey;
  if (isMissingEnvValue) {
    return NextResponse.json(
      { error: "Supabase configuration is missing" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const produtoEndpoint = getProductEndpoint(request);

    if (!produtoEndpoint) return await productEndpointNotFound(supabase);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("product_uuid");

    if (error) return errorResponse(error);

    const produtoNormalizado = textNormalization(produtoEndpoint);
    const dataFiltrada = data.filter((item) =>
      textNormalization(item.tipo_produto).includes(produtoNormalizado)
    );

    return NextResponse.json(dataFiltrada, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    const error = err as Error;
    console.error(error);
    return errorResponse(error);
  }
};

function getProductEndpoint(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  return searchParams.get("produto") ?? "";
}

async function productEndpointNotFound(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("products").select("*");

  if (error) return errorResponse(error);

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

function errorResponse(error: Error) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}

function textNormalization(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, " ");
}
