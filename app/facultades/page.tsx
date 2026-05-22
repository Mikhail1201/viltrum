// app/facultades/page.tsx

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
  - acceso completo

  COORDINADOR:
  - solo visualizar facultades
  - NO puede crear
  - NO puede editar
  - NO ve estadísticas administrativas
*/

const allowedRoles = [
  "admin",
  "coordinador",
];

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
  const [role, setRole] = useState("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  useEffect(() => {
    const savedRole =
      localStorage.getItem("role");

    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  if (
    role &&
    !allowedRoles.includes(role)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4ff] p-6">
        <div
          className="
            w-full
            max-w-xl
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

          <p
            className="
              mt-4
              text-center
              text-sm
              text-slate-500
              sm:text-base
            "
          >
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
        title="Facultades"
        subtitle="Gestión y administración de facultades"
        actions={
          role === "admin" && (
            <Button
              onClick={() =>
                setShowCreateModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Plus size={18} />

                <span className="text-sm sm:text-base">
                  Nueva Facultad
                </span>
              </div>
            </Button>
          )
        }
      />

      {/* SOLO ADMIN VE ESTADÍSTICAS */}
      {role === "admin" && (
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          <Card>
            <div className="w-fit rounded-2xl bg-cyan-100 p-4">
              <Building2
                className="text-cyan-600"
                size={28}
              />
            </div>

            <h2
              className="
                mt-6
                text-3xl
                font-bold
                text-slate-800
                sm:text-4xl
              "
            >
              12
            </h2>

            <p className="mt-2 text-slate-500">
              Facultades registradas
            </p>
          </Card>

          <Card>
            <div className="w-fit rounded-2xl bg-emerald-100 p-4">
              <Users
                className="text-emerald-600"
                size={28}
              />
            </div>

            <h2
              className="
                mt-6
                text-3xl
                font-bold
                text-slate-800
                sm:text-4xl
              "
            >
              4,280
            </h2>

            <p className="mt-2 text-slate-500">
              Estudiantes activos
            </p>
          </Card>

          <Card>
            <div className="w-fit rounded-2xl bg-violet-100 p-4">
              <BookOpen
                className="text-violet-600"
                size={28}
              />
            </div>

            <h2
              className="
                mt-6
                text-3xl
                font-bold
                text-slate-800
                sm:text-4xl
              "
            >
              214
            </h2>

            <p className="mt-2 text-slate-500">
              Materias disponibles
            </p>
          </Card>
        </div>
      )}

      {/* SEARCH */}
      <div className="mt-8">
        <Card>
          <div className="flex items-center gap-4">
            <Search
              className="text-slate-400"
              size={22}
            />

            <input
              type="text"
              placeholder="Buscar facultad..."
              className="
                w-full
                bg-transparent
                text-sm
                text-slate-700
                outline-none
                placeholder:text-slate-400
                sm:text-lg
              "
            />
          </div>
        </Card>
      </div>

      {/* TABLE */}
      <div className="mt-8">
        <Card>
          {/* TITLE */}
          <div
            className="
              mb-8
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
            "
          >
            <div className="rounded-2xl bg-cyan-100 p-4">
              <GraduationCap
                className="text-cyan-600"
                size={30}
              />
            </div>

            <div>
              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                  sm:text-3xl
                "
              >
                Facultades registradas
              </h2>

              <p className="text-slate-500">
                Información general de
                facultades
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div
            className="
              overflow-x-auto
              rounded-3xl
              border
              border-slate-100
            "
          >
            <table className="min-w-[900px] w-full">
              <thead className="bg-cyan-50">
                <tr>
                  <th className="px-4 py-5 text-left text-sm text-slate-700 sm:px-6">
                    Facultad
                  </th>

                  <th className="px-4 py-5 text-left text-sm text-slate-700 sm:px-6">
                    Director
                  </th>

                  <th className="px-4 py-5 text-left text-sm text-slate-700 sm:px-6">
                    Estudiantes
                  </th>

                  <th className="px-4 py-5 text-left text-sm text-slate-700 sm:px-6">
                    Materias
                  </th>

                  <th className="px-4 py-5 text-left text-sm text-slate-700 sm:px-6">
                    Estado
                  </th>

                  <th className="px-4 py-5 text-left text-sm text-slate-700 sm:px-6">
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
                    <td className="px-4 py-5 sm:px-6">
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

                    <td className="px-4 py-5 text-slate-600 sm:px-6">
                      {facultad.director}
                    </td>

                    <td className="px-4 py-5 text-slate-600 sm:px-6">
                      {
                        facultad.estudiantes
                      }
                    </td>

                    <td className="px-4 py-5 text-slate-600 sm:px-6">
                      {facultad.materias}
                    </td>

                    <td className="px-4 py-5 sm:px-6">
                      <StatusBadge
                        status={facultad.estado}
                      />
                    </td>

                    <td className="px-4 py-5 sm:px-6">
                      <div className="flex flex-wrap gap-3">
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
                            text-sm
                            text-slate-700
                            transition-all
                            hover:bg-slate-200
                          "
                        >
                          <Eye size={16} />
                          Ver
                        </button>

                        {/* SOLO ADMIN */}
                        {role === "admin" && (
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
                            <Pencil size={16} />
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
        <div className="w-full max-w-3xl">
          <div className="mb-8">
            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
                sm:text-3xl
              "
            >
              Crear Facultad
            </h2>

            <p className="mt-2 text-slate-500">
              Registra una nueva facultad
            </p>
          </div>

          <form
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
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

          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:justify-end
            "
          >
            <Button
              variant="outline"
              onClick={() =>
                setShowCreateModal(false)
              }
            >
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
        <div className="w-full max-w-3xl">
          <div className="mb-8">
            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
                sm:text-3xl
              "
            >
              Editar Facultad
            </h2>

            <p className="mt-2 text-slate-500">
              Modifica la información de la
              facultad
            </p>
          </div>

          <form
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
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

          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:justify-end
            "
          >
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
        <div className="w-full max-w-3xl">
          <div
            className="
              mb-8
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
            "
          >
            <div className="rounded-3xl bg-cyan-100 p-5">
              <GraduationCap
                className="text-cyan-600"
                size={36}
              />
            </div>

            <div>
              <h2
                className="
                  text-3xl
                  font-bold
                  text-slate-800
                  sm:text-4xl
                "
              >
                Ingeniería
              </h2>

              <p className="text-slate-500">
                Información completa de la
                facultad
              </p>
            </div>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
            "
          >
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

          <div
            className="
              mt-8
              flex
              justify-end
            "
          >
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