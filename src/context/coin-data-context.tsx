"use client";

import { v4 as uuidv4 } from "uuid";
import { UpbitWsReqForm, useUpbitWebSocket } from "@/hooks/useUpbitWebSocket";
import { Coin } from "@/model/coin";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { markets } from "@/data/sample-data";

interface coinDataContextProps {
  coins: { [market: string]: Coin } | undefined;
  BTCtoKRW: number;
  coinByMarket: (market: string) => Coin | undefined;
  isLoading: boolean;
}

const coinDataContext = createContext<coinDataContextProps | undefined>(
  undefined
);

export const CoinDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [coins, setCoins] = useState<{ [market: string]: Coin }>();
  const [BTCtoKRW, setBTCtoKRW] = useState<number>(0);
  const [upbitWsReqForm] = useState<UpbitWsReqForm>([
    { ticket: uuidv4() },
    {
      type: "ticker",
      codes: markets,
    },
  ]);
  const queueRef = useRef<Coin[]>([]);

  const onmsgHandler = useCallback((event: MessageEvent) => {
    try {
      event.data.text().then((data: string) => {
        const newCoin = Coin.fromWsDTO(JSON.parse(data));

        queueRef.current.push(newCoin);

        if (newCoin.market === "KRW-BTC") {
          setBTCtoKRW(newCoin.trade_price);
        }
      });
    } catch (error) {
      console.error("Error during data parse:", error);
    }
  }, []);

  const isLoading = useUpbitWebSocket(
    "wss://api.upbit.com/websocket/v1",
    upbitWsReqForm,
    onmsgHandler,
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (queueRef.current.length > 0) {
        const newCoins: Coin[] = queueRef.current;
        queueRef.current = [];
        setCoins((prevCoins) => {
          const updatedCoins = { ...prevCoins };
          newCoins.forEach((newCoin) => {
            updatedCoins[newCoin.market] = newCoin;
          });
          return updatedCoins;
        });
      }
    }, 200);

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트되면 interval 정리
  }, []);

  const coinByMarket = (market: string) => {
    return coins ? coins[market] : undefined;
  };

  return (
    <coinDataContext.Provider
      value={{
        coins,
        BTCtoKRW,
        coinByMarket,
        isLoading,
      }}
    >
      {children}
    </coinDataContext.Provider>
  );
};

export const useCoinData = () => {
  const context = useContext(coinDataContext);
  if (!context) {
    throw new Error("useCoinData must be used within a CoinDataProvider");
  }
  return context;
};
