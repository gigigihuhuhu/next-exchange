"use client";

import { useEffect, useState } from "react";
import { Market, Markets } from "@/model/market";
import { Coins } from "@/model/coin";

export function MarketGridCoins({
  markets,
  currencyTypeCode,
}: {
  markets: string;
  currencyTypeCode: string;
}) {
  const [coins, setCoins] = useState<Coins | null>(null);
  const allMarkets = Markets.fromObject(JSON.parse(markets).markets);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        `https://api.upbit.com/v1/ticker/all?quote_currencies=${currencyTypeCode}`
      );
      const result = await res.json();
      setCoins(Coins.fromDTO(result));
    };

    const interval = parseInt(process.env.POLLING_INTERVAL || "10000", 10);

    fetchCoins();

    const fetchInterval = setInterval(() => {
      fetchCoins();
    }, interval);

    return () => clearInterval(fetchInterval);
  }, []);

  return (
    <div>
      <div>
        {allMarkets
          .findMarketByCurrencyType(currencyTypeCode)
          .map((market: Market, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-between *:w-full *:py-1 *:transition-colors *:duration-200"
              >
                <div>{market.marketCode}</div>
                <div>{market.koreanName}</div>
                <div>{coins?.findCoin(market.marketCode).tradePrice}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
