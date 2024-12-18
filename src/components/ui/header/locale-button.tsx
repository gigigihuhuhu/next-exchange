"use client";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export default function LocaleButton({
  label,
  locale,
}: {
  label: string;
  locale: Locale;
}) {
  const currLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const onClick = (selectedLocale: Locale) => {
    if (currLocale === selectedLocale) return;
    startTransition(() => {
      return new Promise((resolve)=>{
        setUserLocale(selectedLocale).then(() => resolve());
      });
    });
  };

  return (
    <button
      onClick={() => onClick(locale)}
      className={`font-bold ${isPending && "pointer-events-none"} ${currLocale === locale ? "text-white" : "text-slate-400"}`}
    >
      {label}
    </button>
  );
}
