import { Logo } from "@/components/icons";
import Link from "next/link";
import NavLink from "@/components/ui/nav-link";
import AuthButton from "@/components/ui/auth-button";

export default function Header() {
  return (
    <header className="fixed flex items-center z-10 w-full bg-blue-900 h-12 py-8 justify-between px-10">
      <Link className="grow-0" href="/">
        <Logo></Logo>
      </Link>
      <div className="grow flex flex-row gap-10 items-center justify-center text-slate-400 font-semibold">
        <NavLink href="/exchange">거래소</NavLink>
        <NavLink href="/balances">입출금</NavLink>
        <NavLink href="/investments">투자내역</NavLink>
      </div>
      <div className="grow flex flex-row gap-5 items-center justify-end text-sm text-white font-bold">
        <AuthButton></AuthButton>
      </div>
    </header>
  );
}
