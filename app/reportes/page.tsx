// app/reportes/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

import {
  FileText,
  Download,
  BarChart3,
  Users,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  Calendar,
  Search,
  Eye,
  ShieldAlert,
  Filter,
} from "lucide-react";

/*
  ROLES

  ADMIN:
  - ve todos los reportes
  - exporta reportes
  - estadísticas completas

  COORDINADOR:
  - reportes académicos
  - exportar reportes académicos

  DOCENTE:
  - reportes de asistencia y materias

  ESTUDIANTE:
  - NO ACCEDE
*/

const allowedRoles = [
  "admin",
  "coordinador",
  "docente",
];

const reportes = [
  {
    id: 1,
    nombre: "Reporte General de Usuarios",
    categoria: "Usuarios",
    fecha: "22/05/2026",
    estado: "Disponible",
    roles: ["admin"],
  },

  {
    id: 2,
    nombre: "Asistencias del semestre",
    categoria: "Asistencias",
    fecha: "21/05/2026",
    estado: "Disponible",
    roles: ["admin", "coordinador", "docente"],
  },

  {
    id: 3,
    nombre: "Carga académica docente",
    categoria: "Académico",
    fecha: "20/05/2026",
    estado: "Procesando",
    roles: ["admin", "coordinador"],
  },

  {
    id: 4,
    nombre: "Materias registradas",
    categoria: "Materias",
    fecha: "19/05/2026",
    estado: "Disponible",
    roles: ["admin", "coordinador", "docente"],
  },
];

