"use client";

import { Market, Markets } from "@/model/market";
import { Coin } from "@/model/coin";
import { FavoriteIcon } from "@/components/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MarketGridTradePrice from "./market-grid-trade-price";
import {
  getDisplayAccTradePrice,
  getDisplayAccTradePriceByKRW,
  getDisplayPrice,
} from "@/utils/currency";
import { useCoinData } from "@/context/coin-data-context";
import Hangul from "hangul-js";
import { useMemo, useState } from "react";
import Loading from "@/app/loading";
import { useLocale, useTranslations } from "next-intl";

export default function MarketGridCoins({
  markets,
  currencyTypeCode,
  searchKeyword,
  sortBy = "acc_trade_price_24h",
}: {
  markets: string;
  currencyTypeCode: string;
  searchKeyword: string;
  sortBy?: string;
}) {
  const [isEmpty, setIsEmpty] = useState(false);
  const { coins, BTCtoKRW, isLoading } = useCoinData();
  const currMarket = useSearchParams().get("market");
  const t = useTranslations("MarketGrid");
  const locale = useLocale();

  const allMarkets = useMemo(() => {
    return Markets.fromObject(JSON.parse(markets).markets);
  }, [markets]);
  const displayMarkets = useMemo(() => {
    return allMarkets.findMarketByCurrencyType(currencyTypeCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMarkets]);

  const sortedDisplayMarkets = useMemo(() => {
    if (!coins) return displayMarkets;
    return displayMarkets.sort(
      (a, b) =>
        (coins?.[b.market]?.[sortBy] as number) -
        (coins?.[a.market]?.[sortBy] as number)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayMarkets, coins, sortBy]);

  const isDisplay = useMemo(() => {
    let isEmpty = true;
    const res = displayMarkets.reduce((acc, market) => {
      const searchInitials = Hangul.disassemble(searchKeyword).join("");
      const koreanNames = Hangul.disassemble(market.korean_name).join("");
      const regex = new RegExp(searchKeyword.split("").join(".*"), "i");
      const isMatch =
        koreanNames.includes(searchInitials) ||
        regex.test(market.market) ||
        regex.test(market.english_name);

      acc[market.market] = isMatch;
      if (isMatch) isEmpty = false;
      return acc;
    }, {} as { [market: string]: boolean });
    setIsEmpty(isEmpty);
    return res;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  if (!coins || isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-2 mt-40">
        <Loading></Loading>
        {isLoading && (
          <div className="text-gray-500 text-sm">
            업비트 Open API 정책으로 인한 대기중...(rate limit : 10sec)
          </div>
        )}
      </div>
    );
  }

  if (searchKeyword !== "" && isEmpty) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-2 mt-40">
        <h2 className="text-gray-500 text-xs">{`${currencyTypeCode} 마켓에서는 검색된 코인이 없습니다.`}</h2>
      </div>
    );
  }

  return (
    <>
      {sortedDisplayMarkets.map((market: Market, index) => {
        const coin = coins ? coins[market.market] : new Coin();
        if (!coin) return null;
        return (
          <Link key={index} href={`/exchange?market=${market.market}`}>
            <div
              className={
                "flex flex-row items-center px-3 border-t h-[45px] hover:bg-gray-100 w-full " +
                (currMarket === market.market ? " bg-gray-100" : "") +
                (isDisplay[market.market] ? "" : " hidden")
              }
            >
              <div className="flex flex-row items-center justify-start gap-1 basis-[30px]">
                <div>
                  <FavoriteIcon></FavoriteIcon>
                </div>
                <div className="pr-1 w-4 text-center">
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
                  {coin.change == "EVEN" ? <p className="text-xs">-</p> : ""}
                </div>
              </div>
              <div className="text-left basis-[98px]">
                <h3 className="text-xs leading-[0.9rem] font-semibold">
                  {locale === "ko" ? market.korean_name : market.english_name}
                </h3>
                <h3 className="text-[0.65rem] leading-[0.9rem] text-gray-500">
                  {market.market}
                </h3>
              </div>
              <MarketGridTradePrice
                coinChange={coin.change}
                coinTradePrice={coin.trade_price}
                currencyTypeCode={currencyTypeCode}
              />
              <div
                className={
                  "text-[0.7rem] text-right flex flex-col justify-center basis-[62px]" +
                  (coin.change == "FALL" ? " text-green-700" : "") +
                  (coin.change == "RISE" ? " text-red-600" : "")
                }
              >
                <h3>{`${
                  (coin.signed_change_rate > 0 ? "+" : "") +
                  (coin.signed_change_rate * 100).toFixed(2)
                }%`}</h3>
                <h3 className={currencyTypeCode === "KRW" ? "block" : "hidden"}>
                  {getDisplayPrice(coin.signed_change_price, currencyTypeCode)}
                </h3>
              </div>

              <div className="flex flex-col items-end basis-[98px]">
                <h3
                  className={
                    (currencyTypeCode === "KRW" ? "hidden" : "block") +
                    " text-xs"
                  }
                >
                  {getDisplayAccTradePrice(
                    coin.acc_trade_price_24h,
                    currencyTypeCode
                  )}
                </h3>
                <div className="text-[0.7rem] flex flex-row justify-end gap-1">
                  {getDisplayAccTradePriceByKRW(
                    coin.acc_trade_price_24h,
                    currencyTypeCode,
                    BTCtoKRW,
                    t("million")
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
