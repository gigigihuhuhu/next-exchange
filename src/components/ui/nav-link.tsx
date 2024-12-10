"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export default function NavLink({
  href,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === (typeof href === "string" ? href : href.pathname);

  return (
    <Link
      href={href}
      {...props}
      className={isActive ? "text-white font-extrabold" : "text-slate-400"}
    >
      {children}
    </Link>
  );
}
