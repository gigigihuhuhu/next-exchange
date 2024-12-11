"use client";

import { useState } from "react";
import { Market, Markets } from "@/model/market";

export function MarketGrid({ markets }: { markets: string }) {
  const [activeTab, setActiveTab] = useState(0);

  const currencyTypes = [
    { codeName: "KRW", koreanName: "원화", englishName: "KRW" },
    { codeName: "BTC", koreanName: "비트코인", englishName: "BTC" },
    { codeName: "USDT", koreanName: "USDT", englishName: "USDT" },
  ];
  
  const allMarkets = Markets.fromObject(JSON.parse(markets).markets);
  return (
    <div>
      <div className="flex flex-row items-start justify-between *:w-full *:font-semibold *:py-1 *:transition-colors *:duration-200">
        {currencyTypes.map((currencyType, index) => {
          return (
            <button
              key={index}
              className={
                activeTab === index
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "hover:border-b-4 hover:border-gray-400"
              }
              onClick={() => setActiveTab(index)}
            >
              {currencyType.koreanName}
            </button>
          );
        })}
      </div>
      <div>
        {allMarkets
          .findMarketByCurrencyType(currencyTypes[0].codeName)
          .map((market: Market, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-between *:w-full *:py-1 *:transition-colors *:duration-200"
              >
                <div>{market.marketCode}</div>
                <div>{market.koreanName}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
