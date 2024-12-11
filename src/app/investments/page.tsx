"use client";

import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function Investments() {
  const { keycloak } = useAuth();
  if (!keycloak.authenticated) {
    if (keycloak.didInitialize) {
      keycloak.login();
    } else {
      redirect("/");
    }
    return "Redirecting to login...";
  } else {
    return (
      <>
        <h1>Investments</h1>
      </>
    );
  }
}
