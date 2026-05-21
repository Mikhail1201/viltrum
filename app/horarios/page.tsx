// app/horarios/page.tsx

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

const allowedRoles = [
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
    useState("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role) {
      setCurrentUserRole(role);
    }
  }, []);

  if (
    currentUserRole &&
    !allowedRoles.includes(currentUserRole)
  ) {
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
            ? "Mi Horario"
            : currentUserRole === "docente"
            ? "Mis Horarios"
            : "Horarios"
        }
        subtitle="Gestión académica de horarios"
        actions={
          (currentUserRole === "admin" ||
            currentUserRole ===
              "coordinador") && (
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
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="w-fit rounded-2xl bg-cyan-100 p-4">
            <Calendar
              className="text-cyan-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
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

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
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

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
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

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            560
          </h2>

          <p className="mt-2 text-slate-500">
            Estudiantes asignados
          </p>
        </Card>
      </div>

      {/* FILTERS */}
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

            <select className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-cyan-400">
              <option>Programa</option>
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
                Organización académica institucional
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[1400px]">
              <thead className="bg-cyan-50">
                <tr>
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
                    Día
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Hora
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Programa
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
                      <div className="flex gap-3">
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
            <h2 className="text-3xl font-bold text-slate-800">
              Nuevo Horario
            </h2>

            <p className="mt-2 text-slate-500">
              Registrar nuevo horario académico
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
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
              <option>Lunes</option>
              <option>Martes</option>
              <option>Miércoles</option>
              <option>Jueves</option>
              <option>Viernes</option>
            </select>

            <input
              type="text"
              placeholder="08:00 AM - 10:00 AM"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />
          </form>

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
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