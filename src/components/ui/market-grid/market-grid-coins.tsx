"use client";

import { useEffect, useState } from "react";
import { Market, Markets } from "@/model/market";
import { Coin, Coins } from "@/model/coin";
import { FavoriteIcon } from "@/components/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UpbitWsReqForm, useUpbitWebSocket } from "@/hooks/useUpbitWebSocket";
import { v4 as uuidv4 } from "uuid";
import MarketGridTradePrice from "./market-grid-trade-price";
import {
  getDisplayAccTradePrice,
  getDisplayAccTradePriceByKRW,
  getDisplayPrice,
} from "@/utils/currency";

export default function MarketGridCoins({
  markets,
  currencyTypeCode,
  BTCtoKRW,
  setBTCtoKRW,
}: {
  markets: string;
  currencyTypeCode: string;
  BTCtoKRW: number | undefined;
  setBTCtoKRW: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const [coins, setCoins] = useState<Coins | null>(null);
  const currMarket = useSearchParams().get("market");
  const allMarkets = Markets.fromObject(JSON.parse(markets).markets);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        `https://api.upbit.com/v1/ticker/all?quote_currencies=${currencyTypeCode}`
      );
      const coinData = Coins.fromDTO(await res.json());
      setCoins(coinData);
      
      if(currencyTypeCode === "KRW"){
        setBTCtoKRW(coinData.findCoin("KRW-BTC").tradePrice);
      }
    };

    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upbitWsReqForm: UpbitWsReqForm = [
    { ticket: uuidv4() },
    {
      type: "ticker",
      codes: allMarkets
        .findMarketByCurrencyType(currencyTypeCode)
        .map((a) => a.marketCode),
      is_only_realtime: true,
    },
  ];

  const onmsgHandlerKRW = (event: MessageEvent) => {
    try {
      event.data.text().then((data: string) => {
        const newCoin: Coin | undefined = Coin.fromWsDTO(JSON.parse(data));
        setCoins((prevCoins) => {
          if (!prevCoins) return prevCoins;
          return prevCoins.updateCoin(newCoin);
        });
        if(newCoin.market === "KRW-BTC"){
          setBTCtoKRW(newCoin.tradePrice)
        }
      });
    } catch (error) {
      console.error("Error during data parse:", error);
    }
  };

  const onmsgHandlerElse = (event: MessageEvent) => {
    try {
      event.data.text().then((data: string) => {
        const newCoin: Coin | undefined = Coin.fromWsDTO(JSON.parse(data));
        setCoins((prevCoins) => {
          if (!prevCoins) return prevCoins;
          return prevCoins.updateCoin(newCoin);
        });
      });
    } catch (error) {
      console.error("Error during data parse:", error);
    }
  };

  useUpbitWebSocket(
    "wss://api.upbit.com/websocket/v1",
    upbitWsReqForm,
    currencyTypeCode === "KRW" ? onmsgHandlerKRW : onmsgHandlerElse
  );
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
                <MarketGridTradePrice
                  coinChange={coin.change}
                  coinTradePrice={coin.tradePrice}
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
                    (coin.signedChangeRate > 0 ? "+" : "") +
                    (coin.signedChangeRate * 100).toFixed(2)
                  }%`}</h3>
                  <h3
                    className={currencyTypeCode === "KRW" ? "block" : "hidden"}
                  >
                    {getDisplayPrice(coin.signedChangePrice, currencyTypeCode)}
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
                      coin.accTradePrice24h,
                      currencyTypeCode
                    )}
                  </h3>
                  <div className="text-[0.7rem] flex flex-row justify-end">
                    {getDisplayAccTradePriceByKRW(
                      coin.accTradePrice24h,
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
