"use client";

import { v4 as uuidv4 } from "uuid";
import { UpbitWsReqForm, useUpbitWebSocket } from "@/hooks/useUpbitWebSocket";
import { Coin, Coins } from "@/model/coin";
import { createContext, useContext, useState } from "react";
import { markets } from "@/data/sample-data";

interface coinDataContextProps {
  coins: Coins | null;
  BTCtoKRW: number;
}

const coinDataContext = createContext<coinDataContextProps | undefined>(
  undefined
);

export const CoinDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [coins, setCoins] = useState<Coins>(new Coins({}));
  const [BTCtoKRW, setBTCtoKRW] = useState<number>(0);
  const upbitWsReqForm: UpbitWsReqForm = [
    { ticket: uuidv4() },
    {
      type: "ticker",
      codes: markets,
    },
  ];

  const onmsgHandler = (event: MessageEvent) => {
    try {
      event.data.text().then((data: string) => {
        const newCoin = Coin.fromWsDTO(JSON.parse(data));
        setCoins((prevCoins) => {
          return prevCoins.updateCoin(newCoin);
        });
  
        if (newCoin.market === "KRW-BTC") {
          setBTCtoKRW(newCoin.trade_price);
        }
      });
    } catch (error) {
      console.error("Error during data parse:", error);
    }
  };

  useUpbitWebSocket(
    "wss://api.upbit.com/websocket/v1",
    upbitWsReqForm,
    onmsgHandler,
    []
  );

  return (
    <coinDataContext.Provider
      value={{
        coins,
        BTCtoKRW,
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
