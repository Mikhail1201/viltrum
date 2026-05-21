// app/aulas/page.tsx

"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  DoorClosed,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ShieldAlert,
  Building2,
  Users,
  MonitorSmartphone,
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
  - visualizar aulas

  ESTUDIANTE:
  - visualizar aulas
*/

const allowedRoles = [
  "admin",
  "coordinador",
  "docente",
  "estudiante",
];

const aulas = [
  {
    id: 1,
    codigo: "A-101",
    bloque: "Bloque A",
    capacidad: 40,
    tipo: "Teórica",
    estado: "Disponible",
  },

  {
    id: 2,
    codigo: "LAB-02",
    bloque: "Bloque B",
    capacidad: 25,
    tipo: "Laboratorio",
    estado: "Ocupada",
  },

  {
    id: 3,
    codigo: "AUD-01",
    bloque: "Auditorio",
    capacidad: 120,
    tipo: "Auditorio",
    estado: "Mantenimiento",
  },
];

export default function AulasPage() {
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
        title="Aulas"
        subtitle="Gestión institucional de aulas"
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
                Nueva Aula
              </div>
            </Button>
          )
        }
      />

      {/* STATS */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="w-fit rounded-2xl bg-cyan-100 p-4">
            <DoorClosed
              className="text-cyan-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            48
          </h2>

          <p className="mt-2 text-slate-500">
            Aulas registradas
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
            2.1K
          </h2>

          <p className="mt-2 text-slate-500">
            Capacidad total
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
            6
          </h2>

          <p className="mt-2 text-slate-500">
            Bloques
          </p>
        </Card>

        <Card>
          <div className="w-fit rounded-2xl bg-orange-100 p-4">
            <MonitorSmartphone
              className="text-orange-600"
              size={28}
            />
          </div>

          <h2 className="mt-6 text-5xl font-bold text-slate-800">
            14
          </h2>

          <p className="mt-2 text-slate-500">
            Laboratorios
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
                placeholder="Buscar aula..."
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
              <option>Tipo</option>
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
              <DoorClosed
                className="text-cyan-600"
                size={30}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Gestión de Aulas
              </h2>

              <p className="text-slate-500">
                Control de espacios académicos
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
                    Bloque
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Capacidad
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Tipo
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
                {aulas.map((aula) => (
                  <tr
                    key={aula.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5 font-medium text-slate-800">
                      {aula.codigo}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {aula.bloque}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {aula.capacidad}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {aula.tipo}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={aula.estado}
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
              Nueva Aula
            </h2>

            <p className="mt-2 text-slate-500">
              Registrar nueva aula académica
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
              placeholder="Bloque"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="number"
              placeholder="Capacidad"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Tipo</option>
              <option>Teórica</option>
              <option>Laboratorio</option>
              <option>Auditorio</option>
            </select>

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Estado</option>
              <option>Disponible</option>
              <option>Ocupada</option>
              <option>Mantenimiento</option>
            </select>
          </form>

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancelar
            </Button>

            <Button>
              Crear Aula
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}