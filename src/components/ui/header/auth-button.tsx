"use client";
import { useAuth } from "@/context/auth-context";
import { useTranslations } from "next-intl";

export default function AuthButton() {
  const { authenticated, user, keycloak } = useAuth();
  const t = useTranslations("Auth");

  if (authenticated == null) {
    return <p className="w-[250px]"></p>;
  }
  if (authenticated) {
    return (
      <div className="w-[250px] flex flex-row justify-end gap-4 text-sm text-white font-bold">
        <p>{t("welcome", { name: user?.name })}</p>
        <button onClick={() => keycloak.logout()}>{t("logout")}</button>
      </div>
    );
  } else {
    return (
      <div className="w-[250px] flex flex-row justify-end gap-4 text-sm text-white font-bold">
        <button onClick={() => keycloak.login()}>{t("login")}</button>
        <button onClick={() => keycloak.register()}>{t("register")}</button>
      </div>
    );
  }
}
