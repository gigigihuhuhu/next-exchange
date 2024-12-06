"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={isActive ? "text-white font-extrabold" : "text-slate-400"}
    >
      {children}
    </Link>
  );
}
