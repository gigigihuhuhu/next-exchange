"use client";

import { useState } from "react";
import { MarketGridCoins } from "./market-grid-coins";

export function MarketGrid({ markets }: { markets: string }) {
  const [activeCurrencyIdx, setActiveCurrencyIdx] = useState(0);

  const currencyTypes = [
    { codeName: "KRW", koreanName: "원화", englishName: "KRW" },
    { codeName: "BTC", koreanName: "비트코인", englishName: "BTC" },
    { codeName: "USDT", koreanName: "USDT", englishName: "USDT" },
  ];

  return (
    <div>
      <div className="flex flex-row items-start justify-between *:w-full *:font-semibold *:py-1 *:transition-colors *:duration-200">
        {currencyTypes.map((currencyType, index) => {
          return (
            <button
              key={index}
              className={
                activeCurrencyIdx === index
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "hover:border-b-4 hover:border-gray-400"
              }
              onClick={() => setActiveCurrencyIdx(index)}
            >
              {currencyType.koreanName}
            </button>
          );
        })}
      </div>
      <div className="relative">
        {currencyTypes.map((currencyType, index) => {
          return (
            <div
              className={
                "absolute " + (activeCurrencyIdx === index ? "block" : "hidden")
              }
            >
              <MarketGridCoins
                key={index}
                markets={markets}
                currencyTypeCode={currencyType.codeName}
              ></MarketGridCoins>
            </div>
          );
        })}
      </div>
    </div>
  );
}
