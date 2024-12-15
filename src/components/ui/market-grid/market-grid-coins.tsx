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

export default function MarketGridCoins({
  markets,
  currencyTypeCode,
}: {
  markets: string;
  currencyTypeCode: string;
}) {
  const { coins, BTCtoKRW } = useCoinData();
  const currMarket = useSearchParams().get("market");
  const allMarkets = Markets.fromObject(JSON.parse(markets).markets);

  return (
    <>
      {allMarkets
        .findMarketByCurrencyType(currencyTypeCode)
        .map((market: Market, index) => {
          const coin: Coin = coins?.findCoin(market.marketCode) ?? new Coin();
          return (
            <Link key={index} href={`/exchange?market=${market.marketCode}`}>
              <div
                className={
                  "flex flex-row items-center px-3 border-t h-[45px] hover:bg-gray-100 w-full " +
                  (currMarket === market.marketCode ? " bg-gray-100" : "")
                }
              >
                <div className="flex flex-row items-center justify-start gap-1 basis-[30px]">
                  <div>
                    <FavoriteIcon></FavoriteIcon>
                  </div>
                  <div className="pr-1">
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
                <MarketGridTradePrice
                  coinChange={coin.change}
                  coinTradePrice={coin.trade_price}
                  currencyTypeCode={currencyTypeCode}
                  BTCtoKRW={BTCtoKRW}
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
                  <h3
                    className={currencyTypeCode === "KRW" ? "block" : "hidden"}
                  >
                    {getDisplayPrice(
                      coin.signed_change_price,
                      currencyTypeCode
                    )}
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
                      BTCtoKRW
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
