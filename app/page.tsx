// app/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Calendar,
  FileText,
  ClipboardList,
  School,
  DoorClosed,
} from "lucide-react";

type StatType = {
  title: string;
  value: number;
  description: string;
  icon: any;
};

export default function DashboardPage() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const savedRole =
      localStorage.getItem("role");

    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // =========================
  // STATS POR ROL
  // =========================

  const statsByRole: Record<
    string,
    StatType[]
  > = {
    admin: [
      {
        title: "Usuarios",
        value: 1240,
        description:
          "Usuarios registrados",
        icon: Users,
      },

      {
        title: "Programas",
        value: 24,
        description:
          "Programas académicos",
        icon: School,
      },

      {
        title: "Materias",
        value: 82,
        description:
          "Materias activas",
        icon: BookOpen,
      },

      {
        title: "Aulas",
        value: 48,
        description:
          "Aulas institucionales",
        icon: DoorClosed,
      },
    ],

    coordinador: [
      {
        title: "Microcurrículos",
        value: 38,
        description:
          "Documentos académicos",
        icon: FileText,
      },

      {
        title: "Carga Académica",
        value: 96,
        description:
          "Asignaciones docentes",
        icon: GraduationCap,
      },

      {
        title: "Materias",
        value: 42,
        description:
          "Materias coordinadas",
        icon: BookOpen,
      },

      {
        title: "Horarios",
        value: 28,
        description:
          "Horarios programados",
        icon: Calendar,
      },
    ],

    docente: [
      {
        title: "Mis Materias",
        value: 6,
        description:
          "Materias asignadas",
        icon: BookOpen,
      },

      {
        title: "Horarios",
        value: 18,
        description:
          "Clases programadas",
        icon: Calendar,
      },

      {
        title: "Asistencias",
        value: 324,
        description:
          "Asistencias registradas",
        icon: ClipboardCheck,
      },

      {
        title: "Calificaciones",
        value: 210,
        description:
          "Notas registradas",
        icon: ClipboardList,
      },
    ],

    estudiante: [
      {
        title: "Materias",
        value: 7,
        description:
          "Materias inscritas",
        icon: BookOpen,
      },

      {
        title: "Horarios",
        value: 22,
        description:
          "Clases semanales",
        icon: Calendar,
      },

      {
        title: "Asistencias",
        value: 95,
        description:
          "Porcentaje de asistencia",
        icon: ClipboardCheck,
      },

      {
        title: "Promedio",
        value: 43,
        description:
          "Promedio acumulado",
        icon: ClipboardList,
      },
    ],
  };

  // =========================
  // ACTIVIDAD POR ROL
  // =========================

  const activityByRole: Record<
    string,
    any[]
  > = {
    admin: [
      {
        usuario: "Juan Pérez",
        accion: "Creó un programa",
        fecha: "22/05/2026",
        estado: "Activo",
      },

      {
        usuario: "Laura Gómez",
        accion: "Registró un aula",
        fecha: "22/05/2026",
        estado: "Activo",
      },

      {
        usuario: "Miguel Alzate",
        accion: "Actualizó usuarios",
        fecha: "21/05/2026",
        estado: "Activo",
      },
    ],

    coordinador: [
      {
        usuario: "Carlos Ruiz",
        accion: "Actualizó microcurrículo",
        fecha: "22/05/2026",
        estado: "Activo",
      },

      {
        usuario: "Ana Torres",
        accion: "Asignó carga académica",
        fecha: "21/05/2026",
        estado: "Activo",
      },

      {
        usuario: "Pedro López",
        accion: "Editó horario",
        fecha: "20/05/2026",
        estado: "Activo",
      },
    ],

    docente: [
      {
        usuario: "Carlos Martínez",
        accion: "Subió calificaciones",
        fecha: "22/05/2026",
        estado: "Activo",
      },

      {
        usuario: "Carlos Martínez",
        accion: "Registró asistencia",
        fecha: "22/05/2026",
        estado: "Activo",
      },

      {
        usuario: "Carlos Martínez",
        accion: "Actualizó notas",
        fecha: "21/05/2026",
        estado: "Activo",
      },
    ],

    estudiante: [
      {
        usuario: "Miguel Alzate",
        accion: "Consultó calificaciones",
        fecha: "22/05/2026",
        estado: "Activo",
      },

      {
        usuario: "Miguel Alzate",
        accion: "Revisó horario",
        fecha: "21/05/2026",
        estado: "Activo",
      },

      {
        usuario: "Miguel Alzate",
        accion: "Consultó asistencias",
        fecha: "20/05/2026",
        estado: "Activo",
      },
    ],
  };

  const stats =
    statsByRole[role] || [];

  const recentActivity =
    activityByRole[role] || [];

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title={`Bienvenido ${
          role
            ? `(${role})`
            : ""
        }`}
        subtitle="Panel principal del sistema académico"
        actions={
          <div
            className="
              rounded-2xl
              bg-cyan-100
              px-4
              py-3
              sm:px-6
              sm:py-4
            "
          >
            <p
              className="
                text-sm
                font-semibold
                text-cyan-700
                sm:text-base
              "
            >
              Miguel Alzate
            </p>
          </div>
        }
      />

      {/* STATS */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <div
                className="
                  w-fit
                  rounded-2xl
                  bg-cyan-100
                  p-3
                  sm:p-4
                "
              >
                <Icon
                  className="text-cyan-600"
                  size={24}
                />
              </div>

              <h2
                className="
                  mt-6
                  text-2xl
                  font-bold
                  text-slate-800
                  sm:text-3xl
                "
              >
                {stat.title}
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                  sm:text-base
                "
              >
                {stat.description}
              </p>

              <h3
                className="
                  mt-6
                  text-4xl
                  font-bold
                  text-cyan-600
                  sm:text-5xl
                "
              >
                {stat.value}
              </h3>
            </Card>
          );
        })}
      </div>

      {/* ACTIVIDAD */}
      <div className="mt-8">
        <Card>
          {/* TOP */}
          <div
            className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div>
              <h2
                className="
                  text-3xl
                  font-bold
                  text-slate-800
                  sm:text-4xl
                "
              >
                Actividad reciente
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                  sm:text-base
                "
              >
                Últimos movimientos dentro del
                sistema
              </p>
            </div>

            <button
              className="
                w-full
                rounded-2xl
                bg-cyan-500
                px-6
                py-4
                text-sm
                font-semibold
                text-white
                transition-all
                hover:bg-cyan-400
                sm:w-fit
                sm:text-base
              "
            >
              Ver más
            </button>
          </div>

          {/* TABLE */}
          <div
            className="
              mt-8
              overflow-x-auto
              rounded-3xl
              border
              border-slate-100
            "
          >
            <table className="min-w-[700px] w-full">
              <thead className="bg-cyan-50">
                <tr>
                  <th
                    className="
                      px-4
                      py-5
                      text-left
                      text-sm
                      text-slate-700
                      sm:px-6
                    "
                  >
                    Usuario
                  </th>

                  <th
                    className="
                      px-4
                      py-5
                      text-left
                      text-sm
                      text-slate-700
                      sm:px-6
                    "
                  >
                    Acción
                  </th>

                  <th
                    className="
                      px-4
                      py-5
                      text-left
                      text-sm
                      text-slate-700
                      sm:px-6
                    "
                  >
                    Fecha
                  </th>

                  <th
                    className="
                      px-4
                      py-5
                      text-left
                      text-sm
                      text-slate-700
                      sm:px-6
                    "
                  >
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white/30">
                {recentActivity.map(
                  (activity, index) => (
                    <tr
                      key={index}
                      className="
                        border-t
                        border-slate-100
                      "
                    >
                      <td
                        className="
                          px-4
                          py-5
                          text-sm
                          font-medium
                          text-slate-800
                          sm:px-6
                        "
                      >
                        {activity.usuario}
                      </td>

                      <td
                        className="
                          px-4
                          py-5
                          text-sm
                          text-slate-600
                          sm:px-6
                        "
                      >
                        {activity.accion}
                      </td>

                      <td
                        className="
                          px-4
                          py-5
                          text-sm
                          text-slate-600
                          sm:px-6
                        "
                      >
                        {activity.fecha}
                      </td>

                      <td
                        className="
                          px-4
                          py-5
                          sm:px-6
                        "
                      >
                        <StatusBadge
                          status={
                            activity.estado
                          }
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}