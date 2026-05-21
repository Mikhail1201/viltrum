// app/facultades/page.tsx

"use client";

import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  GraduationCap,
  Plus,
  Search,
  Building2,
  Users,
  BookOpen,
  Pencil,
  Eye,
  ShieldAlert,
} from "lucide-react";

/*
  ROLES QUE PUEDEN ENTRAR:
  - admin
  - coordinador

  ADMIN:
  - crear facultades
  - editar facultades
  - ver estadísticas

  COORDINADOR:
  - solo visualizar
*/

const currentUserRole = "admin";

const allowedRoles = ["admin", "coordinador"];

const facultades = [
  {
    id: 1,
    nombre: "Ingeniería",
    director: "Carlos Martínez",
    estudiantes: 1250,
    materias: 48,
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Ciencias Económicas",
    director: "Laura Gómez",
    estudiantes: 980,
    materias: 36,
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Derecho",
    director: "Miguel Torres",
    estudiantes: 650,
    materias: 28,
    estado: "Inactivo",
  },
];

export default function FacultadesPage() {
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
        title="Facultades"
        subtitle="Gestión y administración de facultades"
        actions={
          currentUserRole === "admin" && (
            <Button
              onClick={() =>
                setShowCreateModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Plus size={20} />
                Nueva Facultad
              </div>
            </Button>
          )
        }
      />

      {/* STATS */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <div className="rounded-2xl bg-cyan-100 p-4 w-fit">
            <Building2
              className="text-cyan-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800">
            12
          </h2>

          <p className="mt-2 text-slate-500">
            Facultades registradas
          </p>
        </Card>

        <Card>
          <div className="rounded-2xl bg-emerald-100 p-4 w-fit">
            <Users
              className="text-emerald-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800">
            4,280
          </h2>

          <p className="mt-2 text-slate-500">
            Estudiantes activos
          </p>
        </Card>

        <Card>
          <div className="rounded-2xl bg-violet-100 p-4 w-fit">
            <BookOpen
              className="text-violet-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800">
            214
          </h2>

          <p className="mt-2 text-slate-500">
            Materias disponibles
          </p>
        </Card>
      </div>

      {/* SEARCH */}
      <div className="mt-8">
        <Card>
          <div className="flex items-center gap-4">
            <Search
              className="text-slate-400"
              size={24}
            />

            <input
              type="text"
              placeholder="Buscar facultad..."
              className="
                w-full
                bg-transparent
                text-lg
                text-slate-700
                outline-none
                placeholder:text-slate-400
              "
            />
          </div>
        </Card>
      </div>

      {/* TABLE */}
      <div className="mt-8">
        <Card>
          {/* TITLE */}
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-cyan-100 p-4">
              <GraduationCap
                className="text-cyan-600"
                size={30}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Facultades registradas
              </h2>

              <p className="text-slate-500">
                Información general de facultades
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-3xl border border-slate-100">
            <table className="w-full">
              <thead className="bg-cyan-50">
                <tr>
                  <th className="px-6 py-5 text-left text-slate-700">
                    Facultad
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Director
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Estudiantes
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Materias
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
                {facultades.map((facultad) => (
                  <tr
                    key={facultad.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-cyan-100 p-3">
                          <GraduationCap
                            className="text-cyan-600"
                            size={20}
                          />
                        </div>

                        <p className="font-semibold text-slate-800">
                          {facultad.nombre}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {facultad.director}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {facultad.estudiantes}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {facultad.materias}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={facultad.estado}
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

                        {/* SOLO ADMIN */}
                        {currentUserRole ===
                          "admin" && (
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
        <div className="w-[700px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Crear Facultad
            </h2>

            <p className="mt-2 text-slate-500">
              Registra una nueva facultad
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nombre de la facultad"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Director"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="number"
              placeholder="Cantidad de estudiantes"
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
              Crear Facultad
            </Button>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal open={showEditModal}>
        <div className="w-[700px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Editar Facultad
            </h2>

            <p className="mt-2 text-slate-500">
              Modifica la información de la facultad
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
            <input
              type="text"
              defaultValue="Ingeniería"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              defaultValue="Carlos Martínez"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="number"
              defaultValue="1250"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Activo</option>
              <option>Inactivo</option>
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
        <div className="w-[650px]">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-3xl bg-cyan-100 p-5">
              <GraduationCap
                className="text-cyan-600"
                size={36}
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-800">
                Ingeniería
              </h2>

              <p className="text-slate-500">
                Información completa de la facultad
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <p className="text-slate-500">
                Director
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                Carlos Martínez
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

            <Card>
              <p className="text-slate-500">
                Estudiantes
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                1250
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Materias
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                48
              </h3>
            </Card>
          </div>

          <div className="mt-8 flex justify-end cursor-pointer">
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