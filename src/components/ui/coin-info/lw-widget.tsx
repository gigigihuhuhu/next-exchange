"use client";
import { Market } from "@/model/market";
import { useLocale } from "next-intl";
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget({ market }: { market: string }) {
  const locale = useLocale();
  const container = useRef<HTMLDivElement>(null);

  const parsedMarket = Market.fromObject(JSON.parse(market));
  useEffect(() => {
    if (container.current?.querySelector("script")) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "UPBIT:${
            parsedMarket.coinCode() + parsedMarket.currencyType()
          }",
          "timezone": "Asia/Seoul",
          "theme": "light",
          "style": "1",
          "locale": "${locale === "ko" ? 'kr' : 'en'}",
          "withdateranges": true,
          "range": "YTD",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    container.current?.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
