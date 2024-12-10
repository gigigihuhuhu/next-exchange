"use client";

import React, { useEffect, useRef, memo } from "react";

function Minichart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current?.querySelector("script")) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
              {
        "symbol": "UPBIT:BTCKRW",
        "locale": "kr",
        "dateRange": "1M",
        "colorTheme": "light",
        "isTransparent": false,
        "autosize": false,
        "largeChartUrl": "#",
        "chartOnly": true,
        "noTimeScale": true
      }`;
    container.current?.appendChild(script);
  }, []);

  return (
    <div className="h-[50px] w-[150px] overflow-hidden relative">
      <div
        className="tradingview-widget-container absolute left-[-2px] top-[-2px] h-[55px] w-[200px] pointer-events-none"
        ref={container}
      >
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(Minichart);
