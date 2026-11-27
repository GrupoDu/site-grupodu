import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";

const REDIS_URL = process.env.UPSTASH_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REST_TOKEN;
const secretsNotFound = !REDIS_URL || !REDIS_TOKEN;

if (secretsNotFound) throw new Error("SECRETS do REDIS não encontradas.");

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

const rateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(6, "1m"),
});

export async function middleware(req: NextRequest) {
  const clientIp = (await getClientIp()) || "default-identifier";

  const { success } = await rateLimiter.limit(`${clientIp}-site-gd`);

  if (!success) {
    return NextResponse.json(
      {
        message: "Rate Limit excedido.",
        status: 429,
      },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  return NextResponse.next();
}

async function getClientIp() {
  const headersList = await headers();
  return headersList.get("x-forwarded-for");
}

export const config = {
  matcher: ["/api/:path*"],
};
