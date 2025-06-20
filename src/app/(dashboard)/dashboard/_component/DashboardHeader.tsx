"use client";

import Logo from "@/components/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { SidebarTrigger, TriggerMenu } from "@/components/ui/sidebar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSession, signOut } from "next-auth/react";
import React from "react";

const DashboardHeader: React.FC = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const name = session?.user?.name ?? "User";
  const image = session?.user?.image ?? "";
  const email = session?.user?.email ?? "";

  // Helper for avatar fallback initials
  const renderAvatarFallback = (userName: string) =>
    userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  // Shimmer placeholder component
  const Shimmer = ({ className }: { className?: string }) => (
    <div
      className={`bg-gray-300 rounded-md animate-pulse ${className ?? ""}`}
    />
  );

  return (
    <header className="bg-white h-16 flex items-center justify-between px-4 gap-4 sticky top-0 z-50 border-b">
      {/* Left: Logo (visible only on small screens) */}
      <div className="md:hidden">
        <Logo width={40} />
      </div>

      {/* Center: Greeting message */}
      <div className="flex flex-grow items-center">
        <div className="hidden sm:block text-sm font-medium text-gray-700 truncate">
          <span className="text-gray-500">Hi, welcome </span>
          <span className="font-semibold">{name}</span>
        </div>

        {/* Right aligned: SidebarTrigger on md and smaller, Avatar on larger */}
        <div className="ml-auto flex items-center">
          {/* Avatar visible on larger screens */}
          <div className="hidden md:block">
            <Popover>
              <PopoverTrigger asChild aria-label="User menu">
                {isLoading ? (
                  <Shimmer className="h-10 w-10 rounded-full" />
                ) : (
                  <Avatar className="h-10 w-10 shadow-md cursor-pointer">
                    {image ? (
                      <AvatarImage src={image} alt={name} />
                    ) : (
                      <AvatarFallback>
                        {renderAvatarFallback(name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                )}
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-52 p-3 rounded-md shadow-md border bg-white"
              >
                <div className="flex items-center gap-4">
                  {isLoading ? (
                    <Shimmer className="h-10 w-10 rounded-full" />
                  ) : (
                    <Avatar className="h-10 w-10 ring-1 ring-gray-200">
                      {image ? (
                        <AvatarImage src={image} alt={name} />
                      ) : (
                        <AvatarFallback>
                          {renderAvatarFallback(name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  )}

                  <div className="flex-1 min-w-0">
                    {isLoading ? (
                      <>
                        <Shimmer className="h-4 w-24 mb-1 rounded" />
                        <Shimmer className="h-3 w-32 rounded" />
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium truncate">{name}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {email}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  {isLoading ? (
                    <Shimmer className="h-8 w-full rounded" />
                  ) : (
                    <Button
                      variant="destructive"
                      className="w-full text-sm"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Sidebar Trigger visible md and smaller */}
          <div className="block md:hidden">
            <TriggerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
