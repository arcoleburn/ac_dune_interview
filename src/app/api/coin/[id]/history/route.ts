import { NextResponse } from "next/server";

export const get1HourAgoTimestamp = (): number => {
  const now = new Date();
  now.setHours(now.getHours() - 1);
  return now.getTime();
};
export const getCurrentTimestamp = (): number => {
  return new Date().getTime();
};

export async function GET(
  req: Request,
  { params }: { params: { coinId: string } }
) {
  const { coinId } = params;
  console.log({ coinId });
  const res = await fetch(
    `https://rest.coincap.io/v3/assets/${coinId}/history?interval=m5&start=${get1HourAgoTimestamp()}&end=${getCurrentTimestamp()}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.COIN_CAP_API_TOKEN}`,
      },
      cache: "no-store",
    }
  );
  console.log(res);

  //   const data = await res.json();
  // /  return NextResponse.json(data);
}
