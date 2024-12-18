import { Logo } from "@/components/icons";
import Link from "next/link";
import NavLink from "@/components/ui/header/nav-link";
import AuthButton from "@/components/ui/header/auth-button";
import { useTranslations } from "next-intl";
import LocaleButtons from "./locale-buttons";

export default function Header() {
  const t = useTranslations("Header");
  const defaultMarket = "KRW-BTC";

  return (
    <header className="min-w-[1324px] fixed flex items-center z-10 w-full bg-blue-900 h-12 py-8 justify-between px-10">
      <Link className="grow-0" href="/">
        <Logo></Logo>
      </Link>
      <div className="grow flex flex-row gap-10 items-center justify-center text-slate-400 font-semibold">
        <NavLink
          href={{ pathname: "/exchange", query: { market: defaultMarket } }}
        >
          {t("exchange")}
        </NavLink>
        <NavLink href="/balances">{t("balances")}</NavLink>
        <NavLink href="/investments">{t("investments")}</NavLink>
      </div>
      <div className="grow flex flex-row gap-6 items-center justify-end">
        <AuthButton></AuthButton>
        <LocaleButtons></LocaleButtons>
      </div>
    </header>
  );
}
