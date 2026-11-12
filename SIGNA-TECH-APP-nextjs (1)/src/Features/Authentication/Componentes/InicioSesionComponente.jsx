"use client";


import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { autenticarUsuario } from "../funcionalidades/funciones";

export default function InicioSesionComponente() {
  const router = useRouter();
  const navigate = (ruta) => router.push(ruta);

  const [mensaje, setMensaje] = useState("");
  const [inicioExitoso, setInicioExitoso] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const formulario = new FormData(event.currentTarget);

    const usuario = autenticarUsuario(
      String(formulario.get("email") ?? ""),
      String(formulario.get("password") ?? "")
    );

    if (!usuario) {
      setInicioExitoso(false);
      setMensaje("");
      window.alert("Correo o contraseña incorrectos, o cuenta inactiva.");
      return;
    }

    const recordarSesion = formulario.get("remember") === "on";
    const almacenamiento = recordarSesion ? localStorage : sessionStorage;

    (recordarSesion ? sessionStorage : localStorage).removeItem("usuario");
    almacenamiento.setItem("usuario", JSON.stringify(usuario));
    setInicioExitoso(true);
    setMensaje("");

    // Redireccionar según el rol del usuario
    switch (usuario.rol) {
      case "operador":
        navigate("/operador");
        break;

      case "administrador":
        navigate("/administrador");
        break;

      case "interprete":
        navigate("/interprete");
        break;

      default:
        setInicioExitoso(false);
        setMensaje("El usuario no tiene un módulo asignado.");
        break;
    }
  }

  return (
    <>
      <article className="w-full max-w-[590px] rounded-[20px] border border-cyan-400/60 bg-slate-800/90 p-3 shadow-[0_0_28px_rgba(34,211,238,0.2)] backdrop-blur-sm sm:p-4">
        <h1 className="text-left text-2xl font-bold text-sky-400 sm:text-3xl">
          Bienvenido
        </h1>

        <p className="mb-3 mt-1 text-left text-sm text-white sm:text-base">
          Inicia sesión para acceder a tu cuenta
        </p>

        <form
          className="flex flex-col gap-2.5"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <label
              className="text-base text-white"
              htmlFor="email"
            >
              Correo electrónico
            </label>

            <input
              className="mt-1 w-full rounded-[10px] border border-slate-400 bg-slate-700 px-3 py-2 text-white placeholder:text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              id="email"
              name="email"
              type="email"
              placeholder="tu@gmail.com"
              required
            />
          </fieldset>

          <fieldset>
            <legend className="sr-only">
              Contraseña
            </legend>

            <section className="flex items-center justify-between gap-3">
              <label
                className="text-base text-white"
                htmlFor="password"
              >
                Contraseña
              </label>

              <Link
                className="text-sm text-cyan-400 hover:underline"
                href="/recuperar-contrasena"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </section>

            <span className="relative mt-1 block">
              <input
                className="w-full rounded-[10px] border border-slate-400 bg-slate-700 px-3 py-2 pr-12 text-white placeholder:text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                id="password"
                name="password"
                type={mostrarContrasena ? "text" : "password"}
                placeholder="••••••••••••"
                required
              />

              <button
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-300 hover:text-cyan-300 focus:outline-none"
                type="button"
                onClick={() =>
                  setMostrarContrasena((visible) => !visible)
                }
                aria-label={
                  mostrarContrasena
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                aria-pressed={mostrarContrasena}
              >
                <span
                  aria-hidden="true"
                  className="text-xl leading-none"
                >
                  {mostrarContrasena ? "🙈" : "👁️"}
                </span>
              </button>
            </span>
          </fieldset>

          <label className="flex items-center gap-2 text-base text-white">
            <input
              className="h-5 w-5 accent-sky-500"
              name="remember"
              type="checkbox"
            />

            Recordar mi sesión
          </label>

          {mensaje && (
            <p
              className={
                inicioExitoso
                  ? "text-sm text-emerald-300"
                  : "text-sm text-rose-300"
              }
              role="status"
              aria-live="polite"
            >
              {mensaje}
            </p>
          )}

          <button
            className="w-full rounded-full bg-gradient-to-r from-blue-800 via-sky-600 to-cyan-400 px-3 py-2.5 text-base font-medium text-white shadow-[0_0_18px_rgba(34,211,238,0.3)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900"
            type="submit"
          >
            Iniciar sesión{" "}
            <span aria-hidden="true">→</span>
          </button>

          <section className="flex items-center gap-3 text-sm text-white before:h-px before:flex-1 before:bg-slate-400/70 after:h-px after:flex-1 after:bg-slate-400/70">
            <span className="whitespace-nowrap">
              ¿Nuevo en SIGNA-TECH?
            </span>
          </section>

          <Link
            className="block w-full rounded-full border border-slate-100 px-3 py-2 text-center text-base font-medium text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            href="/crear-cuenta"
          >
            Crear Cuenta
          </Link>
        </form>
      </article>
    </>
  );
}
