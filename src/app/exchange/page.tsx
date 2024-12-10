import LwWidget from "@/components/ui/lw-widget";
import CoinInfo from "@/components/ui/coin-info";

export default function Exchange() {
  return (
    <div className="bg-gray-200 grid grid-cols-3 gap-2 py-2">
      <div className="col-span-2 flex flex-col gap-2">
        <div className="bg-white h-[50px]"></div>
        <div>
          <div className="bg-white">
            <CoinInfo></CoinInfo>
          </div>
          <div className="bg-white h-[400px]">
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
