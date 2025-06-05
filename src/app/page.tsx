"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-100 overflow-hidden">
      <div className="container px-4 mx-auto">
        <header className="h-20 flex items-center justify-between gap-4">
          <Logo width={120} height={50} />
          <nav>
            <Button className="cursor-pointer">Login</Button>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center min-h-[75vh] ">
          {/* Typing Animation Text */}
          <div className="flex flex-col gap-5 px-4 text-center font-bold text-5xl md:text-6xl lg:text-7xl">
            <h1 className="text-primary">Build Space</h1>
            <div className="mx-auto">
              <TypeAnimation
                sequence={[
                  "Code Smarter.",
                  1500,
                  "Powered by AI.",
                  1500,
                  "Collaborate in Real-Time.",
                  1500,
                  "Welcome to Coditor.",
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </div>

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
