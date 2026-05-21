// app/carga/page.tsx

"use client";

import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  ClipboardList,
  ShieldAlert,
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
  - solo visualiza SU carga

  ESTUDIANTE:
  - no accede
*/

const currentUserRole: "admin" | "coordinador" | "docente" = "admin";

const allowedRoles = [
  "admin",
  "coordinador",
  "docente",
];

const cargas = [
  {
    id: 1,
    programa: "Ingeniería de Sistemas",
    materia: "Programación I",
    docente: "Carlos Martínez",
    aula: "A-201",
    grupo: "01",
    dia: "Lunes",
    hora: "08:00 AM",
    periodo: "2026-1",
    estado: "Activo",
  },

  {
    id: 2,
    programa: "Ingeniería Industrial",
    materia: "Cálculo II",
    docente: "Laura Gómez",
    aula: "B-104",
    grupo: "02",
    dia: "Martes",
    hora: "10:00 AM",
    periodo: "2026-1",
    estado: "Activo",
  },

  {
    id: 3,
    programa: "Derecho",
    materia: "Derecho Penal",
    docente: "Miguel Torres",
    aula: "C-301",
    grupo: "03",
    dia: "Miércoles",
    hora: "02:00 PM",
    periodo: "2026-1",
    estado: "Inactivo",
  },
];

export default function CargaAcademicaPage() {
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
        title="Carga Académica"
        subtitle="Gestión de asignaciones académicas"
        actions={
          currentUserRole !== "docente" && (
            <Button
              onClick={() =>
                setShowCreateModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Plus size={20} />
                Nueva Carga
              </div>
            </Button>
          )
        }
      />

      {/* STATS */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="w-fit rounded-2xl bg-cyan-100 p-4">
            <ClipboardList
              className="text-cyan-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            148
          </h2>

          <p className="mt-2 text-slate-500">
            Cargas registradas
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-violet-100 p-4">
            <Users
              className="text-violet-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            42
          </h2>

          <p className="mt-2 text-slate-500">
            Docentes asignados
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-emerald-100 p-4">
            <BookOpen
              className="text-emerald-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            87
          </h2>

          <p className="mt-2 text-slate-500">
            Materias activas
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-orange-100 p-4">
            <Calendar
              className="text-orange-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            36
          </h2>

          <p className="mt-2 text-slate-500">
            Horarios ocupados
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
                placeholder="Buscar carga académica..."
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
              <option>Programa</option>
            </select>

            <select className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-cyan-400">
              <option>Docente</option>
            </select>

            <select className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-cyan-400">
              <option>Día</option>
            </select>
          </div>
        </Card>
      </div>

      {/* TABLE */}
      <div className="mt-8">
        <Card>
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-cyan-100 p-4">
              <GraduationCap
                className="text-cyan-600"
                size={30}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Cargas Académicas
              </h2>

              <p className="text-slate-500">
                Asignaciones institucionales
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[1300px]">
              <thead className="bg-cyan-50">
                <tr>
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
                    Aula
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Grupo
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Día
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Hora
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Periodo
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
                {cargas.map((carga) => (
                  <tr
                    key={carga.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5 font-medium text-slate-800">
                      {carga.programa}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {carga.materia}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {carga.docente}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {carga.aula}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {carga.grupo}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {carga.dia}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {carga.hora}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {carga.periodo}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={carga.estado}
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
                          "docente" && (
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
        <div className="max-w-[900px] w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Nueva Carga Académica
            </h2>

            <p className="mt-2 text-slate-500">
              Asigna materias y horarios
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Programa"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Materia"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

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

            <input
              type="text"
              placeholder="Grupo"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Periodo"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Día</option>
              <option>Lunes</option>
              <option>Martes</option>
              <option>Miércoles</option>
              <option>Jueves</option>
              <option>Viernes</option>
            </select>

            <input
              type="time"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />
          </form>

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancelar
            </Button>

            <Button>
              Crear Carga
            </Button>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal open={showEditModal}>
        <div className="max-w-[900px] w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Editar Carga Académica
            </h2>

            <p className="mt-2 text-slate-500">
              Modifica la asignación académica
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
            <input
              defaultValue="Ingeniería de Sistemas"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="Programación I"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="Carlos Martínez"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="A-201"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="01"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="2026-1"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />
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
              Detalle de Carga
            </h2>

            <p className="mt-2 text-slate-500">
              Información académica completa
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <p className="text-slate-500">
                Programa
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                Ingeniería de Sistemas
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
                Docente
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                Carlos Martínez
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Aula
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                A-201
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Horario
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                Lunes - 08:00 AM
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Estado
              </p>

              <div className="mt-4">
                <StatusBadge status="Activo" />
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