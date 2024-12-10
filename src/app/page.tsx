import { permanentRedirect } from "next/navigation";
export default function Home() {
  const defaultMarket = "KRW-BTC";
  permanentRedirect(`/exchange?market=${defaultMarket}`);
}
