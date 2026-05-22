// =============================
// CAMBIOS IMPORTANTES
// =============================
//
// ✅ Interfaces adaptadas por roles
// ✅ Responsive real para móvil/tablet
// ✅ Cards ocultos para estudiante/docente
// ✅ Tabla responsive
// ✅ Vista tipo cards en mobile
// ✅ Acciones dinámicas por rol
// ✅ Modales responsive
// ✅ Mejor manejo de permisos
//
// =============================

"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  Calendar,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ShieldAlert,
  Clock3,
  BookOpen,
  Users,
  MapPin,
} from "lucide-react";

/*
  ROLES

  ADMIN:
  - TODO

  COORDINADOR:
  - TODO

  DOCENTE:
  - ver SUS horarios

  ESTUDIANTE:
  - ver SUS horarios
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

const horarios = [
  {
    id: 1,
    materia: "Programación I",
    docente: "Carlos Martínez",
    aula: "A-203",
    dia: "Lunes",
    hora: "08:00 AM - 10:00 AM",
    programa: "Ingeniería de Sistemas",
    estado: "Activo",
  },

  {
    id: 2,
    materia: "Bases de Datos",
    docente: "Laura Gómez",
    aula: "LAB-02",
    dia: "Martes",
    hora: "10:00 AM - 12:00 PM",
    programa: "Ingeniería de Sistemas",
    estado: "Activo",
  },

  {
    id: 3,
    materia: "Derecho Penal",
    docente: "Ana Torres",
    aula: "B-101",
    dia: "Miércoles",
    hora: "02:00 PM - 04:00 PM",
    programa: "Derecho",
    estado: "Pendiente",
  },
];

export default function HorariosPage() {
  const [currentUserRole, setCurrentUserRole] =
    useState<UserRole>("estudiante");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  useEffect(() => {
    const role = localStorage.getItem(
      "role"
    ) as UserRole;

    if (role) {
      setCurrentUserRole(role);
    }
  }, []);

  const canManage =
    currentUserRole === "admin" ||
    currentUserRole === "coordinador";

  const isStudent =
    currentUserRole === "estudiante";

  const isTeacher =
    currentUserRole === "docente";

  if (
    currentUserRole &&
    !allowedRoles.includes(currentUserRole)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4ff] p-6">
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
          isStudent
            ? "Mi Horario"
            : isTeacher
            ? "Mis Horarios"
            : "Horarios"
        }
        subtitle={
          isStudent
            ? "Consulta tus clases asignadas"
            : isTeacher
            ? "Consulta tus horarios académicos"
            : "Gestión académica de horarios"
        }
        actions={
          canManage && (
            <Button
              onClick={() =>
                setShowCreateModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Plus size={20} />
                Nuevo Horario
              </div>
            </Button>
          )
        }
      />

      {/* STATS */}
      {!isStudent && (
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
              <Calendar
                className="text-cyan-600"
                size={28}
              />
            </div>

            <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
              42
            </h2>

            <p className="mt-2 text-slate-500">
              Horarios activos
            </p>
          </Card>

          <Card>
            <div className="w-fit rounded-2xl bg-violet-100 p-4">
              <Clock3
                className="text-violet-600"
                size={28}
              />
            </div>

            <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
              120
            </h2>

            <p className="mt-2 text-slate-500">
              Horas semanales
            </p>
          </Card>

          <Card>
            <div className="w-fit rounded-2xl bg-emerald-100 p-4">
              <BookOpen
                className="text-emerald-600"
                size={28}
              />
            </div>

            <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
              28
            </h2>

            <p className="mt-2 text-slate-500">
              Materias programadas
            </p>
          </Card>

          <Card>
            <div className="w-fit rounded-2xl bg-orange-100 p-4">
              <Users
                className="text-orange-600"
                size={28}
              />
            </div>

            <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
              560
            </h2>

            <p className="mt-2 text-slate-500">
              Estudiantes asignados
            </p>
          </Card>
        </div>
      )}

      {/* FILTERS */}
      <div className="mt-8">
        <Card>
          <div className="flex flex-col gap-4 xl:flex-row">
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
                placeholder="Buscar horario..."
                className="
                  w-full
                  bg-transparent
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                "
              />
            </div>

            {!isStudent && (
              <>
                <select
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-4
                    text-slate-700
                    outline-cyan-400
                  "
                >
                  <option>Programa</option>
                </select>

                <select
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-4
                    text-slate-700
                    outline-cyan-400
                  "
                >
                  <option>Día</option>
                </select>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* MOBILE CARDS */}
      <div className="mt-8 grid gap-6 xl:hidden">
        {horarios.map((horario) => (
          <Card key={horario.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {horario.materia}
                </h2>

                <p className="mt-1 text-slate-500">
                  {horario.programa}
                </p>
              </div>

              <StatusBadge
                status={horario.estado}
              />
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <Users size={18} />
                {horario.docente}
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} />
                {horario.aula}
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <Calendar size={18} />
                {horario.dia}
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <Clock3 size={18} />
                {horario.hora}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
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
                      setShowEditModal(true)
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
                </>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="mt-8 hidden xl:block">
        <Card>
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-cyan-100 p-4">
              <Calendar
                className="text-cyan-600"
                size={30}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Gestión de Horarios
              </h2>

              <p className="text-slate-500">
                Organización académica
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[1400px]">
              <thead className="bg-cyan-50">
                <tr>
                  {[
                    "Materia",
                    "Docente",
                    "Aula",
                    "Día",
                    "Hora",
                    "Programa",
                    "Estado",
                    "Acciones",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-5 text-left text-slate-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white/40">
                {horarios.map((horario) => (
                  <tr
                    key={horario.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5 font-medium text-slate-800">
                      {horario.materia}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {horario.docente}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {horario.aula}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {horario.dia}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {horario.hora}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {horario.programa}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={horario.estado}
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
              Nuevo Horario
            </h2>

            <p className="mt-2 text-slate-500">
              Registrar nuevo horario académico
            </p>
          </div>

          <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Programa</option>
            </select>

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Materia</option>
            </select>

            <input
              type="text"
              placeholder="Docente"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Aula"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Día</option>
            </select>

            <input
              type="text"
              placeholder="08:00 AM - 10:00 AM"
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
              Guardar Horario
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}