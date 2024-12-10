import { redirect } from "next/navigation";
export default function Home() {
  const defaultMarket = "KRW-BTC";
  redirect(`/exchange?code=${defaultMarket}`);
}
