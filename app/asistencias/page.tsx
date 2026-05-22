// app/asistencias/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  ClipboardCheck,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ShieldAlert,
  Users,
  CheckCircle2,
  XCircle,
  Clock3,
  Calendar,
} from "lucide-react";

/*
  ROLES

  ADMIN:
  - TODO

  COORDINADOR:
  - visualizar
  - editar
  - reportes

  DOCENTE:
  - registrar asistencia
  - editar asistencia

  ESTUDIANTE:
  - visualizar SU asistencia
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

const asistencias = [
  {
    id: 1,
    estudiante: "Juan Pérez",
    materia: "Programación I",
    docente: "Carlos Martínez",
    fecha: "21/05/2026",
    hora: "08:00 AM",
    estado: "Presente",
  },

  {
    id: 2,
    estudiante: "Laura Gómez",
    materia: "Bases de Datos",
    docente: "Andrés Ruiz",
    fecha: "21/05/2026",
    hora: "10:00 AM",
    estado: "Ausente",
  },

  {
    id: 3,
    estudiante: "Miguel Torres",
    materia: "Derecho Penal",
    docente: "Ana Torres",
    fecha: "21/05/2026",
    hora: "02:00 PM",
    estado: "Tarde",
  },
];

export default function AsistenciasPage() {
  const [currentUserRole, setCurrentUserRole] =
    useState<UserRole | "">("");

  const [search, setSearch] = useState("");

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

  const canCreate =
    currentUserRole === "admin" ||
    currentUserRole === "docente";

  const canEdit =
    currentUserRole === "admin" ||
    currentUserRole === "coordinador" ||
    currentUserRole === "docente";

  const canDelete =
    currentUserRole === "admin";

  const filteredAsistencias = useMemo(() => {
    return asistencias.filter((asistencia) =>
      `${asistencia.estudiante}
       ${asistencia.materia}
       ${asistencia.docente}
       ${asistencia.estado}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  if (
    currentUserRole &&
    !allowedRoles.includes(currentUserRole)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4ff] px-6">
        <div className="w-full max-w-lg rounded-[32px] bg-white p-8 shadow-2xl md:p-12">
          <ShieldAlert
            className="mx-auto mb-6 text-red-500"
            size={60}
          />

          <h1 className="text-center text-3xl font-bold text-slate-800 md:text-4xl">
            Acceso denegado
          </h1>

          <p className="mt-4 text-center text-slate-500">
            No tienes permisos para acceder a
            esta página
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
          currentUserRole === "estudiante"
            ? "Mi Asistencia"
            : currentUserRole === "docente"
            ? "Control de Asistencia"
            : "Asistencias"
        }
        subtitle="Control institucional de asistencia"
        actions={
          canCreate && (
            <Button
              onClick={() =>
                setShowCreateModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Plus size={18} />
                <span className="hidden sm:block">
                  Registrar Asistencia
                </span>
              </div>
            </Button>
          )
        }
      />

      {/* STATS */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-4">
        <Card>
          <div className="w-fit rounded-2xl bg-emerald-100 p-4">
            <CheckCircle2
              className="text-emerald-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
            92%
          </h2>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Asistencia general
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-red-100 p-4">
            <XCircle
              className="text-red-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
            8%
          </h2>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Inasistencias
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-cyan-100 p-4">
            <Users
              className="text-cyan-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
            1240
          </h2>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Registros realizados
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-orange-100 p-4">
            <Clock3
              className="text-orange-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
            56
          </h2>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Tardanzas
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
                w-full
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
                  setSearch(e.target.value)
                }
                placeholder="Buscar asistencia..."
                className="
                  w-full
                  bg-transparent
                  text-sm
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                  md:text-base
                "
              />
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 xl:w-auto">
              <select className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-cyan-400 md:text-base">
                <option>Materia</option>
              </select>

              <select className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-cyan-400 md:text-base">
                <option>Estado</option>
              </select>

              <select className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-cyan-400 md:text-base">
                <option>Fecha</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      {/* MOBILE CARDS */}
      <div className="mt-8 grid grid-cols-1 gap-5 xl:hidden">
        {filteredAsistencias.map(
          (asistencia) => (
            <Card key={asistencia.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {asistencia.estudiante}
                  </h2>

                  <p className="mt-1 text-slate-500">
                    {asistencia.materia}
                  </p>
                </div>

                <StatusBadge
                  status={asistencia.estado}
                />
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  {asistencia.docente}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {asistencia.fecha}
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {asistencia.hora}
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

                {canEdit && (
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
                )}

                {canDelete && (
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
              </div>
            </Card>
          )
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="mt-8 hidden xl:block">
        <Card>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="rounded-2xl bg-cyan-100 p-4">
              <ClipboardCheck
                className="text-cyan-600"
                size={30}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Registro de Asistencias
              </h2>

              <p className="text-slate-500">
                Seguimiento académico
                estudiantil
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-cyan-50">
                <tr>
                  <th className="px-6 py-5 text-left text-slate-700">
                    Estudiante
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Materia
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Docente
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Fecha
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Hora
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
                {filteredAsistencias.map(
                  (asistencia) => (
                    <tr
                      key={asistencia.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-5 font-medium text-slate-800">
                        {asistencia.estudiante}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {asistencia.materia}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {asistencia.docente}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {asistencia.fecha}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {asistencia.hora}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge
                          status={
                            asistencia.estado
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
                            <Eye size={18} />
                            Ver
                          </button>

                          {canEdit && (
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
                                size={18}
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
                                size={18}
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
      <Modal open={showCreateModal}>
        <div className="w-full max-w-[850px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
              Registrar Asistencia
            </h2>

            <p className="mt-2 text-slate-500">
              Registra asistencia estudiantil
            </p>
          </div>

          <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <input
              type="text"
              placeholder="Estudiante"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Materia"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="date"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="time"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400 md:col-span-2">
              <option>Estado</option>
              <option>Presente</option>
              <option>Ausente</option>
              <option>Tarde</option>
            </select>
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
              Guardar Registro
            </Button>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal open={showEditModal}>
        <div className="w-full max-w-[850px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
              Editar Asistencia
            </h2>

            <p className="mt-2 text-slate-500">
              Modifica el registro académico
            </p>
          </div>

          <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <input
              defaultValue="Juan Pérez"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="Programación I"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="21/05/2026"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Presente</option>
              <option>Ausente</option>
              <option>Tarde</option>
            </select>
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
        <div className="w-full max-w-[850px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
              Detalle de Asistencia
            </h2>

            <p className="mt-2 text-slate-500">
              Información completa del
              registro
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card>
              <p className="text-slate-500">
                Estudiante
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-800 md:text-2xl">
                Juan Pérez
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
                Fecha
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-800 md:text-2xl">
                21/05/2026
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Hora
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-800 md:text-2xl">
                08:00 AM
              </h3>
            </Card>

            <div className="md:col-span-2">
              <Card>
                <p className="text-slate-500">
                  Estado
                </p>

                <div className="mt-4">
                  <StatusBadge
                    status="Presente"
                  />
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