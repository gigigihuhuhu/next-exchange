"use client";

import { useAuth } from "@/context/auth-context";

export default function Investments() {
  const { authenticated, login } = useAuth();
  if (!authenticated) {
    login();
    return "redirecting...";
  }
  return (
    <>
      <h1>investments</h1>
    </>
  );
}
