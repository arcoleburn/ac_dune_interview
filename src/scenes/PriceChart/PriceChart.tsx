"use client";

import { formatNum } from "@/shared/helpers";
import { useState, useEffect, useRef } from "react";
// import { BarChart } from "recharts";

const PriceChart = ({ initialCoin, coinId }: any) => {
  const [coin, setCoin] = useState(initialCoin);
  // const [historical, setHistorical] = useState();
  const [animate, setAnimate] = useState(false);
  const prevPriceRef = useRef(initialCoin.priceUsd);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/coin/${coinId}`);
      const updated = await res.json();

      const newPrice = parseFloat(updated.data.priceUsd);
      const prevPrice = parseFloat(prevPriceRef.current);

      if (newPrice !== prevPrice) {
        setAnimate(true);
        prevPriceRef.current = newPrice;
        setTimeout(() => setAnimate(false), 500);
      }
      setCoin({ ...updated.data, _fetchedAt: Date.now() });
    }, 15000);

    return () => clearInterval(interval);
  }, [coinId]);

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     console.log("HERE");
  //     console.log({ initialCoin });
  //     const res = await fetch(`/api/coin/${coinId}/history`);
  //     const historical = await res.json();
  //     console.log({ historical });
  //     setHistorical({ ...historical, _fetchedAt: Date.now() });
  //   }, 300000);
  //   return () => clearInterval(interval);
  // }, [coinId]);

  const change = parseFloat(coin.changePercent24Hr);
  const isPositive = change >= 0;
  return (
    <div>
      <div className="rounded-xl border shadow-sm px-4 py-3 w-full max-w-sm">
        <div className="mb-2">
          <h2 className="text-xl font-bold">{coin.name}</h2>
          <p className="text-sm uppercase">{coin.symbol}</p>
        </div>

        <div className="flex items-end justify-between">
          <div
            className={`flex items-baseline space-x-1 ${
              animate ? "animate-pulse" : ""
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
      <p className="text-sm">
        Price updates approximately every 15 seconds, but may be rate-limited by
        external API.
      </p>
    </div>
    // <div>
    //   <BarChart>

    //   </BarChart>
    // </div>
  );
};

export default PriceChart;
