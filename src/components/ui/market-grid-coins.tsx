"use client";

import { useEffect, useState } from "react";
import { Market, Markets } from "@/model/market";
import { Coin, Coins } from "@/model/coin";
import { FavoriteIcon } from "../icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function MarketGridCoins({
  markets,
  currencyTypeCode,
}: {
  markets: string;
  currencyTypeCode: string;
}) {
  const [coins, setCoins] = useState<Coins | null>(null);
  const [currMarket] = useState<string | null>(useSearchParams().get("market"));
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
    <>
      {allMarkets
        .findMarketByCurrencyType(currencyTypeCode)
        .map((market: Market, index) => {
          const coin: Coin =
            coins?.findCoin(market.marketCode) ?? Coin.getDefaultCoin();
          return (
            <Link key={index} href={`/exchange?market=${market.marketCode}`}>
              <div
                className={
                  "flex flex-row items-center px-3 border-t h-[45px] hover:bg-gray-100 w-full " +
                  (currMarket === market.marketCode ? " bg-gray-100" : "")
                }
              >
                <div className="flex flex-row items-center justify-start gap-2 basis-[30px]">
                  <div>
                    <FavoriteIcon></FavoriteIcon>
                  </div>
                  <div className="w-4">
                    {coin.change == "FALL" ? (
                      <p className="text-green-700 text-xs">▼</p>
                    ) : (
                      ""
                    )}
                    {coin.change == "RISE" ? (
                      <p className="text-red-600 text-xs">▲</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="text-left basis-[98px]">
                  <h3 className="text-[0.75rem] leading-[0.9rem] font-semibold">
                    {market.koreanName}
                  </h3>
                  <h3 className="text-[0.65rem] leading-[0.9rem] text-gray-500">
                    {market.marketCode}
                  </h3>
                </div>
                <div
                  className={
                    "text-right basis-[94px] " +
                    (coin.change == "FALL" ? " text-green-700" : "") +
                    (coin.change == "RISE" ? " text-red-600" : "")
                  }
                >
                  <h1 className="text-xs font-bold">
                    {coin.tradePrice.toLocaleString()}
                  </h1>
                </div>
                <div
                  className={
                    "text-[0.65rem] text-right flex flex-col justify-center basis-[58px]" +
                    (coin.change == "FALL" ? " text-green-700" : "") +
                    (coin.change == "RISE" ? " text-red-600" : "")
                  }
                >
                  <h3>{`${
                    (coin.signedChangeRate > 0 ? "+" : "") +
                    (coin.signedChangeRate * 100).toFixed(2)
                  }%`}</h3>
                  <h3>{coin.signedChangePrice.toLocaleString()}</h3>
                </div>

                <div className="text-xs basis-[98px] flex flex-row justify-end">
                  <h4>
                    {parseInt(
                      (coin.accTradePrice24h / 1000000).toFixed(0)
                    ).toLocaleString()}
                  </h4>
                  <h4 className="text-gray-500">백만</h4>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
}
