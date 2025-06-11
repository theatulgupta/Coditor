"use client";

import Logo from "@/components/Logo";
import TypingAnimation from "@/components/TypingAnimation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-100 overflow-hidden">
      <div className="container px-4 mx-auto">
        <header className="h-20 flex items-center justify-between gap-4">
          <Logo />
          <nav>
            <Button
              onClick={() => router.push("/login")}
              className="cursor-pointer text-lg px-4 py-2 font-semibold"
            >
              Login
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center min-h-[75vh] ">
          {/* Typing Animation Text */}
          <TypingAnimation
            phrases={[
              "Code Smarter.",
              "Powered by AI.",
              "Collaborate in Real-Time.",
              "Welcome to Coditor.",
            ]}
          />

          {/* Landing Image */}
          <div className="mt-10 mx-auto">
            <Image
              src="/banner.png"
              alt="Landing banner"
              width={1920}
              height={1080}
              className="rounded-lg shadow-lg object-contain"
              priority
            />
          </div>
        </main>

        <footer className="absolute bottom-0 left-0 right-0 mt-20 mb-10 text-center text-gray-500 text-md">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-primary cursor-pointer font-semibold">
            Coditor.
          </span>{" "}
          All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
