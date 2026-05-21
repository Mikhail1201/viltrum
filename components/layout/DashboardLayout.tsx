// components/layout/DashboardLayout.tsx

"use client";

import { ReactNode, useEffect, useState } from "react";

import Sidebar from "./sidebar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {
  const [role, setRole] = useState("estudiante");

  useEffect(() => {
    const savedRole =
      localStorage.getItem("role");

    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#eef4ff]">
      <Sidebar role={role} />

      <main className="ml-[290px] flex-1 overflow-x-auto p-8">
        {children}
      </main>
    </div>
  );
}