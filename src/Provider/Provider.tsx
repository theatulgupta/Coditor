"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

type ProviderProps = {
  children: React.ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
