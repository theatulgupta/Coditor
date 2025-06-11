import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = {
  width?: number;
  height?: number;
};

const Logo = ({ width = 120, height = 50 }: LogoProps) => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-bold cursor-pointer"
    >
      <span className="flex items-center justify-center text-gray-800 dark:text-white pb-[1px]">
        &lt;
      </span>
      <span className="text-primary">Coditor</span>
      <span className="flex items-center justify-center text-gray-800 dark:text-white pb-[1px]">
        /&gt;
      </span>
    </Link>
  );
};

export default Logo;
