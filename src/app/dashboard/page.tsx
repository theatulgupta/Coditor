"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Button className="cursor-pointer" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