export default function ReportesPage() {
  const [currentUserRole, setCurrentUserRole] =
    useState("");

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [showExportModal, setShowExportModal] =
    useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role) {
      setCurrentUserRole(role);
    }
  }, []);

  const reportesFiltrados = useMemo(() => {
    return reportes.filter((reporte) =>
      reporte.roles.includes(currentUserRole)
    );
  }, [currentUserRole]);

  if (
    currentUserRole &&
    !allowedRoles.includes(currentUserRole)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4ff] p-6">
        <div
          className="
            w-full
            max-w-lg
            rounded-[32px]
            bg-white
            p-8
            shadow-2xl
            sm:p-12
          "
        >
          <ShieldAlert
            className="mx-auto mb-6 text-red-500"
            size={60}
          />

          <h1
            className="
              text-center
              text-3xl
              font-bold
              text-slate-800
              sm:text-4xl
            "
          >
            Acceso denegado
          </h1>

          <p className="mt-4 text-center text-slate-500">
            No tienes permisos para acceder a esta
            página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title="Reportes"
        subtitle="Visualiza estadísticas y exporta información"
        actions={
          (currentUserRole === "admin" ||
            currentUserRole ===
              "coordinador") && (
            <Button
              onClick={() =>
                setShowExportModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Download size={20} />
                <span className="hidden sm:block">
                  Exportar Reportes
                </span>
              </div>
            </Button>
          )
        }
      />

      {/* STATS */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* ADMIN */}
        {currentUserRole === "admin" && (
          <>
            <Card>
              <div className="w-fit rounded-2xl bg-cyan-100 p-4">
                <Users
                  className="text-cyan-600"
                  size={28}
                />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-slate-800 sm:text-5xl">
                4,280
              </h2>

              <p className="mt-2 text-slate-500">
                Usuarios registrados
              </p>
            </Card>

            <Card>
              <div className="w-fit rounded-2xl bg-violet-100 p-4">
                <GraduationCap
                  className="text-violet-600"
                  size={28}
                />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-slate-800 sm:text-5xl">
                12
              </h2>

              <p className="mt-2 text-slate-500">
                Facultades activas
              </p>
            </Card>
          </>
        )}

        {/* ADMIN + COORDINADOR */}
        {(currentUserRole === "admin" ||
          currentUserRole ===
            "coordinador") && (
          <>
            <Card>
              <div className="w-fit rounded-2xl bg-emerald-100 p-4">
                <ClipboardCheck
                  className="text-emerald-600"
                  size={28}
                />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-slate-800 sm:text-5xl">
                92%
              </h2>

              <p className="mt-2 text-slate-500">
                Asistencia promedio
              </p>
            </Card>

            <Card>
              <div className="w-fit rounded-2xl bg-orange-100 p-4">
                <BookOpen
                  className="text-orange-600"
                  size={28}
                />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-slate-800 sm:text-5xl">
                214
              </h2>

              <p className="mt-2 text-slate-500">
                Materias registradas
              </p>
            </Card>
          </>
        )}

        {/* DOCENTE */}
        {currentUserRole === "docente" && (
          <>
            <Card>
              <div className="w-fit rounded-2xl bg-emerald-100 p-4">
                <ClipboardCheck
                  className="text-emerald-600"
                  size={28}
                />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-slate-800 sm:text-5xl">
                87%
              </h2>

              <p className="mt-2 text-slate-500">
                Asistencia promedio
              </p>
            </Card>

            <Card>
              <div className="w-fit rounded-2xl bg-orange-100 p-4">
                <BookOpen
                  className="text-orange-600"
                  size={28}
                />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-slate-800 sm:text-5xl">
                8
              </h2>

              <p className="mt-2 text-slate-500">
                Materias asignadas
              </p>
            </Card>
          </>
        )}
      </div>

      {/* GRAPH SECTION */}
      {(currentUserRole === "admin" ||
        currentUserRole ===
          "coordinador") && (
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-3
          "
        >
          {/* MAIN CHART */}
          <div className="xl:col-span-2">
            <Card>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                    Estadísticas Generales
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Rendimiento institucional
                  </p>
                </div>

                <div className="w-fit rounded-2xl bg-cyan-100 p-4">
                  <BarChart3
                    className="text-cyan-600"
                    size={28}
                  />
                </div>
              </div>

              {/* FAKE CHART */}
              <div className="mt-10 flex h-[220px] sm:h-[320px] items-end gap-3 sm:gap-6">
                {[
                  45,
                  70,
                  55,
                  90,
                  60,
                  80,
                  95,
                ].map((height, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col items-center gap-3"
                  >
                    <div
                      style={{
                        height: `${height}%`,
                      }}
                      className="
                        w-full
                        rounded-t-3xl
                        bg-gradient-to-t
                        from-cyan-500
                        to-sky-300
                        shadow-lg
                      "
                    />

                    <span className="text-xs text-slate-500 sm:text-sm">
                      {[
                        "Lun",
                        "Mar",
                        "Mié",
                        "Jue",
                        "Vie",
                        "Sáb",
                        "Dom",
                      ][index]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* SIDE INFO */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 sm:text-xl">
                    Reportes Generados
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Últimos 30 días
                  </p>
                </div>

                <FileText
                  className="text-cyan-500"
                  size={30}
                />
              </div>

              <h2 className="mt-8 text-5xl font-bold text-cyan-600 sm:text-6xl">
                148
              </h2>
            </Card>

            <Card>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 sm:text-xl">
                    Exportaciones
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Archivos descargados
                  </p>
                </div>

                <Download
                  className="text-emerald-500"
                  size={30}
                />
              </div>

              <h2 className="mt-8 text-5xl font-bold text-emerald-600 sm:text-6xl">
                92
              </h2>
            </Card>
          </div>
        </div>
      )}

      {/* FILTERS */}
      <div className="mt-8">
        <Card>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div
              className="
                flex
                flex-1
                items-center
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
              "
            >
              <Search
                className="text-slate-400"
                size={22}
              />

              <input
                type="text"
                placeholder="Buscar reporte..."
                className="
                  w-full
                  bg-transparent
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                "
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-6
                  py-4
                  text-slate-700
                  transition-all
                  hover:bg-slate-50
                "
              >
                <Filter size={20} />
                Filtrar
              </button>

              <button
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-cyan-500
                  px-6
                  py-4
                  text-white
                  transition-all
                  hover:bg-cyan-400
                "
              >
                <Calendar size={20} />
                Fecha
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* TABLE */}
      <div className="mt-8">
        <Card>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Reportes disponibles
              </h2>

              <p className="mt-2 text-slate-500">
                Historial de reportes generados
              </p>
            </div>

            <div className="w-fit rounded-2xl bg-cyan-100 p-4">
              <FileText
                className="text-cyan-600"
                size={28}
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[950px]">
              <thead className="bg-cyan-50">
                <tr>
                  <th className="px-6 py-5 text-left text-slate-700">
                    Reporte
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Categoría
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Fecha
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Estado
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white/30">
                {reportesFiltrados.map((reporte) => (
                  <tr
                    key={reporte.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-cyan-100 p-3">
                          <FileText
                            className="text-cyan-600"
                            size={20}
                          />
                        </div>

                        <p className="font-semibold text-slate-800">
                          {reporte.nombre}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {reporte.categoria}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {reporte.fecha}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`
                          rounded-full
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          ${
                            reporte.estado ===
                            "Disponible"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-orange-100 text-orange-600"
                          }
                        `}
                      >
                        {reporte.estado}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            setShowViewModal(true)
                          }
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            bg-slate-100
                            px-4
                            py-3
                            text-slate-700
                            transition-all
                            hover:bg-slate-200
                          "
                        >
                          <Eye size={18} />
                          Ver
                        </button>

                        {(currentUserRole ===
                          "admin" ||
                          currentUserRole ===
                            "coordinador") && (
                          <button
                            className="
                              flex
                              items-center
                              gap-2
                              rounded-2xl
                              bg-cyan-500
                              px-4
                              py-3
                              text-white
                              transition-all
                              hover:bg-cyan-400
                            "
                          >
                            <Download size={18} />
                            Descargar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* VIEW MODAL */}
      <Modal open={showViewModal}>
        <div className="w-full max-w-3xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="w-fit rounded-3xl bg-cyan-100 p-5">
              <FileText
                className="text-cyan-600"
                size={36}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
                Vista previa
              </h2>

              <p className="text-slate-500">
                Reporte General de Usuarios
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-2xl font-bold text-slate-800">
                Resumen del reporte
              </h3>

              <span className="w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-600">
                Disponible
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <p className="text-slate-500">
                  Usuarios activos
                </p>

                <h2 className="mt-4 text-3xl font-bold text-cyan-600 sm:text-4xl">
                  3,942
                </h2>
              </Card>

              <Card>
                <p className="text-slate-500">
                  Usuarios inactivos
                </p>

                <h2 className="mt-4 text-3xl font-bold text-red-500 sm:text-4xl">
                  338
                </h2>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-end">
            <Button variant="outline">
              Cerrar
            </Button>

            {(currentUserRole === "admin" ||
              currentUserRole ===
                "coordinador") && (
              <Button>
                Descargar PDF
              </Button>
            )}
          </div>
        </div>
      </Modal>

      {/* EXPORT MODAL */}
      <Modal open={showExportModal}>
        <div className="w-full max-w-3xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Exportar Reportes
            </h2>

            <p className="mt-2 text-slate-500">
              Descarga información institucional
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <button
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                text-left
                transition-all
                hover:scale-[1.02]
                hover:border-cyan-300
              "
            >
              <FileText
                className="mb-6 text-cyan-500"
                size={40}
              />

              <h3 className="text-2xl font-bold text-slate-800">
                Exportar PDF
              </h3>

              <p className="mt-3 text-slate-500">
                Genera reportes en PDF
              </p>
            </button>

            <button
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                text-left
                transition-all
                hover:scale-[1.02]
                hover:border-emerald-300
              "
            >
              <Download
                className="mb-6 text-emerald-500"
                size={40}
              />

              <h3 className="text-2xl font-bold text-slate-800">
                Exportar Excel
              </h3>

              <p className="mt-3 text-slate-500">
                Descarga hojas de cálculo
              </p>
            </button>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              variant="outline"
              onClick={() =>
                setShowExportModal(false)
              }
            >
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}