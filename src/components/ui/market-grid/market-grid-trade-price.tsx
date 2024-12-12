import useDidMountEffect from "@/hooks/useDidMountEffect";
import { useRef, useState } from "react";
import style from "./market-grid.module.css";
import { getDisplayPrice, getDisplayPriceByKRW } from "@/utils/currency";

export default function MarketGridTradePrice({
  coinChange,
  coinTradePrice,
  currencyTypeCode,
  BTCtoKRW,
}: {
  coinChange: string;
  coinTradePrice: number;
  currencyTypeCode: string;
  BTCtoKRW: number | undefined;
}) {
  const [displayPrice, setDisplayPrice] = useState<string>("-");
  const [price, setPrice] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useDidMountEffect(() => {
    setDisplayPrice((prevPrice) => {
      if (prevPrice === "-") {
        setPrice(coinTradePrice);
        return getDisplayPrice(coinTradePrice, currencyTypeCode);
      }

      containerRef.current?.classList.remove(style["price-change-rise"]);
      containerRef.current?.classList.remove(style["price-change-fall"]);
      void containerRef.current?.offsetWidth;
      if (price < coinTradePrice) {
        containerRef.current?.classList.add(style["price-change-rise"]);
      } else if (price > coinTradePrice) {
        containerRef.current?.classList.add(style["price-change-fall"]);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        containerRef.current?.classList.remove(style["price-change-rise"]);
        containerRef.current?.classList.remove(style["price-change-fall"]);
      }, 1000);

      setPrice(coinTradePrice);
      return getDisplayPrice(coinTradePrice, currencyTypeCode);
    });
  }, [coinTradePrice]);

  return (
    <div
      ref={containerRef}
      className="border-transparent border box-border place-content-center h-full text-right basis-[94px] "
    >
      <h3
        className={
          "text-xs font-bold " +
          (coinChange == "FALL" ? " text-green-700" : "") +
          (coinChange == "RISE" ? " text-red-600" : "")
        }
      >
        {displayPrice}
      </h3>
      <div
        className={
          "flex flex-row justify-end gap-1 font-medium text-[0.7rem]" +
          (currencyTypeCode === "KRW" ? " hidden" : "")
        }
      >
        <h3>{getDisplayPriceByKRW(price, currencyTypeCode, BTCtoKRW)}</h3>
        <h4 className="font-medium text-gray-500">KRW</h4>
      </div>
    </div>
  );
}
