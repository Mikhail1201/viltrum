// app/asistencias/page.tsx

"use client";

import { useState } from "react";

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
  Calendar,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock3,
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

type UserRole = "admin" | "coordinador" | "docente" | "estudiante";

const currentUserRole: UserRole = "admin";

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
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  if (!allowedRoles.includes(currentUserRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4ff]">
        <div className="rounded-[32px] bg-white p-12 shadow-2xl">
          <ShieldAlert
            className="mx-auto mb-6 text-red-500"
            size={60}
          />

          <h1 className="text-center text-4xl font-bold text-slate-800">
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

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title={
          currentUserRole === "estudiante"
            ? "Mi Asistencia"
            : "Asistencias"
        }
        subtitle="Control institucional de asistencia"
        actions={
          currentUserRole !== "estudiante" && (
            <Button
              onClick={() =>
                setShowCreateModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Plus size={20} />
                Registrar Asistencia
              </div>
            </Button>
          )
        }
      />

      {/* STATS */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="w-fit rounded-2xl bg-emerald-100 p-4">
            <CheckCircle2
              className="text-emerald-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            92%
          </h2>

          <p className="mt-2 text-slate-500">
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

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            8%
          </h2>

          <p className="mt-2 text-slate-500">
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

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            1240
          </h2>

          <p className="mt-2 text-slate-500">
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

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            56
          </h2>

          <p className="mt-2 text-slate-500">
            Tardanzas
          </p>
        </Card>
      </div>

      {/* SEARCH */}
      <div className="mt-8">
        <Card>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-1 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
              <Search
                className="text-slate-400"
                size={22}
              />

              <input
                type="text"
                placeholder="Buscar asistencia..."
                className="
                  w-full
                  bg-transparent
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                "
              />
            </div>

            <select className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-cyan-400">
              <option>Materia</option>
            </select>

            <select className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-cyan-400">
              <option>Estado</option>
            </select>

            <select className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-cyan-400">
              <option>Fecha</option>
            </select>
          </div>
        </Card>
      </div>

      {/* TABLE */}
      <div className="mt-8">
        <Card>
          <div className="mb-8 flex items-center gap-4">
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
                Seguimiento académico estudiantil
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[1300px]">
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
                {asistencias.map((asistencia) => (
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
                        status={asistencia.estado}
                      />
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-3">
                        {/* VER */}
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

                        {/* EDITAR */}
                        {currentUserRole !==
                          "estudiante" && (
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
                        )}

                        {/* ELIMINAR */}
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
        <div className="max-w-[850px] w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Registrar Asistencia
            </h2>

            <p className="mt-2 text-slate-500">
              Registra asistencia estudiantil
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
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

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Estado</option>
              <option>Presente</option>
              <option>Ausente</option>
              <option>Tarde</option>
            </select>
          </form>

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
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
        <div className="max-w-[850px] w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Editar Asistencia
            </h2>

            <p className="mt-2 text-slate-500">
              Modifica el registro académico
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
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

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
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
        <div className="max-w-[850px] w-full">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-800">
              Detalle de Asistencia
            </h2>

            <p className="mt-2 text-slate-500">
              Información completa del registro
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <p className="text-slate-500">
                Estudiante
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                Juan Pérez
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Materia
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                Programación I
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Fecha
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                21/05/2026
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Hora
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                08:00 AM
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Estado
              </p>

              <div className="mt-4">
                <StatusBadge status="Presente" />
              </div>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <Button variant="outline" onClick={() => setShowViewModal(false)}>
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}