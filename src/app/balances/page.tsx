"use client";

import { useAuth } from "@/context/auth-context";

export default function Balances() {
  const { authenticated, login } = useAuth();
  if(!authenticated){
    login();
    return "redirecting...";
  }
  return (
    <>
      <h1>Balances</h1>
    </>
  );
}
