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
  DoorOpen,
  School,
  DoorClosed,
  ClipboardList,
} from "lucide-react";

type SidebarProps = {
  role: string;
};

/*
  ESTRUCTURA DE ACCESOS

  ADMIN:
  - TODO

  COORDINADOR:
  - SUS PÁGINAS
  - DOCENTE
  - ESTUDIANTE

  DOCENTE:
  - DOCENTE

  ESTUDIANTE:
  - ESTUDIANTE
*/

const adminMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },

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
    name: "Programas",
    icon: School,
    href: "/programas",
  },

  {
    name: "Aulas",
    icon: DoorClosed,
    href: "/aulas",
  },

  {
    name: "Reportes",
    icon: FileText,
    href: "/reportes",
  },

  {
    name: "Microcurrículos",
    icon: FileText,
    href: "/microcurriculos",
  },

  {
    name: "Carga Académica",
    icon: BookOpen,
    href: "/carga-academica",
  },

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
    name: "Calificaciones",
    icon: ClipboardList,
    href: "/calificaciones",
  },

  {
    name: "Logout",
    icon: DoorOpen,
    href: "/login",
  },
];

const coordinadorMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },

  {
    name: "Programas",
    icon: School,
    href: "/programas",
  },

  {
    name: "Aulas",
    icon: DoorClosed,
    href: "/aulas",
  },

  {
    name: "Microcurrículos",
    icon: FileText,
    href: "/microcurriculos",
  },

  {
    name: "Carga Académica",
    icon: BookOpen,
    href: "/carga-academica",
  },

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
    name: "Calificaciones",
    icon: ClipboardList,
    href: "/calificaciones",
  },

  {
    name: "Logout",
    icon: DoorOpen,
    href: "/login",
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

  {
    name: "Calificaciones",
    icon: ClipboardList,
    href: "/calificaciones",
  },

  {
    name: "Logout",
    icon: DoorOpen,
    href: "/login",
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

  {
    name: "Calificaciones",
    icon: ClipboardList,
    href: "/calificaciones",
  },

  {
    name: "Logout",
    icon: DoorOpen,
    href: "/login",
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
    menuByRole[
      role as keyof typeof menuByRole
    ] || [];

  return (
    <aside
      className="
        fixed
        flex
        h-full
        w-[290px]
        flex-col
        overflow-y-auto
        border-r
        border-white/20
        bg-gradient-to-b
        from-cyan-400
        via-sky-500
        to-blue-600
        p-5
        shadow-2xl

        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
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
      <nav className="flex flex-col gap-3 pb-10">
        {menu.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href;

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