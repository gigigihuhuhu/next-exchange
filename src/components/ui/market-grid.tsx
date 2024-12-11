"use client";

import { useState } from "react";
import { Markets } from "@/model/market";

export function MarketGrid({markets}: {markets: string}) {
  const [activeTab, setActiveTab] = useState(0);

  const buttons = ["원화", "BTC", "USDT"];
  const allMarkets = new Markets(JSON.parse(markets));

  return (
    <div>
      <div className="flex flex-row items-start justify-between *:w-full *:font-semibold *:py-1 *:transition-colors *:duration-200">
        {buttons.map((button, index) => {
          return (
            <button key={index}
              className={
                activeTab === index
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "hover:border-b-4 hover:border-gray-400"
              }
              onClick={() => setActiveTab(index)}
            >
              {button}
            </button>
          );
        })}
      </div>
      <div>
        
      </div>
    </div>
  );
}
