// app/login/page.tsx

"use client";

import { useState } from "react";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const users = [
  {
    email: "admin@edusystem.com",
    password: "1234",
    role: "admin",
  },
  {
    email: "coordinador@edusystem.com",
    password: "1234",
    role: "coordinador",
  },
  {
    email: "docente@edusystem.com",
    password: "1234",
    role: "docente",
  },
  {
    email: "estudiante@edusystem.com",
    password: "1234",
    role: "estudiante",
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    // GUARDAR ROL TEMPORALMENTE
    localStorage.setItem("role", user.role);

    // REDIRECT
    router.push("/");
  };

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-cyan-400
        via-sky-500
        to-blue-600
        p-6
      "
    >
      {/* CARD */}
      <div
        className="
          w-full
          max-w-md
          rounded-[40px]
          border
          border-white/20
          bg-white/10
          p-10
          shadow-2xl
          backdrop-blur-2xl
        "
      >
        {/* LOGO */}
        <div className="mb-10 flex flex-col items-center">
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-[28px]
              bg-white/20
            "
          >
            <GraduationCap
              className="text-white"
              size={48}
            />
          </div>

          <h1 className="mt-6 text-5xl font-bold text-white">
            EduSystem
          </h1>

          <p className="mt-3 text-center text-cyan-100">
            Sistema académico institucional
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Correo institucional
            </label>

            <input
              type="email"
              placeholder="Ingresa tu usuario"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/20
                bg-white/10
                p-4
                text-white
                outline-none
                backdrop-blur-xl
                placeholder:text-cyan-100
                focus:border-cyan-300
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Contraseña
            </label>

            <div className="relative">
              <input
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/10
                  p-4
                  pr-14
                  text-white
                  outline-none
                  backdrop-blur-xl
                  placeholder:text-cyan-100
                  focus:border-cyan-300
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-white
                "
              >
                {showPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div
              className="
                rounded-2xl
                border
                border-red-300/20
                bg-red-500/20
                p-4
                text-sm
                text-white
              "
            >
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="
              w-full
              rounded-2xl
              bg-white
              py-4
              text-lg
              font-bold
              text-cyan-600
              transition-all
              hover:scale-[1.02]
            "
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}