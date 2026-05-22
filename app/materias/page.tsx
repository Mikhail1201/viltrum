// app/materias/page.tsx

"use client";

import { useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  BookOpen,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  GraduationCap,
  Users,
  ClipboardList,
  ShieldAlert,
  Clock3,
} from "lucide-react";

/*
  ROLES

  ADMIN:
  - TODO

  COORDINADOR:
  - crear
  - editar
  - visualizar

  DOCENTE:
  - visualizar materias asignadas

  ESTUDIANTE:
  - visualizar materias inscritas
*/

type UserRole =
  | "admin"
  | "coordinador"
  | "docente"
  | "estudiante";

const currentUserRole: UserRole =
  "admin";

const allowedRoles = [
  "admin",
  "coordinador",
  "docente",
  "estudiante",
];

const materias = [
  {
    id: 1,
    codigo: "MAT-101",
    nombre: "Programación I",
    facultad: "Ingeniería",
    creditos: 4,
    docente: "Carlos Martínez",
    estado: "Activo",
  },

  {
    id: 2,
    codigo: "MAT-205",
    nombre: "Bases de Datos",
    facultad: "Ingeniería",
    creditos: 3,
    docente: "Laura Gómez",
    estado: "Activo",
  },

  {
    id: 3,
    codigo: "DER-110",
    nombre: "Derecho Penal",
    facultad: "Derecho",
    creditos: 2,
    docente: "Miguel Torres",
    estado: "Inactivo",
  },
];

