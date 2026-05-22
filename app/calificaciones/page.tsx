// app/calificaciones/page.tsx

"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  ClipboardList,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ShieldAlert,
  GraduationCap,
  Award,
  TrendingUp,
} from "lucide-react";

/*
  ROLES

  ADMIN:
  - TODO

  COORDINADOR:
  - TODO

  DOCENTE:
  - registrar notas
  - editar notas

  ESTUDIANTE:
  - ver SUS notas
*/

type UserRole =
  | "admin"
  | "coordinador"
  | "docente"
  | "estudiante";

const allowedRoles: UserRole[] = [
  "admin",
  "coordinador",
  "docente",
  "estudiante",
];

const calificaciones = [
  {
    id: 1,
    estudiante: "Juan Pérez",
    programa: "Ingeniería de Sistemas",
    materia: "Programación I",
    docente: "Carlos Martínez",
    nota: 4.5,
    estado: "Aprobado",
  },

  {
    id: 2,
    estudiante: "Laura Gómez",
    programa: "Derecho",
    materia: "Derecho Penal",
    docente: "Ana Torres",
    nota: 2.8,
    estado: "Reprobado",
  },

  {
    id: 3,
    estudiante: "Miguel Torres",
    programa: "Administración",
    materia: "Microeconomía",
    docente: "Pedro Ruiz",
    nota: 3.9,
    estado: "Aprobado",
  },
];

