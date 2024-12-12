import LwWidget from "@/components/ui/coin-info/lw-widget";
import CoinInfo from "@/components/ui/coin-info/coin-info";
import Notice from "@/components/ui/coin-info/notice";

import { Market, Markets } from "@/model/market";
import { MarketGrid } from "@/components/ui/market-grid/market-grid";

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
  const marketParam: string | undefined = (
    await searchParams
  )?.market?.toString();
  const allMarkets = Markets.fromDTO(await fetchMarkets());

  const coinInfoMarket =
    allMarkets.findMarket(
      marketParam ?? Market.getDefaultMarket().marketCode
    ) ?? Market.getDefaultMarket();

  return (
    <div className="p-2 flex flex-row gap-2">
      <div className="min-w-[900px] flex flex-col gap-2 flex-grow">
        <Notice className="bg-white"></Notice>
        <div>
          <div className="bg-white">
            <CoinInfo market={JSON.stringify(coinInfoMarket)}></CoinInfo>
          </div>
          <div className="bg-white h-[450px]">
            <LwWidget></LwWidget>
          </div>
        </div>
      </div>
      <div className="min-w-[400px] max-w-[400px] overflow-y-scroll bg-white">
        <MarketGrid markets={JSON.stringify(allMarkets)}></MarketGrid>
      </div>
    </div>
  );
}
