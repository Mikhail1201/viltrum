// app/usuarios/page.tsx

"use client";

import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

import {
  Search,
  Users,
  Pencil,
  Upload,
  UserCog,
  ShieldCheck,
  Plus,
} from "lucide-react";

const currentUserRole = "admin";

const allowedRoles = ["admin", "coordinador"];

const users = [
  {
    id: 1,
    nombre: "Miguel",
    apellido: "Alzate",
    correo: "miguel@gmail.com",
    rol: "Admin",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juan@gmail.com",
    rol: "Docente",
    estado: "Inactivo",
  },
  {
    id: 3,
    nombre: "Laura",
    apellido: "Gómez",
    correo: "laura@gmail.com",
    rol: "Estudiante",
    estado: "Egresado",
  },
];

export default function UsuariosPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  if (!allowedRoles.includes(currentUserRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4ff]">
        <div className="rounded-[32px] border border-red-100 bg-white p-12 shadow-xl">
          <ShieldCheck className="mx-auto mb-6 text-red-500" size={60} />

          <h1 className="text-center text-4xl font-bold text-slate-800">
            Acceso denegado
          </h1>

          <p className="mt-4 text-center text-slate-500">
            No tienes permisos para acceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title="Gestión de Usuarios"
        subtitle="Administra los usuarios del sistema académico"
        actions={
          <div className="flex gap-4">
            <Button
              variant="emerald"
              onClick={() => setShowExcelModal(true)}
            >
              <div className="flex items-center gap-2">
                <Upload size={20} />
                Importar Excel
              </div>
            </Button>

            <Button
              onClick={() => setShowCreateModal(true)}
            >
              <div className="flex items-center gap-2">
                <Plus size={20} />
                Nuevo Usuario
              </div>
            </Button>
          </div>
        }
      />

      {/* SEARCH */}
      <div className="mt-8">
        <Card>
          <div className="flex items-center gap-4">
            <Search className="text-slate-400" size={24} />

            <input
              type="text"
              placeholder="Buscar usuarios..."
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

      {/* USERS TABLE */}
      <div className="mt-8">
        <Card>
          {/* TITLE */}
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-cyan-100 p-4">
              <Users className="text-cyan-600" size={30} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Usuarios registrados
              </h2>

              <p className="text-slate-500">
                Lista general de usuarios
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-3xl border border-slate-100">
            <table className="w-full">
              <thead className="bg-cyan-50">
                <tr>
                  <th className="px-6 py-5 text-left text-slate-700">
                    Nombre
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Correo
                  </th>

                  <th className="px-6 py-5 text-left text-slate-700">
                    Rol
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
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-800">
                        {user.nombre} {user.apellido}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {user.correo}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-600">
                        {user.rol}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={user.estado}
                      />
                    </td>

                    <td className="px-6 py-5">
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
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-cyan-100 p-4">
              <UserCog
                className="text-cyan-600"
                size={30}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Crear Usuario
              </h2>

              <p className="text-slate-500">
                Añade un nuevo usuario
              </p>
            </div>
          </div>

          <form className="grid grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nombre"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              placeholder="Apellido"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="email"
              placeholder="Correo"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Seleccionar Rol</option>
              <option>Admin</option>
              <option>Coordinador</option>
              <option>Docente</option>
              <option>Estudiante</option>
            </select>

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Estado</option>
              <option>Activo</option>
              <option>Inactivo</option>
              <option>Egresado</option>
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
              Guardar Usuario
            </Button>
          </div>
        </div>
      </Modal>

      {/* EXCEL MODAL */}
      <Modal open={showExcelModal}>
        <div className="w-full max-w-2xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-emerald-100 p-4">
              <Upload
                className="text-emerald-600"
                size={30}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Importar Usuarios
              </h2>

              <p className="text-slate-500">
                Carga usuarios mediante Excel
              </p>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-12 text-center">
            <Upload
              className="mx-auto mb-6 text-emerald-500"
              size={50}
            />

            <h3 className="text-2xl font-bold text-slate-700">
              Selecciona un archivo Excel
            </h3>

            <p className="mt-3 text-slate-500">
              Formatos permitidos: .xlsx .xls
            </p>

            <button className="mt-8 rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white transition-all hover:bg-emerald-400">
              Seleccionar archivo
            </button>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() =>
                setShowExcelModal(false)
              }
            >
              Cancelar
            </Button>

            <Button variant="emerald">
              Importar Usuarios
            </Button>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal open={showEditModal}>
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Editar Usuario
            </h2>

            <p className="mt-2 text-slate-500">
              Modifica la información del usuario
            </p>
          </div>

          <form className="grid grid-cols-2 gap-6">
            <input
              type="text"
              defaultValue="Miguel"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="text"
              defaultValue="Alzate"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <input
              type="email"
              defaultValue="miguel@gmail.com"
              className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400"
            />

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Admin</option>
              <option>Coordinador</option>
              <option>Docente</option>
              <option>Estudiante</option>
            </select>

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Activo</option>
              <option>Inactivo</option>
              <option>Egresado</option>
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
              Actualizar Usuario
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}