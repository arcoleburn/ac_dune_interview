import { formatNum } from "@/shared/helpers";
import { Coin } from "@/shared/types";
import Link from "next/link";

const CoinTable = ({
  data,
  sort,
  direction,
}: {
  data: Coin[];
  sort?: string;
  direction?: "asc" | "desc";
}) => {
  const sortLink = (field: string) => {
    return `/?sort=${field}&direction=${
      sort === field && direction === "asc" ? "desc" : "asc"
    }`;
  };

  return (
    <table className="min-w-full bg-white text-sm text-left text-gray-700">
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Symbol</th>
          <th className="px-6 py-3">
            <Link href={sortLink("marketCapUsd")}>Market Cap (USD)</Link>
          </th>
          <th className="px-6 py-3">
            <Link href={sortLink("priceUsd")}>Price (USD)</Link>
          </th>
          <th className="px-6 py-3">
            <Link href={sortLink("volumeUsd24Hr")}>Volume</Link>
          </th>
          <th className="px-6 py-3">
            <Link href={sortLink("changePercent24Hr")}>% Change (24hr)</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => {
          return (
            <tr
              key={coin.id}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">
                <Link href={`/coin/${coin.id}`}>{coin.name} </Link>
              </td>
              <td className="px-6 py-4">{coin.symbol}</td>
              <td className="px-6 py-4">
                {formatNum(coin.marketCapUsd, true)}
              </td>
              <td className="px-6 py-4">{formatNum(coin.priceUsd, true)}</td>
              <td className="px-6 py-4">{formatNum(coin.volumeUsd24Hr)}</td>
              <td
                className={`px-6 py-4 font-medium ${
                  Number(coin.changePercent24Hr) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatNum(coin.changePercent24Hr)}%
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CoinTable;
