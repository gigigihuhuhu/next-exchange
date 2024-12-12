"use client";

import { useState } from "react";
import MarketGridCoins from "./market-grid-coins";

export default function MarketGrid({ markets }: { markets: string }) {
  const [activeCurrencyIdx, setActiveCurrencyIdx] = useState(0);
  const [BTCtoKRW, setBTCtoKRW] = useState<number | undefined>(undefined);

  const currencyTypes = [
    { codeName: "KRW", koreanName: "원화", englishName: "KRW" },
    { codeName: "BTC", koreanName: "BTC", englishName: "BTC" },
    { codeName: "USDT", koreanName: "USDT", englishName: "USDT" },
  ];

  return (
    <>
      <div className="sticky top-0 bg-white z-[5]">
        <div className="h-[45px] flex flex-row items-end justify-between *:w-full *:font-semibold *:py-1 *:transition-colors *:duration-200">
          {currencyTypes.map((currencyType, index) => {
            return (
              <button
                key={index}
                className={
                  (activeCurrencyIdx === index
                    ? "text-blue-600 !border-blue-600"
                    : "hover:border-gray-400") + " text-sm border-b-4 border-transparent h-full box-border"
                }
                onClick={() => setActiveCurrencyIdx(index)}
              >
                {currencyType.koreanName}
              </button>
            );
          })}
        </div>
        <div
          className={
            "flex flex-row items-center px-3 border-t h-[30px] w-full bg-gray-50 text-[0.72rem] font-medium"
          }
        >
          <div className="basis-[30px]">
            <h4 className="text-gray-500"></h4>
          </div>
          <div className="basis-[98px] text-left">
            <h4 className="text-gray-500">한글명</h4>
          </div>
          <div className="basis-[94px] text-center">
            <h4 className="text-gray-500">현재가</h4>
          </div>
          <div className="basis-[58px] text-center">
            <h4 className="text-gray-500">전일대비</h4>
          </div>
          <div className="basis-[98px] text-right">
            <h4 className="text-gray-500">거래대금</h4>
          </div>
        </div>
      </div>
      <div className="relative w-full *:w-full">
        {currencyTypes.map((currencyType, index) => {
          return (
            <div
              key={index}
              className={
                "absolute " + (activeCurrencyIdx === index ? "block" : "hidden")
              }
            >
              <MarketGridCoins
                markets={markets}
                currencyTypeCode={currencyType.codeName}
                BTCtoKRW={BTCtoKRW}
                setBTCtoKRW={setBTCtoKRW}
              ></MarketGridCoins>
            </div>
          );
        })}
      </div>
    </>
  );
}
