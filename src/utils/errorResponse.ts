import { NextResponse } from "next/server";

export function errorResponse(error: string, status: number = 500) {
  return NextResponse.json({ error, status }, { status });
}
