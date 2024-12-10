import { GetStaticProps } from "next";

import LwWidget from "@/components/ui/lw-widget";
import CoinInfo from "@/components/ui/coin-info";
import Notice from "@/components/ui/notice";

export default async function Exchange({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const market: string = (await searchParams)?.market?.toString() || "KRW-BTC";

  return (
    <div className="bg-gray-200 grid grid-cols-3 gap-2 py-2">
      <div className="col-span-2 flex flex-col gap-2">
        <Notice className="bg-white"></Notice>
        <div>
          <div className="bg-white">
            <CoinInfo market={market}></CoinInfo>
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
