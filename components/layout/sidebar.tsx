// components/layout/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  GraduationCap,
  DoorOpen,
  School,
  DoorClosed,
  ClipboardList,
} from "lucide-react";

type SidebarProps = {
  role: string;
  isOpen: boolean;
  onClose: () => void;
};

const adminMenu = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Usuarios", icon: Users, href: "/usuarios" },
  { name: "Facultades", icon: GraduationCap, href: "/facultades" },
  { name: "Programas", icon: School, href: "/programas" },
  { name: "Aulas", icon: DoorClosed, href: "/aulas" },
  { name: "Reportes", icon: FileText, href: "/reportes" },
  { name: "Microcurrículos", icon: FileText, href: "/microcurriculos" },
  { name: "Carga Académica", icon: BookOpen, href: "/carga-academica" },
  { name: "Materias", icon: BookOpen, href: "/materias" },
  { name: "Horarios", icon: Calendar, href: "/horarios" },
  { name: "Asistencias", icon: ClipboardCheck, href: "/asistencias" },
  { name: "Calificaciones", icon: ClipboardList, href: "/calificaciones" },
  { name: "Logout", icon: DoorOpen, href: "/login" },
];

const coordinadorMenu = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Facultades", icon: GraduationCap, href: "/facultades" },
  { name: "Programas", icon: School, href: "/programas" },
  { name: "Aulas", icon: DoorClosed, href: "/aulas" },
  { name: "Microcurrículos", icon: FileText, href: "/microcurriculos" },
  { name: "Carga Académica", icon: BookOpen, href: "/carga-academica" },
  { name: "Materias", icon: BookOpen, href: "/materias" },
  { name: "Horarios", icon: Calendar, href: "/horarios" },
  { name: "Asistencias", icon: ClipboardCheck, href: "/asistencias" },
  { name: "Calificaciones", icon: ClipboardList, href: "/calificaciones" },
  { name: "Logout", icon: DoorOpen, href: "/login" },
];

const docenteMenu = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Mis Materias", icon: BookOpen, href: "/materias" },
  { name: "Horarios", icon: Calendar, href: "/horarios" },
  { name: "Asistencias", icon: ClipboardCheck, href: "/asistencias" },
  { name: "Calificaciones", icon: ClipboardList, href: "/calificaciones" },
  { name: "Logout", icon: DoorOpen, href: "/login" },
];

const estudianteMenu = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Mi Horario", icon: Calendar, href: "/horarios" },
  { name: "Mis Materias", icon: BookOpen, href: "/materias" },
  { name: "Asistencias", icon: ClipboardCheck, href: "/asistencias" },
  { name: "Calificaciones", icon: ClipboardList, href: "/calificaciones" },
  { name: "Logout", icon: DoorOpen, href: "/login" },
];

const menuByRole = {
  admin: adminMenu,
  coordinador: coordinadorMenu,
  docente: docenteMenu,
  estudiante: estudianteMenu,
};

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menu = menuByRole[role as keyof typeof menuByRole] || [];

  return (
    <>
      {/* Overlay — solo visible en móvil cuando el menú está abierto */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          md:hidden
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          flex h-full w-[250px] sm:w-[270px] md:w-[290px]
          flex-col overflow-y-auto
          border-r border-white/20
          bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600
          p-3 sm:p-4 md:p-5
          shadow-2xl
          transition-transform duration-300 ease-in-out

          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden

          /* En móvil: se traslada fuera de pantalla si está cerrado */
          -translate-x-full md:translate-x-0
          ${isOpen ? "translate-x-0" : ""}
        `}
      >
        {/* LOGO + botón cerrar en móvil */}
        <div
          className="
            mb-6 sm:mb-7 md:mb-8
            flex items-center gap-3 sm:gap-4
            rounded-[28px] sm:rounded-[30px] md:rounded-[32px]
            border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-2xl
          "
        >
          <div
            className="
              flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16
              items-center justify-center
              rounded-2xl sm:rounded-3xl bg-white/20
            "
          >
            <GraduationCap className="text-white" size={28} />
          </div>

          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              EduSystem
            </h1>
            <p className="capitalize text-cyan-100 text-sm sm:text-base">
              {role}
            </p>
          </div>

          {/* Botón X — solo visible en móvil */}
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="
              md:hidden
              flex h-9 w-9 items-center justify-center
              rounded-2xl bg-white/20
              text-white
              transition-colors duration-200 hover:bg-white/30
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2 sm:gap-3 pb-8 sm:pb-10">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (isActive) {
              return (
                <div
                  key={item.name}
                  className="
                    flex cursor-default items-center gap-3 sm:gap-4
                    rounded-[24px] sm:rounded-[26px] md:rounded-[28px]
                    border border-white/30 bg-white/25
                    p-4 sm:p-5
                    text-white shadow-lg backdrop-blur-2xl
                  "
                >
                  <div className="rounded-2xl bg-white/25 p-2 sm:p-3">
                    <Icon size={22} />
                  </div>
                  <span className="text-base sm:text-lg font-semibold">
                    {item.name}
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose} // cierra el menú al navegar en móvil
                className="
                  group flex items-center gap-3 sm:gap-4
                  rounded-[24px] sm:rounded-[26px] md:rounded-[28px]
                  border border-white/10 bg-white/10
                  p-4 sm:p-5
                  text-white backdrop-blur-xl
                  transition-all duration-300
                  hover:scale-[1.02] hover:bg-white/20
                "
              >
                <div
                  className="
                    rounded-2xl bg-white/20 p-2 sm:p-3
                    transition-all duration-300 group-hover:bg-white/30
                  "
                >
                  <Icon size={22} />
                </div>
                <span className="text-base sm:text-lg font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}