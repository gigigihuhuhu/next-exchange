"use client";

import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function Balances() {
  const { keycloak } = useAuth();
  if (!keycloak.authenticated) {
    if (keycloak.didInitialize) {
      keycloak.login();
    } else {
      redirect("/");
    }
    return (<></>);
  } else {
    return (
      <>
        <h1>Balances</h1>
      </>
    );
  }
}
