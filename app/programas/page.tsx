// app/programas/page.tsx

"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  GraduationCap,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ShieldAlert,
  Building2,
  Users,
  BookOpen,
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
  - visualizar programas

  ESTUDIANTE:
  - visualizar SU programa
*/

const allowedRoles = [
  "admin",
  "coordinador",
];

const programas = [
  {
    id: 1,
    codigo: "ING-SIS",
    nombre: "Ingeniería de Sistemas",
    facultad: "Ingeniería",
    duracion: "10 semestres",
    estudiantes: 420,
    estado: "Activo",
  },

  {
    id: 2,
    codigo: "DER-001",
    nombre: "Derecho",
    facultad: "Derecho",
    duracion: "10 semestres",
    estudiantes: 310,
    estado: "Activo",
  },

  {
    id: 3,
    codigo: "ADM-002",
    nombre: "Administración de Empresas",
    facultad: "Ciencias Económicas",
    duracion: "8 semestres",
    estudiantes: 280,
    estado: "Inactivo",
  },
];

export default function ProgramasPage() {
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
            ? "Mi Programa"
            : "Programas Académicos"
        }
        subtitle="Gestión institucional de programas"
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
                Nuevo Programa
              </div>
            </Button>
          )
        }
      />

      {/* STATS */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="w-fit rounded-2xl bg-cyan-100 p-4">
            <GraduationCap
              className="text-cyan-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            24
          </h2>

          <p className="mt-2 text-slate-500">
            Programas activos
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-violet-100 p-4">
            <Building2
              className="text-violet-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            8
          </h2>

          <p className="mt-2 text-slate-500">
            Facultades
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-emerald-100 p-4">
            <Users
              className="text-emerald-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            5.2K
          </h2>

          <p className="mt-2 text-slate-500">
            Estudiantes
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-orange-100 p-4">
            <BookOpen
              className="text-orange-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            310
          </h2>

          <p className="mt-2 text-slate-500">
            Materias asociadas
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
                placeholder="Buscar programa..."
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
              <option>Facultad</option>
            </select>

            <select className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-cyan-400">
              <option>Estado</option>
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
                Programas Académicos
              </h2>

              <p className="text-slate-500">
                Gestión institucional universitaria
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-cyan-50">
                <tr>
                  <th className="px-6 py-5 text-left text-slate-700">
                    Código
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Programa
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Facultad
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Duración
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Estudiantes
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
                {programas.map((programa) => (
                  <tr
                    key={programa.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5 font-medium text-slate-800">
                      {programa.codigo}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {programa.nombre}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {programa.facultad}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {programa.duracion}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {programa.estudiantes}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={programa.estado}
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
        <div className="w-full max-w-[850px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Nuevo Programa
            </h2>

            <p className="mt-2 text-slate-500">
              Registra un nuevo programa académico
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Código"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Nombre del programa"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Facultad"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Duración"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Estado</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </form>

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancelar
            </Button>

            <Button>
              Crear Programa
            </Button>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal open={showEditModal}>
        <div className="w-full max-w-[850px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Editar Programa
            </h2>

            <p className="mt-2 text-slate-500">
              Modifica la información del programa
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
            <input
              defaultValue="ING-SIS"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="Ingeniería de Sistemas"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="Ingeniería"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              defaultValue="10 semestres"
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
        <div className="w-full max-w-[850px]">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-800">
              Ingeniería de Sistemas
            </h2>

            <p className="mt-2 text-slate-500">
              Información completa del programa
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <p className="text-slate-500">
                Código
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                ING-SIS
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Facultad
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                Ingeniería
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Duración
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                10 semestres
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Estudiantes
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-800">
                420
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