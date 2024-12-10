"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Coin } from "@/model/coin";
import { SettingsIcon } from "@/components/icons";
import MiniChart from "@/components/ui/lw-minichart";

type CoinInfoProps = {
  marketCode: string;
  koreanName: string;
  englishName: string;
};

const CoinInfo = ( market : CoinInfoProps) => {
  const [data, setData] = useState<Coin | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.upbit.com/v1/ticker?markets=${market.marketCode}`
      );
      const result = await res.json();
      setData(Coin.fromApiData(result[0]));
    };

    const interval = parseInt(process.env.POLLING_INTERVAL || "10000", 10);

    fetchData();

    const fetchInterval = setInterval(() => {
      fetchData();
    }, interval);

    return () => clearInterval(fetchInterval);
  }, [market]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[138px]">
      <div className="px-4 flex flex-row items-center justify-between border-b border-solid border-gray-200">
        <div className="flex flex-row items-center grow">
          <Image
            src={`https://cdn.kyungsu.com/samples/coin/${data.coinCode()}.png`}
            alt={data.coinCode()}
            width={26}
            height={26}
            priority
          ></Image>
          <h2 className="ml-2 text-xl font-bold">{`${market.koreanName}`}</h2>
          <h3 className="ml-1 text-xs text-gray-500 font-medium">{`${data.coinCode()}/${data.currencyType()}`}</h3>
        </div>

        <div className="*:w-32 *:text-lg *:font-bold *:py-1 *:transition-colors *:duration-200">
          <button
            className={
              activeTab === 0
                ? "text-blue-600 border-b-4 border-blue-600"
                : "hover:border-b-4 hover:border-gray-400"
            }
            onClick={() => setActiveTab(0)}
          >
            시세
          </button>
          <button
            className={
              activeTab === 1
                ? "text-blue-600 border-b-4 border-blue-600"
                : "hover:border-b-4 hover:border-gray-400 hover:text-gray-800"
            }
            onClick={() => setActiveTab(1)}
          >
            정보
          </button>
        </div>

        <div className="border-l border-gray-200">
          <button className="pt-3 pb-3 pl-4">
            <SettingsIcon></SettingsIcon>
          </button>
        </div>
      </div>
      <div className="relative">
        <div
          className={
            "w-full absolute overflow-hidden " +
            (activeTab === 0 ? "block" : "hidden")
          }
        >
          <div className="grid grid-cols-4 py-4 px-5 justify-items-stretch gap-6">
            <div
              className={
                "flex flex-col justify-center *:flex *:flex-row *:gap-2 *:items-end" +
                (data.change == "FALL" ? " text-green-600" : "") +
                (data.change == "RISE" ? " text-red-600" : "")
              }
            >
              <div>
                <h1 className="text-3xl font-bold">
                  {data.tradePrice.toLocaleString()}
                </h1>
                <h3 className="text-sm">{data.currencyType()}</h3>
              </div>
              <div>
                <h3>{`${
                  (data.signedChangeRate > 0 ? "+" : "") +
                  (data.signedChangeRate * 100).toFixed(2)
                }%`}</h3>
                <h3>{data.signedChangePrice.toLocaleString()}</h3>
              </div>
            </div>
            <div className="justify-self-end">
              <MiniChart></MiniChart>
            </div>
            <div className="flex flex-col *:flex *:flex-row *:justify-between *:items-center font-medium">
              <div className="">
                <h3 className="text-xs text-gray-700">고가</h3>
                <h3 className="font-semibold text-sm text-red-600">
                  {data.highPrice.toLocaleString()}
                </h3>
              </div>
              <hr className="my-2" />
              <div>
                <h3 className="text-xs text-gray-700">저가</h3>
                <h3 className="font-semibold text-sm text-green-600">
                  {data.lowPrice.toLocaleString()}
                </h3>
              </div>
            </div>

            <div className="flex flex-col *:flex *:flex-row *:justify-between *:items-center">
              <div className="font-medium">
                <h3 className="text-xs text-gray-700">거래량(24h)</h3>
                <div className="flex flex-row gap-1 items-center">
                  <h3 className="text-sm">
                    {data.accTradeVolume24h.toLocaleString()}
                  </h3>
                  <h4 className="text-xs text-gray-500">{data.coinCode()}</h4>
                </div>
              </div>
              <hr className="my-2" />
              <div>
                <h3 className="font-medium text-xs text-gray-700">
                  거래대금(24h)
                </h3>
                <div className="text-xs flex flex-row gap-1 items-center">
                  <h3>
                    {parseInt(
                      data.accTradePrice24h.toFixed(0)
                    ).toLocaleString()}
                  </h3>
                  <h4 className="text-gray-500">{data.currencyType()}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"absolute " + (activeTab === 1 ? "block" : "hidden")}>
          <p>not yet implemented</p>
        </div>
      </div>
    </div>
  );
};

export default CoinInfo;
