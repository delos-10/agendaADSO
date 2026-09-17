import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Credenciales de prueba del proyecto
    if (email === "admin@sena.com" && password === "1234") {
      // Iniciar sesión
      login();

      // Abrir la Agenda ADSO original
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="min-h-screen bg-[#080b1c] text-white flex flex-col">
      

    

      <header className="h-[78px] border-b border-white/10 bg-[#080b18] flex items-center justify-between px-6 md:px-[7%]">

        <div className="flex items-center gap-3">

          {/* LOGO */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-900/30">
            <span className="text-xl font-bold">
              A
            </span>
          </div>

          {/* INFORMACIÓN */}
          <div>
            <span className="block text-[9px] tracking-[4px] text-slate-400 mb-0.5">
              PROYECTO ABP
            </span>

            <h2 className="text-base md:text-[17px] font-semibold text-slate-100">
              Agenda ADSO – ReactJS
            </h2>
          </div>

        </div>


        {/* INFORMACIÓN SENA */}

        <div className="hidden sm:flex flex-col items-end gap-1">

          <span className="text-[9px] tracking-[3px] text-slate-400">
            SENA CTMA
          </span>

          <span className="text-[11px] text-slate-300">
            Ficha 3412785
          </span>

        </div>

      </header>


      {/* ==========================================
          CONTENIDO PRINCIPAL
      ========================================== */}

      <main className="flex-1 flex items-center justify-center px-5 py-12 relative overflow-hidden">

        {/* LUZ DECORATIVA */}

        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

        <div className="absolute -bottom-40 -right-32 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />


        <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">


          {/* ==========================================
              PANEL IZQUIERDO
          ========================================== */}

          <section className="hidden lg:block">

            <div className="mb-8">

              <span className="text-xs tracking-[4px] text-purple-400 font-semibold">
                PROYECTO ABP
              </span>

              <h1 className="mt-3 text-5xl font-bold leading-tight text-white">

                Agenda ADSO

                <br />

                <span className="text-purple-500">
                  ReactJS
                </span>

              </h1>

              <p className="mt-5 max-w-md text-slate-400 text-sm leading-7">
                Gestión de contactos conectada a una API local
                con JSON Server, validaciones, búsqueda,
                ordenamiento y edición.
              </p>

            </div>


            {/* CARACTERÍSTICAS */}

            <div className="space-y-3">

              <div className="flex items-center gap-3 text-sm text-slate-300">

                <span className="w-2 h-2 rounded-full bg-green-400" />

                ReactJS

              </div>


              <div className="flex items-center gap-3 text-sm text-slate-300">

                <span className="w-2 h-2 rounded-full bg-purple-400" />

                JSON Server

              </div>


              <div className="flex items-center gap-3 text-sm text-slate-300">

                <span className="w-2 h-2 rounded-full bg-blue-400" />

                Desarrollo Web

              </div>

            </div>


            {/* INFORMACIÓN SENA */}

            <div className="mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-5">

              <p className="text-xs tracking-[3px] text-slate-500">
                SENA CTMA · ADSO
              </p>

              <p className="mt-3 text-sm font-semibold text-slate-200">
                Desarrollo Web – ReactJS
              </p>

              <p className="mt-2 text-xs text-slate-500 leading-5">
                Evidencia de aprendizaje desarrollada
                durante el proceso de formación.
              </p>

            </div>

          </section>


          {/* ==========================================
              TARJETA DE LOGIN
          ========================================== */}

          <section className="w-full max-w-md mx-auto">

            <div className="rounded-[22px] bg-[#f8f8fa] p-7 sm:p-9 shadow-2xl shadow-black/40 border border-white/80">


              {/* LOGO Y TÍTULO */}

              <div className="text-center mb-8">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-xl shadow-purple-900/30">

                  <span className="text-2xl font-bold text-white">
                    A
                  </span>

                </div>


                <span className="block mt-5 text-[10px] tracking-[3px] font-bold text-purple-600">
                  ACCESO AL SISTEMA
                </span>


                <h2 className="mt-2 text-3xl font-bold text-slate-800">

                  Bienvenido a

                  <br />

                  <span className="text-purple-600">
                    Agenda ADSO
                  </span>

                </h2>


                <p className="mt-3 text-sm text-slate-500 leading-6">
                  Inicia sesión para acceder a la agenda
                  y administrar tus contactos.
                </p>

              </div>


              {/* ==========================================
                  FORMULARIO
              ========================================== */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* CORREO */}

                <div>

                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-slate-700"
                  >
                    Correo electrónico
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej: admin@sena.com"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                  />

                </div>


                {/* CONTRASEÑA */}

                <div>

                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-semibold text-slate-700"
                  >
                    Contraseña
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                    className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                  />

                </div>


                {/* MENSAJE DE ERROR */}

                {error && (

                  <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      !
                    </span>

                    <span>
                      {error}
                    </span>

                  </div>

                )}


                {/* BOTÓN */}

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-bold shadow-lg shadow-purple-700/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-700/30 active:translate-y-0"
                >
                  Iniciar sesión
                </button>

              </form>


              {/* ==========================================
                  AVISO PEDAGÓGICO
              ========================================== */}

              <div className="mt-6 rounded-xl border border-purple-100 bg-purple-50 px-4 py-4">

                <div className="flex gap-3">

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                    i
                  </div>

                  <div>

                    <p className="text-xs font-bold text-purple-800">
                      Login pedagógico
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-purple-600">
                      Esta autenticación fue creada para
                      la actividad de React. No utilizar
                      credenciales reales.
                    </p>

                  </div>

                </div>

              </div>


              {/* ==========================================
                  CREDENCIALES DE PRUEBA
              ========================================== */}

              <div className="mt-5 border-t border-slate-200 pt-4 text-center">

                <p className="text-[11px] text-slate-400">
                  Credenciales de prueba
                </p>

                <div className="mt-2 flex justify-center gap-2 flex-wrap">

                  <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-600">
                    admin@sena.com
                  </span>

                  <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-600">
                    Contraseña: 1234
                  </span>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>


      {/* ==========================================
          FOOTER
      ========================================== */}

      <footer className="min-h-[55px] border-t border-white/10 flex items-center justify-between px-6 md:px-[7%] text-[10px] text-slate-500">

        <span>
          SENA CTMA · ADSO
        </span>

        <span>
          Desarrollo Web – ReactJS
        </span>

      </footer>

    </div>
  );
}