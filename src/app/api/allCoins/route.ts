import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://rest.coincap.io/v3/assets?limit=20", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.COIN_CAP_API_TOKEN}`,
    },
    next: { revalidate: 120 },
  });
  const { data } = await res.json();
  return NextResponse.json(data);
}
