"use client";

import { useState } from "react";
import MarketGridCoins from "./market-grid-coins";
import SearchBar from "./search-bar";
import { useTranslations } from "next-intl";

export default function MarketGrid({ markets }: { markets: string }) {
  const [activeCurrencyIdx, setActiveCurrencyIdx] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const t = useTranslations("MarketGrid");
  const currencyTypes = [
    { code: "KRW"},
    { code: "BTC"},
    { code: "USDT"},
  ];

  return (
    <>
      <div className="sticky top-0 bg-white z-[5]">
        <SearchBar setSearchKeyword={setSearchKeyword}></SearchBar>
        <div className="h-[45px] flex flex-row items-end justify-between *:w-full *:font-semibold *:py-1 *:transition-colors *:duration-200">
          {currencyTypes.map((currencyType, index) => {
            return (
              <button
                key={index}
                className={
                  (activeCurrencyIdx === index
                    ? "text-blue-600 !border-blue-600"
                    : "hover:border-gray-400") +
                  " text-sm border-b-4 border-transparent h-full box-border"
                }
                onClick={() => setActiveCurrencyIdx(index)}
              >
                {t(currencyType.code)}
              </button>
            );
          })}
        </div>
        <div
          className={
            "flex flex-row items-center border-t h-[30px] w-full bg-gray-50 text-[0.72rem] font-medium"
          }
        >
          <div className="basis-[146px] text-center">
            <h4 className="text-gray-500">{t("name")}</h4>
          </div>
          <div className="basis-[88px] text-center">
            <h4 className="text-gray-500">{t("price")}</h4>
          </div>
          <div className="basis-[78px] text-center">
            <h4 className="text-gray-500">{t("change")}</h4>
          </div>
          <div className="basis-[88px] text-center">
            <h4 className="text-gray-500">{t("volume")}</h4>
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
                currencyTypeCode={currencyType.code}
                searchKeyword={searchKeyword}
              ></MarketGridCoins>
            </div>
          );
        })}
      </div>
    </>
  );
}
