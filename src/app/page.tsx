import CoinTable from "@/scenes/CoinTable";
import CoinCard from "@/shared/components/CoinCard";
import { Coin } from "@/shared/types";

const getCryptoData = async (
  sort?: keyof Coin,
  direction: "asc" | "desc" = "asc"
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/allCoins`);

  let data: Coin[] = await res.json();
  if (sort) {
    data.sort((a: Coin, b: Coin) => {
      const aVal = parseFloat(a[sort] || "0");
      const bVal = parseFloat(b[sort] || "0");

      return direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  }
  return data;
};

type HomePageProps = {
  searchParams: Promise<{
    sort?: keyof Coin;
    direction?: "asc" | "desc";
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const { sort, direction } = await searchParams;

  const data: Coin[] = await getCryptoData(sort, direction);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="hidden md:block overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <CoinTable data={data} sort={sort} direction={direction} />
      </div>
      <div className="md:hidden space-y-4">
        {data.map((coin) => (
          <div key={coin.id} className=" justify-center mx-auto">
            <CoinCard coin={coin} />
          </div>
        ))}
      </div>
    </div>
  );
}
