// components/layout/DashboardLayout.tsx

"use client";

import { ReactNode, useEffect, useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "./sidebar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [role, setRole] = useState("estudiante");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  // Cierra el sidebar si la pantalla pasa a desktop (≥768px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setSidebarOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#eef4ff]">
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Botón hamburguesa — solo visible en móvil */}
      <button
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menú"
        className="
          fixed top-4 left-4 z-30
          flex md:hidden
          h-11 w-11 items-center justify-center
          rounded-2xl
          bg-gradient-to-br from-cyan-400 to-blue-600
          text-white shadow-lg shadow-blue-300/40
          transition-transform duration-200 active:scale-95
        "
      >
        <Menu size={22} />
      </button>

      {/* Contenido principal */}
      <main
        className="
          flex-1 overflow-x-auto p-4 sm:p-6 md:p-8
          /* En desktop empuja el contenido para dejar espacio al sidebar fijo */
          md:ml-[290px]
          /* En móvil añade padding-top para que el botón hamburguesa no tape el contenido */
          pt-16 md:pt-8
        "
      >
        {children}
      </main>
    </div>
  );
}