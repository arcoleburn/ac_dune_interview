import PriceChart from "@/scenes/PriceChart";
import { Coin } from "@/shared/types";

const getCoinData = async (id: string): Promise<Coin | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/coin/${id}`
    );
    if (!res.ok) {
      throw new Error(`Error Fetching Coin Data: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch coin data, try again later");
  }
};

export default async function CoinPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const coin = await getCoinData(id);
  return (
    <div className="px-4 py-3  max-w-sm">
      {coin ? (
        <PriceChart initialCoin={coin} coinId={coin.id} />
      ) : (
        <p> Error fetching coin data, try again later! </p>
      )}
    </div>
  );
}
