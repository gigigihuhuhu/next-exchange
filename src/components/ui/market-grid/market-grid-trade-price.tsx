import useDidMountEffect from "@/hooks/useDidMountEffect";
import { useRef, useState } from "react";
import style from "./market-grid.module.css";
import { getDisplayPrice } from "@/utils/currency";

export default function MarketGridTradePrice({
  coinChange,
  coinTradePrice,
  currencyTypeCode,
}: {
  coinChange: string;
  coinTradePrice: number;
  currencyTypeCode: string;
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
      className={
        "border-transparent border box-border place-content-center h-full text-right basis-[94px] " +
        (coinChange == "FALL" ? " text-green-700" : "") +
        (coinChange == "RISE" ? " text-red-600" : "")
      }
    >
      <h1 className="text-xs font-bold">{displayPrice}</h1>
    </div>
  );
}
