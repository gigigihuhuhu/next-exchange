"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface MarketGridLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export default function MarketGridLink({
  href,
  children,
  ...props
}: MarketGridLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === (typeof href === "string" ? href : href.pathname);

  return (
    <Link
      href={href}
      {...props}
      className={isActive ? "bg-gray-100" : ""}
    >
      {children}
    </Link>
  );
}