export default function MateriasPage() {
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const canCreateOrEdit =
    currentUserRole === "admin" ||
    currentUserRole ===
      "coordinador";

  const canDelete =
    currentUserRole === "admin";

  const filteredMaterias = useMemo(() => {
    if (!search.trim()) return materias;

    return materias.filter((materia) =>
      `${materia.codigo} ${materia.nombre} ${materia.docente} ${materia.facultad}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  if (!allowedRoles.includes(currentUserRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4ff] px-6">
        <div className="w-full max-w-xl rounded-[32px] bg-white p-8 md:p-12 shadow-2xl">
          <ShieldAlert
            className="mx-auto mb-6 text-red-500"
            size={60}
          />

          <h1 className="text-center text-3xl md:text-4xl font-bold text-slate-800">
            Acceso denegado
          </h1>

          <p className="mt-4 text-center text-slate-500">
            No tienes permisos para acceder
            a esta página
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title={
          currentUserRole ===
          "docente"
            ? "Mis Materias"
            : currentUserRole ===
              "estudiante"
            ? "Materias Inscritas"
            : "Materias"
        }
        subtitle={
          currentUserRole ===
          "docente"
            ? "Visualiza tus materias asignadas"
            : currentUserRole ===
              "estudiante"
            ? "Consulta tus materias inscritas"
            : "Gestión institucional de materias"
        }
        actions={
          canCreateOrEdit && (
            <Button
              onClick={() =>
                setShowCreateModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Plus size={18} />
                Nueva Materia
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
          2xl:grid-cols-4
        "
      >
        <Card>
          <div className="w-fit rounded-2xl bg-cyan-100 p-4">
            <BookOpen
              className="text-cyan-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-800">
            214
          </h2>

          <p className="mt-2 text-sm md:text-base text-slate-500">
            Materias registradas
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-violet-100 p-4">
            <GraduationCap
              className="text-violet-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-800">
            12
          </h2>

          <p className="mt-2 text-sm md:text-base text-slate-500">
            Facultades activas
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-emerald-100 p-4">
            <Users
              className="text-emerald-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-800">
            42
          </h2>

          <p className="mt-2 text-sm md:text-base text-slate-500">
            Docentes asignados
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-orange-100 p-4">
            <Clock3
              className="text-orange-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-800">
            32h
          </h2>

          <p className="mt-2 text-sm md:text-base text-slate-500">
            Promedio semanal
          </p>
        </Card>
      </div>

      {/* SEARCH */}
      <div className="mt-8">
        <Card>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
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
                px-4
                py-4
              "
            >
              <Search
                className="text-slate-400"
                size={22}
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Buscar materia..."
                className="
                  w-full
                  bg-transparent
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                "
              />
            </div>

            {(currentUserRole ===
              "admin" ||
              currentUserRole ===
                "coordinador") && (
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
                    sm:w-auto
                  "
                >
                  <option>
                    Facultad
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
                    sm:w-auto
                  "
                >
                  <option>
                    Estado
                  </option>
                </select>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* MOBILE CARDS */}
      <div className="mt-8 flex flex-col gap-5 xl:hidden">
        {filteredMaterias.map(
          (materia) => (
            <Card key={materia.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-100 p-3">
                      <BookOpen
                        className="text-cyan-600"
                        size={20}
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        {materia.nombre}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {
                          materia.codigo
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-700">
                        Facultad:
                      </span>{" "}
                      {
                        materia.facultad
                      }
                    </p>

                    <p>
                      <span className="font-semibold text-slate-700">
                        Créditos:
                      </span>{" "}
                      {
                        materia.creditos
                      }
                    </p>

                    <p>
                      <span className="font-semibold text-slate-700">
                        Docente:
                      </span>{" "}
                      {
                        materia.docente
                      }
                    </p>
                  </div>

                  <div className="mt-4">
                    <StatusBadge
                      status={
                        materia.estado
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    setShowViewModal(
                      true
                    )
                  }
                  className="
                    flex
                    items-center
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
                  <Eye size={16} />
                  Ver
                </button>

                {canCreateOrEdit && (
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
                      text-sm
                      text-white
                      transition-all
                      hover:bg-cyan-400
                    "
                  >
                    <Pencil
                      size={16}
                    />
                    Editar
                  </button>
                )}

                {canDelete && (
                  <button
                    className="
                      flex
                      items-center
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
                    <Trash2
                      size={16}
                    />
                    Eliminar
                  </button>
                )}
              </div>
            </Card>
          )
        )}
      </div>

      {/* DESKTOP TABLE */}
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
              <h2 className="text-3xl font-bold text-slate-800">
                Listado de Materias
              </h2>

              <p className="text-slate-500">
                Gestión académica
                institucional
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-cyan-50">
                <tr>
                  <th className="px-6 py-5 text-left text-slate-700">
                    Código
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Materia
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Facultad
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Créditos
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Docente
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
                {filteredMaterias.map(
                  (materia) => (
                    <tr
                      key={
                        materia.id
                      }
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-5 font-medium text-slate-800">
                        {
                          materia.codigo
                        }
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {
                          materia.nombre
                        }
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {
                          materia.facultad
                        }
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {
                          materia.creditos
                        }
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {
                          materia.docente
                        }
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge
                          status={
                            materia.estado
                          }
                        />
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() =>
                              setShowViewModal(
                                true
                              )
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
                            <Eye
                              size={18}
                            />
                            Ver
                          </button>

                          {canCreateOrEdit && (
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
                              <Pencil
                                size={
                                  18
                                }
                              />
                              Editar
                            </button>
                          )}

                          {canDelete && (
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
                              <Trash2
                                size={
                                  18
                                }
                              />
                              Eliminar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* CREATE MODAL */}
      {canCreateOrEdit && (
        <Modal open={showCreateModal}>
          <div className="w-full max-w-[900px]">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                Nueva Materia
              </h2>

              <p className="mt-2 text-slate-500">
                Registra una nueva materia
              </p>
            </div>

            <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Código"
                className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
              />

              <input
                type="text"
                placeholder="Nombre de la materia"
                className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
              />

              <input
                type="number"
                placeholder="Créditos"
                className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
              />

              <input
                type="text"
                placeholder="Facultad"
                className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
              />

              <input
                type="text"
                placeholder="Docente"
                className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
              />

              <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
                <option>
                  Estado
                </option>

                <option>
                  Activo
                </option>

                <option>
                  Inactivo
                </option>
              </select>
            </form>

            <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() =>
                  setShowCreateModal(
                    false
                  )
                }
              >
                Cancelar
              </Button>

              <Button>
                Crear Materia
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {canCreateOrEdit && (
        <Modal open={showEditModal}>
          <div className="w-full max-w-[900px]">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                Editar Materia
              </h2>

              <p className="mt-2 text-slate-500">
                Modifica la información
                académica
              </p>
            </div>

            <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <input
                defaultValue="MAT-101"
                className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
              />

              <input
                defaultValue="Programación I"
                className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
              />

              <input
                defaultValue="4"
                className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
              />

              <input
                defaultValue="Ingeniería"
                className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
              />

              <input
                defaultValue="Carlos Martínez"
                className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
              />

              <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
                <option>
                  Activo
                </option>

                <option>
                  Inactivo
                </option>
              </select>
            </form>

            <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() =>
                  setShowEditModal(
                    false
                  )
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
      )}

      {/* VIEW MODAL */}
      <Modal open={showViewModal}>
        <div className="w-full max-w-[850px]">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Programación I
            </h2>

            <p className="mt-2 text-slate-500">
              Información completa de la
              materia
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card>
              <p className="text-slate-500">
                Código
              </p>

              <h3 className="mt-3 text-xl md:text-2xl font-bold text-slate-800">
                MAT-101
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Créditos
              </p>

              <h3 className="mt-3 text-xl md:text-2xl font-bold text-slate-800">
                4
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Facultad
              </p>

              <h3 className="mt-3 text-xl md:text-2xl font-bold text-slate-800">
                Ingeniería
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Docente
              </p>

              <h3 className="mt-3 text-xl md:text-2xl font-bold text-slate-800">
                Carlos Martínez
              </h3>
            </Card>

            <div className="md:col-span-2">
              <Card>
                <p className="text-slate-500">Estado</p>

                <div className="mt-4">
                  <StatusBadge status="Activo" />
                </div>
              </Card>
            </div>
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