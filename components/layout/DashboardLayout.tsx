"use client";

import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {
  const role = "admin";

  return (
    <div className="flex min-h-screen bg-[#eef4ff]">
      <Sidebar role={role} />

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}