export default function CalificacionesPage() {
  const [currentUserRole, setCurrentUserRole] =
    useState<UserRole | "">("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  useEffect(() => {
    const role = localStorage.getItem(
      "role"
    ) as UserRole | null;

    if (role) {
      setCurrentUserRole(role);
    }
  }, []);

  if (
    currentUserRole &&
    !allowedRoles.includes(currentUserRole)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4ff] p-6">
        <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl md:p-12">
          <ShieldAlert
            className="mx-auto mb-6 text-red-500"
            size={60}
          />

          <h1 className="text-center text-3xl font-bold text-slate-800 md:text-4xl">
            Acceso denegado
          </h1>

          <p className="mt-4 text-center text-slate-500">
            No tienes permisos para acceder a esta
            página
          </p>
        </div>
      </div>
    );
  }

  const canManage =
    currentUserRole === "admin" ||
    currentUserRole === "coordinador" ||
    currentUserRole === "docente";

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title={
          currentUserRole === "estudiante"
            ? "Mis Calificaciones"
            : "Calificaciones"
        }
        subtitle="Gestión académica de notas"
        actions={
          canManage && (
            <Button
              onClick={() =>
                setShowCreateModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Plus size={20} />
                Registrar Nota
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
        <Card>
          <div className="w-fit rounded-2xl bg-cyan-100 p-4">
            <ClipboardList
              className="text-cyan-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
            324
          </h2>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Calificaciones
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-emerald-100 p-4">
            <Award
              className="text-emerald-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
            4.2
          </h2>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Promedio general
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-orange-100 p-4">
            <TrendingUp
              className="text-orange-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
            89%
          </h2>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Materias aprobadas
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-violet-100 p-4">
            <GraduationCap
              className="text-violet-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
            24
          </h2>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Programas
          </p>
        </Card>
      </div>

      {/* FILTERS */}
      <div className="mt-8">
        <Card>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <div
              className="
                flex
                w-full
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
                placeholder={
                  currentUserRole ===
                  "estudiante"
                    ? "Buscar materia..."
                    : "Buscar estudiante..."
                }
                className="
                  w-full
                  bg-transparent
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                "
              />
            </div>

            {currentUserRole !==
              "estudiante" && (
              <>
                <select
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-4
                    text-slate-700
                    outline-cyan-400
                    xl:w-[260px]
                  "
                >
                  <option>
                    Filtrar por programa
                  </option>

                  <option>
                    Ingeniería de Sistemas
                  </option>

                  <option>Derecho</option>

                  <option>
                    Administración
                  </option>
                </select>

                <select
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-4
                    text-slate-700
                    outline-cyan-400
                    xl:w-[240px]
                  "
                >
                  <option>
                    Filtrar por materia
                  </option>

                  <option>
                    Programación I
                  </option>

                  <option>
                    Bases de Datos
                  </option>

                  <option>
                    Derecho Penal
                  </option>
                </select>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* MOBILE CARDS */}
      <div className="mt-8 grid gap-5 xl:hidden">
        {calificaciones.map((item) => (
          <Card key={item.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                {currentUserRole !==
                  "estudiante" && (
                  <h2 className="text-lg font-bold text-slate-800">
                    {item.estudiante}
                  </h2>
                )}

                <p className="mt-1 text-slate-600">
                  {item.materia}
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-cyan-100
                  px-4
                  py-2
                  text-sm
                  font-bold
                  text-cyan-700
                "
              >
                {item.nota}
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between gap-4">
                <span className="font-semibold">
                  Programa
                </span>

                <span>{item.programa}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-semibold">
                  Docente
                </span>

                <span>{item.docente}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-semibold">
                  Estado
                </span>

                <StatusBadge
                  status={item.estado}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  setShowViewModal(true)
                }
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-slate-100
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  transition-all
                  hover:bg-slate-200
                "
              >
                <Eye size={18} />
                Ver
              </button>

              {canManage && (
                <>
                  <button
                    onClick={() =>
                      setShowEditModal(true)
                    }
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-cyan-500
                      px-4
                      py-3
                      text-sm
                      text-white
                      transition-all
                      hover:bg-cyan-400
                    "
                  >
                    <Pencil size={18} />
                    Editar
                  </button>

                  {currentUserRole ===
                    "admin" && (
                    <button
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-red-500
                        px-4
                        py-3
                        text-sm
                        text-white
                        transition-all
                        hover:bg-red-400
                      "
                    >
                      <Trash2 size={18} />
                      Eliminar
                    </button>
                  )}
                </>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* TABLE DESKTOP */}
      <div className="mt-8 hidden xl:block">
        <Card>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="rounded-2xl bg-cyan-100 p-4">
              <ClipboardList
                className="text-cyan-600"
                size={30}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
                {currentUserRole ===
                "estudiante"
                  ? "Mis Notas"
                  : "Registro de Calificaciones"}
              </h2>

              <p className="text-slate-500">
                Seguimiento académico estudiantil
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[1300px]">
              <thead className="bg-cyan-50">
                <tr>
                  {currentUserRole !==
                    "estudiante" && (
                    <th className="px-6 py-5 text-left text-slate-700">
                      Estudiante
                    </th>
                  )}

                  <th className="px-6 py-5 text-left text-slate-700">
                    Programa
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Materia
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Docente
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Nota
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Estado
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white/40">
                {calificaciones.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-100"
                  >
                    {currentUserRole !==
                      "estudiante" && (
                      <td className="px-6 py-5 font-medium text-slate-800">
                        {item.estudiante}
                      </td>
                    )}

                    <td className="px-6 py-5 text-slate-600">
                      {item.programa}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {item.materia}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {item.docente}
                    </td>

                    <td className="px-6 py-5">
                      <div
                        className="
                          w-fit
                          rounded-2xl
                          bg-cyan-100
                          px-5
                          py-2
                          font-bold
                          text-cyan-700
                        "
                      >
                        {item.nota}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={item.estado}
                      />
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

                        {canManage && (
                          <>
                            <button
                              onClick={() =>
                                setShowEditModal(
                                  true
                                )
                              }
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
                              <Pencil size={18} />
                              Editar
                            </button>

                            {currentUserRole ===
                              "admin" && (
                              <button
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  rounded-2xl
                                  bg-red-500
                                  px-4
                                  py-3
                                  text-white
                                  transition-all
                                  hover:bg-red-400
                                "
                              >
                                <Trash2 size={18} />
                                Eliminar
                              </button>
                            )}
                          </>
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

      {/* CREATE MODAL */}
      <Modal open={showCreateModal}>
        <div className="w-full max-w-[900px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
              Registrar Nota
            </h2>

            <p className="mt-2 text-slate-500">
              Registro académico estudiantil
            </p>
          </div>

          <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input
              type="text"
              placeholder="Estudiante"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Programa</option>
            </select>

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Materia</option>
            </select>

            <input
              type="number"
              step="0.1"
              placeholder="Nota"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />
          </form>

          <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() =>
                setShowCreateModal(false)
              }
            >
              Cancelar
            </Button>

            <Button>
              Guardar Nota
            </Button>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal open={showEditModal}>
        <div className="w-full max-w-[900px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
              Editar Nota
            </h2>

            <p className="mt-2 text-slate-500">
              Modifica la información académica
            </p>
          </div>

          <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input
              defaultValue="Juan Pérez"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="Ingeniería de Sistemas"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="Programación I"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="4.5"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />
          </form>

          <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() =>
                setShowEditModal(false)
              }
            >
              Cancelar
            </Button>

            <Button>
              Guardar Cambios
            </Button>
          </div>
        </div>
      </Modal>

      {/* VIEW MODAL */}
      <Modal open={showViewModal}>
        <div className="w-full max-w-[900px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
              Detalle de Calificación
            </h2>

            <p className="mt-2 text-slate-500">
              Información académica completa
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {currentUserRole !==
              "estudiante" && (
              <Card>
                <p className="text-slate-500">
                  Estudiante
                </p>

                <h3 className="mt-3 text-xl font-bold text-slate-800 md:text-2xl">
                  Juan Pérez
                </h3>
              </Card>
            )}

            <Card>
              <p className="text-slate-500">
                Programa
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-800 md:text-2xl">
                Ingeniería de Sistemas
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Materia
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-800 md:text-2xl">
                Programación I
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Docente
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-800 md:text-2xl">
                Carlos Martínez
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Nota
              </p>

              <div
                className="
                  mt-4
                  w-fit
                  rounded-2xl
                  bg-cyan-100
                  px-5
                  py-3
                  text-2xl
                  font-bold
                  text-cyan-700
                "
              >
                4.5
              </div>
            </Card>

            <Card>
              <p className="text-slate-500">
                Estado
              </p>

              <div className="mt-4">
                <StatusBadge
                  status="Aprobado"
                />
              </div>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              variant="outline"
              onClick={() =>
                setShowViewModal(false)
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