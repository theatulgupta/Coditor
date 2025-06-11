"use client";

import Logo from "@/components/Logo";
import TypingAnimation from "@/components/TypingAnimation";
import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen max-h-screen h-full">
      {/* Animation */}
      <div className="hidden lg:flex flex-col p-10 bg-primary/15">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex flex-col justify-center h-[100vh h-full ">
          <TypingAnimation
            className="min-h-[40vh] mx-2"
            phrases={[
              "Welcome back!",
              "Login/SignUp to continue coding.",
              "Your code, your space.",
              "Secure. Fast. Reliable.",
            ]}
          />
        </div>
      </div>

      <div className="h-full flex flex-col mt-14 lg:mt-0 lg:justify-center px-4 lg:p-6 overflow-auto items-center">
        {children}
      </div>
    </div>
  );
}
