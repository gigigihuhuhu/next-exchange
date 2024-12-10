import LwWidget from "@/components/ui/lw-widget";
import CoinInfo from "@/components/ui/coin-info";
import Notice from "@/components/ui/notice";

import { Market, Markets } from "@/model/market";

async function fetchMarkets() {
  const res = await fetch("https://api.upbit.com/v1/market/all", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export default async function Exchange({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const marketParam: string =
    (await searchParams)?.market?.toString() || "KRW-BTC";
  const allMarkets = new Markets(await fetchMarkets());
  const market =
    allMarkets.findMarket(marketParam) ?? Market.getDefaultMarket();

  return (
    <div className="bg-gray-200 grid grid-cols-3 gap-2 py-2">
      <div className="col-span-2 flex flex-col gap-2">
        <Notice className="bg-white"></Notice>
        <div>
          <div className="bg-white">
            <CoinInfo
              marketCode={market.marketCode}
              koreanName={market.koreanName}
              englishName={market.englishName}
            ></CoinInfo>
          </div>
          <div className="bg-white h-[450px]">
            <LwWidget></LwWidget>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-white h-[50px]"></div>
            <div className="bg-white h-[50px]"></div>
          </div>
        </div>
        <div className="bg-white h-[50px]"></div>
      </div>
      <div className="bg-white col-span-1"></div>
    </div>
  );
}
