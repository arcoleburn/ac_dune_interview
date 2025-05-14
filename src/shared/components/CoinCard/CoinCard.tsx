import { formatNum } from "@/shared/helpers";
import { Coin } from "@/shared/types";
import Link from "next/link";

const CoinCard = ({ coin }: { coin: Coin }) => {
  const change = parseFloat(coin.changePercent24Hr);
  const isPositive = change >= 0;
  return (
    <div>
      <div className="rounded-xl border shadow-sm px-4 py-3 max-w-sm w-auto">
        <div className="mb-2">
          <Link href={`/coin/${coin.id}`}>
            <h2 className="text-xl font-bold">{coin.name}</h2>
            <p className="text-sm uppercase">{coin.symbol}</p>
          </Link>
        </div>

        <div className="flex items-end justify-between">
          <div
            className={`flex items-baseline space-x-1 
            }`}
          >
            <span className="text-2xl font-semibold ">
              {formatNum(coin.priceUsd, true)}
            </span>
            <span className="text-sm ">USD</span>
          </div>
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {formatNum(change)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
