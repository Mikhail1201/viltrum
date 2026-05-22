// app/microcurriculos/page.tsx

"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  FileText,
  Search,
  Plus,
  Eye,
  Pencil,
  Download,
  BookOpen,
  GraduationCap,
  ClipboardList,
  ShieldAlert,
  Clock3,
} from "lucide-react";

/*
  ROLES

  ADMIN:
  - ve todo
  - crea
  - edita
  - descarga

  COORDINADOR:
  - crea
  - edita
  - visualiza
  - descarga

  DOCENTE:
  - solo visualiza

  ESTUDIANTE:
  - no accede
*/

const allowedRoles = [
  "admin",
  "coordinador",
  "docente",
];

const microcurriculos = [
  {
    id: 1,
    materia: "Programación I",
    facultad: "Ingeniería",
    docente: "Carlos Martínez",
    creditos: 4,
    estado: "Activo",
  },
  {
    id: 2,
    materia: "Bases de Datos",
    facultad: "Ingeniería",
    docente: "Laura Gómez",
    creditos: 3,
    estado: "Activo",
  },
  {
    id: 3,
    materia: "Derecho Constitucional",
    facultad: "Derecho",
    docente: "Miguel Torres",
    creditos: 2,
    estado: "Inactivo",
  },
];

export default function MicrocurriculosPage() {
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
        title="Microcurrículos"
        subtitle="Gestión académica de contenidos curriculares"
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
                Nuevo Microcurrículo
              </div>
            </Button>
          )
        }
      />

      {/* STATS */}
      {(currentUserRole === "admin" ||
        currentUserRole ===
          "coordinador") && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <div className="rounded-2xl bg-cyan-100 p-4 w-fit">
              <FileText
                className="text-cyan-600"
                size={28}
              />
            </div>

            <h2 className="mt-6 text-5xl font-bold text-slate-800">
              86
            </h2>

            <p className="mt-2 text-slate-500">
              Microcurrículos registrados
            </p>
          </Card>

          <Card>
            <div className="rounded-2xl bg-violet-100 p-4 w-fit">
              <BookOpen
                className="text-violet-600"
                size={28}
              />
            </div>

            <h2 className="mt-6 text-5xl font-bold text-slate-800">
              214
            </h2>

            <p className="mt-2 text-slate-500">
              Materias activas
            </p>
          </Card>

          <Card>
            <div className="rounded-2xl bg-emerald-100 p-4 w-fit">
              <GraduationCap
                className="text-emerald-600"
                size={28}
              />
            </div>

            <h2 className="mt-6 text-5xl font-bold text-slate-800">
              12
            </h2>

            <p className="mt-2 text-slate-500">
              Facultades vinculadas
            </p>
          </Card>

          <Card>
            <div className="rounded-2xl bg-orange-100 p-4 w-fit">
              <Clock3
                className="text-orange-600"
                size={28}
              />
            </div>

            <h2 className="mt-6 text-5xl font-bold text-slate-800">
              48h
            </h2>

            <p className="mt-2 text-slate-500">
              Promedio semanal
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
              size={24}
            />

            <input
              type="text"
              placeholder="Buscar microcurrículo..."
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
              <ClipboardList
                className="text-cyan-600"
                size={30}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Microcurrículos registrados
              </h2>

              <p className="text-slate-500">
                Gestión curricular institucional
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-cyan-50">
                <tr>
                  <th className="px-6 py-5 text-left text-slate-700">
                    Materia
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Facultad
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Docente
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Créditos
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
                {microcurriculos.map((micro) => (
                  <tr
                    key={micro.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-cyan-100 p-3">
                          <FileText
                            className="text-cyan-600"
                            size={20}
                          />
                        </div>

                        <p className="font-semibold text-slate-800">
                          {micro.materia}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {micro.facultad}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {micro.docente}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {micro.creditos}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={micro.estado}
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

                        {/* EDITAR SOLO ADMIN Y COORDINADOR */}
                        {(currentUserRole ===
                          "admin" ||
                          currentUserRole ===
                            "coordinador") && (
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

                        {/* DESCARGAR */}
                        <button
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            bg-emerald-500
                            px-4
                            py-3
                            text-white
                            transition-all
                            hover:bg-emerald-400
                          "
                        >
                          <Download size={18} />
                          Descargar
                        </button>
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
        <div className="w-[800px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Crear Microcurrículo
            </h2>

            <p className="mt-2 text-slate-500">
              Registra un nuevo contenido curricular
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nombre de la materia"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Facultad"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Docente responsable"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="number"
              placeholder="Créditos"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <textarea
              placeholder="Descripción del microcurrículo"
              className="
                col-span-2
                h-40
                rounded-2xl
                border
                border-slate-200
                p-4
                text-slate-700
                outline-cyan-400
                resize-none
              "
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Estado</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </form>

          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() =>
                setShowCreateModal(false)
              }
            >
              Cancelar
            </Button>

            <Button>
              Crear Microcurrículo
            </Button>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal open={showEditModal}>
        <div className="w-[800px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Editar Microcurrículo
            </h2>

            <p className="mt-2 text-slate-500">
              Modifica información curricular
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
            <input
              type="text"
              defaultValue="Programación I"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

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
              defaultValue="4"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <textarea
              defaultValue="Introducción a fundamentos de programación..."
              className="
                col-span-2
                h-40
                rounded-2xl
                border
                border-slate-200
                p-4
                text-slate-700
                outline-cyan-400
                resize-none
              "
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </form>

          <div className="mt-8 flex justify-end gap-4">
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
        <div className="w-[850px]">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-3xl bg-cyan-100 p-5">
              <FileText
                className="text-cyan-600"
                size={36}
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-800">
                Programación I
              </h2>

              <p className="text-slate-500">
                Información completa del microcurrículo
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <p className="text-slate-500">
                Facultad
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                Ingeniería
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Docente
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                Carlos Martínez
              </h3>
            </Card>

            <Card>
              <p className="text-slate-500">
                Créditos
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                4
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

            <div className="col-span-2">
              <Card>
                <p className="text-slate-500">
                  Descripción
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  Introducción a fundamentos de
                  programación, algoritmos,
                  estructuras básicas y resolución
                  de problemas utilizando lógica
                  computacional.
                </p>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() =>
                setShowViewModal(false)
              }
            >
              Cerrar
            </Button>

            <Button>
              Descargar PDF
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}