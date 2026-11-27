import { errorResponse } from "@/utils/errorResponse";
import { supabaseClient } from "@/services/supabaseClient.service";
import { NextResponse } from "next/server";
import { IProductResponse } from "@/app/api/products/productResponse.interface";
import { CACHE_CONTROL_DIRECTIVES } from "@/constants/cacheControlDirectives.constant";
import { IResponsePayload } from "@/@types/responsePayload.interface";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) return NextResponse.redirect(new URL("/api/products", req.url));

  try {
    const payload = await getProductsByType(decodeURIComponent(slug));

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": CACHE_CONTROL_DIRECTIVES,
      },
    });
  } catch (e) {
    return errorResponse((e as Error).message);
  }
}

async function getProductsByType(
  type: string
): Promise<IResponsePayload<IProduct[]>> {
  const URL = process.env.API_URL;
  const res = await fetch(`${URL}/productPublic/type/${type}`);
  const data: IResponsePayload<IProduct[]> = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}
