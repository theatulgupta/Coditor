"use client";
import React from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Folder, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import CreateNewProject from "./CreateNewProject";
import useUserProjects from "../_hooks/useUserProjects";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const name = session?.user?.name ?? "User";
  const image = session?.user?.image ?? "";
  const email = session?.user?.email ?? "";

  const isLoading = status === "loading";

  const rawProjects = useUserProjects();
  const recentProjects = rawProjects.map((p) => ({
    name: p.name,
    link: `/editor/${p.link.split("/").pop()}?file=index.html`,
  }));

  const isActive = (link: string) => pathname === link;

  // Helper: Render avatar fallback initials
  const renderAvatarFallback = (userName: string) => {
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Shimmer placeholder component
  const Shimmer = ({ className }: { className: string }) => (
    <div className={`bg-gray-300 rounded-md animate-pulse ${className}`} />
  );

  return (
    <Sidebar className="overflow-hidden bg-white border-r h-screen flex flex-col justify-between">
      <div className="flex flex-col px-4 pt-4 flex-none">
        <SidebarHeader className="items-start mb-4">
          <Logo width={100} />
        </SidebarHeader>

        <SidebarSeparator />
      </div>

      <SidebarContent className="flex flex-col items-start space-y-4 px-4 overflow-y-auto flex-grow">
        <CreateNewProject />

        <SidebarMenu className="w-full">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 px-2 py-2 text-sm font-medium rounded w-full
                ${
                  isActive("/dashboard")
                    ? "bg-primary/20 text-primary"
                    : "text-gray-700 hover:bg-primary/10"
                }`}
          >
            <LayoutDashboard
              className={`w-4 h-4 ${
                isActive("/dashboard") ? "text-primary" : "text-gray-400"
              }`}
            />
            Dashboard
          </Link>
        </SidebarMenu>

        <SidebarGroup className="w-full">
          <SidebarGroupLabel className="uppercase text-xs text-gray-500 mb-2">
            Recent Projects
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-2 py-2 rounded w-full"
                    >
                      <div className="h-4 w-4 bg-gray-300 rounded animate-pulse" />
                      <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
                    </div>
                  ))
                : recentProjects.map((project, idx) => {
                    const active = isActive(project.link);
                    return (
                      <Link
                        key={idx}
                        href={project.link}
                        className={`flex items-center gap-2 px-2 py-2 text-sm rounded w-full
                            ${
                              active
                                ? "bg-primary/20 text-primary"
                                : "text-gray-700 hover:bg-primary/10"
                            }`}
                      >
                        <Folder
                          className={`w-4 h-4 ${
                            active ? "text-primary" : "text-gray-400"
                          }`}
                        />
                        {project.name}
                      </Link>
                    );
                  })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* Bottom user info section moved inside */}
      <div className="w-full border-t px-6 py-3 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 w-full max-w-xs ">
          {isLoading ? (
            <Shimmer className="h-11 w-11 rounded-full" />
          ) : (
            <Avatar className="h-11 w-11 ring-1 ring-gray-200 shadow-sm">
              {image ? (
                <AvatarImage src={image} alt={name} />
              ) : (
                <AvatarFallback>{renderAvatarFallback(name)}</AvatarFallback>
              )}
            </Avatar>
          )}

          <div className="flex-1 min-w-0">
            {isLoading ? (
              <>
                <Shimmer className="h-5 w-32 mb-2 rounded" />
                <Shimmer className="h-4 w-40 rounded" />
              </>
            ) : (
              <>
                <p className="text-base font-semibold truncate">{name}</p>
                <p className="text-sm text-gray-500 truncate">{email}</p>
              </>
            )}
          </div>
        </div>

        <div className="w-full max-w-xs">
          {isLoading ? (
            <Shimmer className="h-10 w-full rounded" />
          ) : (
            <Button
              variant="destructive"
              className="w-full text-sm font-semibold cursor-pointer"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
