// app/usuarios/page.tsx

"use client";

import { useEffect, useState } from "react";

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

/*
  PERMISOS

  ADMIN:
  - puede crear usuarios
  - editar usuarios
  - importar excel
  - ver TODOS los roles

  COORDINADOR:
  - puede crear docentes y estudiantes
  - editar docentes y estudiantes
  - importar excel
  - NO administra admins
*/

const allowedRoles = [
  "admin",
  "coordinador",
];

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
  const [role, setRole] = useState("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showExcelModal, setShowExcelModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
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
            border
            border-red-100
            bg-white
            p-8
            shadow-xl
            sm:p-12
          "
        >
          <ShieldCheck
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
            a esta página.
          </p>
        </div>
      </div>
    );
  }

  // FILTRO SEGÚN ROL
  const filteredUsers =
    role === "coordinador"
      ? users.filter(
          (user) => user.rol !== "Admin"
        )
      : users;

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title="Gestión de Usuarios"
        subtitle="Administra los usuarios del sistema académico"
        actions={
          <div
            className="
              flex
              w-full
              flex-col
              gap-3
              sm:w-auto
              sm:flex-row
            "
          >
            <Button
              variant="emerald"
              onClick={() =>
                setShowExcelModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Upload size={18} />

                <span className="text-sm sm:text-base">
                  Importar Excel
                </span>
              </div>
            </Button>

            <Button
              onClick={() =>
                setShowCreateModal(true)
              }
            >
              <div className="flex items-center gap-2">
                <Plus size={18} />

                <span className="text-sm sm:text-base">
                  Nuevo Usuario
                </span>
              </div>
            </Button>
          </div>
        }
      />

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
              placeholder="Buscar usuarios..."
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

      {/* USERS TABLE */}
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
              <Users
                className="text-cyan-600"
                size={28}
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
                Usuarios registrados
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                  sm:text-base
                "
              >
                Lista general de usuarios
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
            <table className="min-w-[850px] w-full">
              <thead className="bg-cyan-50">
                <tr>
                  <th className="px-4 py-5 text-left text-sm text-slate-700 sm:px-6">
                    Nombre
                  </th>

                  <th className="px-4 py-5 text-left text-sm text-slate-700 sm:px-6">
                    Correo
                  </th>

                  <th className="px-4 py-5 text-left text-sm text-slate-700 sm:px-6">
                    Rol
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
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-4 py-5 sm:px-6">
                      <p className="font-semibold text-slate-800">
                        {user.nombre}{" "}
                        {user.apellido}
                      </p>
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-600 sm:px-6">
                      {user.correo}
                    </td>

                    <td className="px-4 py-5 sm:px-6">
                      <span
                        className="
                          rounded-full
                          bg-cyan-100
                          px-4
                          py-2
                          text-xs
                          font-medium
                          text-cyan-600
                          sm:text-sm
                        "
                      >
                        {user.rol}
                      </span>
                    </td>

                    <td className="px-4 py-5 sm:px-6">
                      <StatusBadge
                        status={user.estado}
                      />
                    </td>

                    <td className="px-4 py-5 sm:px-6">
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
                          text-sm
                          text-white
                          transition-all
                          hover:bg-cyan-400
                        "
                      >
                        <Pencil size={16} />
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
        <div className="w-full max-w-4xl">
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
              <UserCog
                className="text-cyan-600"
                size={28}
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
                Crear Usuario
              </h2>

              <p className="text-slate-500">
                Añade un nuevo usuario
              </p>
            </div>
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

            {/* ADMIN PUEDE CREAR TODO */}
            {role === "admin" ? (
              <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
                <option>
                  Seleccionar Rol
                </option>

                <option>Admin</option>
                <option>Coordinador</option>
                <option>Docente</option>
                <option>Estudiante</option>
              </select>
            ) : (
              <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
                <option>
                  Seleccionar Rol
                </option>

                <option>Docente</option>
                <option>Estudiante</option>
              </select>
            )}

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Estado</option>
              <option>Activo</option>
              <option>Inactivo</option>
              <option>Egresado</option>
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
              Guardar Usuario
            </Button>
          </div>
        </div>
      </Modal>

      {/* EXCEL MODAL */}
      <Modal open={showExcelModal}>
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
            <div className="rounded-2xl bg-emerald-100 p-4">
              <Upload
                className="text-emerald-600"
                size={28}
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
                Importar Usuarios
              </h2>

              <p className="text-slate-500">
                Carga usuarios mediante Excel
              </p>
            </div>
          </div>

          <div
            className="
              rounded-3xl
              border-2
              border-dashed
              border-emerald-200
              bg-emerald-50
              p-8
              text-center
              sm:p-12
            "
          >
            <Upload
              className="mx-auto mb-6 text-emerald-500"
              size={50}
            />

            <h3
              className="
                text-xl
                font-bold
                text-slate-700
                sm:text-2xl
              "
            >
              Selecciona un archivo Excel
            </h3>

            <p className="mt-3 text-slate-500">
              Formatos permitidos: .xlsx .xls
            </p>

            <button
              className="
                mt-8
                rounded-2xl
                bg-emerald-500
                px-6
                py-4
                text-sm
                font-semibold
                text-white
                transition-all
                hover:bg-emerald-400
                sm:text-base
              "
            >
              Seleccionar archivo
            </button>
          </div>

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
              Editar Usuario
            </h2>

            <p className="mt-2 text-slate-500">
              Modifica la información del
              usuario
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

            {role === "admin" ? (
              <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
                <option>Admin</option>
                <option>Coordinador</option>
                <option>Docente</option>
                <option>Estudiante</option>
              </select>
            ) : (
              <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
                <option>Docente</option>
                <option>Estudiante</option>
              </select>
            )}

            <select className="rounded-2xl border border-slate-200 p-4 text-slate-700 outline-cyan-400">
              <option>Activo</option>
              <option>Inactivo</option>
              <option>Egresado</option>
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
              Actualizar Usuario
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}