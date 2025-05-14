import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const res = await fetch(`https://rest.coincap.io/v3/assets/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.COIN_CAP_API_TOKEN}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
