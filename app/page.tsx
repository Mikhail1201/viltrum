// app/dashboard/page.tsx

"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

const stats = [
  {
    title: "Estudiantes",
    value: 120,
    description: "Información general del módulo",
    icon: Users,
  },
  {
    title: "Docentes",
    value: 35,
    description: "Información general del módulo",
    icon: GraduationCap,
  },
  {
    title: "Materias",
    value: 48,
    description: "Información general del módulo",
    icon: BookOpen,
  },
  {
    title: "Asistencias",
    value: 932,
    description: "Información general del módulo",
    icon: ClipboardCheck,
  },
];

const recentActivity = [
  {
    usuario: "Juan Pérez",
    accion: "Registró asistencia",
    fecha: "22/05/2026",
    estado: "Activo",
  },
  {
    usuario: "Laura Gómez",
    accion: "Actualizó horario",
    fecha: "22/05/2026",
    estado: "Activo",
  },
  {
    usuario: "Miguel Alzate",
    accion: "Creó una materia",
    fecha: "21/05/2026",
    estado: "Inactivo",
  },
  {
    usuario: "Carlos Ruiz",
    accion: "Subió calificaciones",
    fecha: "21/05/2026",
    estado: "Egresado",
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title="Bienvenido de nuevo"
        subtitle="Panel principal del sistema académico"
        actions={
          <div className="rounded-2xl bg-cyan-100 px-6 py-4">
            <p className="font-semibold text-cyan-700">
              Miguel Alzate
            </p>
          </div>
        }
      />

      {/* STATS */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <div className="rounded-2xl bg-cyan-100 p-4 w-fit">
                <Icon className="text-cyan-600" size={28} />
              </div>

              <h2 className="mt-8 text-3xl font-bold text-slate-800">
                {stat.title}
              </h2>

              <p className="mt-3 text-slate-500">
                {stat.description}
              </p>

              <h3 className="mt-8 text-5xl font-bold text-cyan-600">
                {stat.value}
              </h3>
            </Card>
          );
        })}
      </div>

      {/* ACTIVIDAD RECIENTE */}
      <div className="mt-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-slate-800">
                Actividad reciente
              </h2>

              <p className="mt-2 text-slate-500">
                Últimos movimientos dentro del sistema
              </p>
            </div>

            <button className="rounded-2xl bg-cyan-500 px-6 py-4 font-semibold text-white transition-all hover:bg-cyan-400">
              Ver más
            </button>
          </div>

          {/* TABLE */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-100">
            <table className="w-full">
              <thead className="bg-cyan-50">
                <tr>
                  <th className="px-6 py-5 text-left text-slate-700">
                    Usuario
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Acción
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Fecha
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white/30">
                {recentActivity.map((activity, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5 font-medium text-slate-800">
                      {activity.usuario}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {activity.accion}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {activity.fecha}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={activity.estado}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}