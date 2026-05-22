// app/login/page.tsx

"use client";

import { useState } from "react";
import {
  GraduationCap,
  Eye,
  EyeOff,
} from "lucide-react";
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
  const [password, setPassword] =
    useState("");

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
      setError(
        "Correo o contraseña incorrectos"
      );

      return;
    }

    localStorage.setItem("role", user.role);

    router.push("/");
  };

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-cyan-400
        via-sky-500
        to-blue-700
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >
      {/* BACKGROUND EFFECTS */}
      <div
        className="
          absolute
          left-[-120px]
          top-[-120px]
          h-[260px]
          w-[260px]
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[-140px]
          right-[-120px]
          h-[300px]
          w-[300px]
          rounded-full
          bg-cyan-300/20
          blur-3xl
        "
      />

      {/* LOGIN CARD */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-[32px]
          border
          border-white/20
          bg-white/10
          p-6
          shadow-2xl
          backdrop-blur-2xl
          sm:p-8
          md:rounded-[40px]
          md:p-10
        "
      >
        {/* LOGO */}
        <div className="mb-8 flex flex-col items-center sm:mb-10">
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-[24px]
              bg-white/20
              sm:h-24
              sm:w-24
              sm:rounded-[28px]
            "
          >
            <GraduationCap
              className="text-white"
              size={40}
            />
          </div>

          <h1
            className="
              mt-5
              text-center
              text-4xl
              font-bold
              text-white
              sm:mt-6
              sm:text-5xl
            "
          >
            EduSystem
          </h1>

          <p
            className="
              mt-3
              px-4
              text-center
              text-sm
              text-cyan-100
              sm:text-base
            "
          >
            Sistema académico institucional
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5 sm:space-y-6">
          {/* EMAIL */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-white
              "
            >
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
                text-sm
                text-white
                outline-none
                backdrop-blur-xl
                transition-all
                placeholder:text-cyan-100
                focus:border-cyan-300
                sm:text-base
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-white
              "
            >
              Contraseña
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
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
                  text-sm
                  text-white
                  outline-none
                  backdrop-blur-xl
                  transition-all
                  placeholder:text-cyan-100
                  focus:border-cyan-300
                  sm:text-base
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
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
                backdrop-blur-xl
              "
            >
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="
              w-full
              rounded-2xl
              bg-white
              py-4
              text-base
              font-bold
              text-cyan-600
              transition-all
              hover:scale-[1.02]
              hover:bg-cyan-50
              sm:text-lg
            "
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}