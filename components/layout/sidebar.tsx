// components/layout/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Settings,
} from "lucide-react";

type SidebarProps = {
  role: string;
};

/*
  ESTRUCTURA DE ACCESOS

  ADMIN:
  - ve TODO

  COORDINADOR:
  - ve SUS páginas
  - ve páginas DOCENTE
  - ve páginas ESTUDIANTE

  DOCENTE:
  - solo páginas DOCENTE

  ESTUDIANTE:
  - solo páginas ESTUDIANTE
*/

const adminMenu = [
  // GENERALES
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },

  // ADMIN
  {
    name: "Usuarios",
    icon: Users,
    href: "/usuarios",
  },
  {
    name: "Facultades",
    icon: GraduationCap,
    href: "/facultades",
  },
  {
    name: "Reportes",
    icon: FileText,
    href: "/reportes",
  },

  // COORDINADOR
  {
    name: "Microcurrículos",
    icon: FileText,
    href: "/microcurriculos",
  },
  {
    name: "Carga Académica",
    icon: BookOpen,
    href: "/carga",
  },

  // DOCENTE + ESTUDIANTE
  {
    name: "Materias",
    icon: BookOpen,
    href: "/materias",
  },
  {
    name: "Horarios",
    icon: Calendar,
    href: "/horarios",
  },
  {
    name: "Asistencias",
    icon: ClipboardCheck,
    href: "/asistencias",
  },
  {
    name: "Configuración",
    icon: Settings,
    href: "/configuracion",
  },
];

const coordinadorMenu = [
  // GENERALES
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },

  // COORDINADOR
  {
    name: "Microcurrículos",
    icon: FileText,
    href: "/microcurriculos",
  },
  {
    name: "Carga Académica",
    icon: BookOpen,
    href: "/carga",
  },

  // DOCENTE + ESTUDIANTE
  {
    name: "Materias",
    icon: BookOpen,
    href: "/materias",
  },
  {
    name: "Horarios",
    icon: Calendar,
    href: "/horarios",
  },
  {
    name: "Asistencias",
    icon: ClipboardCheck,
    href: "/asistencias",
  },
];

const docenteMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    name: "Mis Materias",
    icon: BookOpen,
    href: "/materias",
  },
  {
    name: "Horarios",
    icon: Calendar,
    href: "/horarios",
  },
  {
    name: "Asistencias",
    icon: ClipboardCheck,
    href: "/asistencias",
  },
];

const estudianteMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    name: "Mi Horario",
    icon: Calendar,
    href: "/horarios",
  },
  {
    name: "Mis Materias",
    icon: BookOpen,
    href: "/materias",
  },
  {
    name: "Asistencias",
    icon: ClipboardCheck,
    href: "/asistencias",
  },
];

const menuByRole = {
  admin: adminMenu,
  coordinador: coordinadorMenu,
  docente: docenteMenu,
  estudiante: estudianteMenu,
};

export default function Sidebar({
  role,
}: SidebarProps) {
  const pathname = usePathname();

  const menu =
    menuByRole[role as keyof typeof menuByRole];

  return (
    <aside
      className="
        flex
        min-h-screen
        w-[290px]
        flex-col
        border-r
        border-white/20
        bg-gradient-to-b
        from-cyan-400
        via-sky-500
        to-blue-600
        p-5
        shadow-2xl
      "
    >
      {/* LOGO */}
      <div
        className="
          mb-8
          flex
          items-center
          gap-4
          rounded-[32px]
          border
          border-white/20
          bg-white/10
          p-5
          backdrop-blur-2xl
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-3xl
            bg-white/20
          "
        >
          <GraduationCap
            className="text-white"
            size={30}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            EduSystem
          </h1>

          <p className="capitalize text-cyan-100">
            {role}
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-3">
        {menu.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href;

          // BOTÓN ACTIVO
          if (isActive) {
            return (
              <div
                key={item.name}
                className="
                  flex
                  cursor-default
                  items-center
                  gap-4
                  rounded-[28px]
                  border
                  border-white/30
                  bg-white/25
                  p-5
                  text-white
                  shadow-lg
                  backdrop-blur-2xl
                "
              >
                <div
                  className="
                    rounded-2xl
                    bg-white/25
                    p-3
                  "
                >
                  <Icon size={22} />
                </div>

                <span className="text-lg font-semibold">
                  {item.name}
                </span>
              </div>
            );
          }

          // BOTÓN NORMAL
          return (
            <Link
              key={item.name}
              href={item.href}
              className="
                group
                flex
                items-center
                gap-4
                rounded-[28px]
                border
                border-white/10
                bg-white/10
                p-5
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-white/20
              "
            >
              <div
                className="
                  rounded-2xl
                  bg-white/20
                  p-3
                  transition-all
                  duration-300
                  group-hover:bg-white/30
                "
              >
                <Icon size={22} />
              </div>

              <span className="text-lg font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}