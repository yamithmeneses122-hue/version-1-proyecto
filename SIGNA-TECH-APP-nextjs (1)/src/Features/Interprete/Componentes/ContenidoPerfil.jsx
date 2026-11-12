"use client";

import { useEffect, useState } from "react";
import EncabezadoPagina from "./EncabezadoPagina";
import { getProfile, saveProfile } from "../funcionalidades/interpreterStorage";
import { getInitials } from "../funcionalidades/interpreterUtils";

export default function ContenidoPerfil() {
  const [form, setForm] = useState(getProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm(getProfile()); }, []);

  function update(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setSaved(false);
  }

  function submit(event) {
    event.preventDefault();
    saveProfile(form);
    setSaved(true);
  }

  return (
    <>
      <EncabezadoPagina title="Mi perfil" description="Administra tu información personal, preferencias y seguridad." compact />
      <form
        aria-label="Perfil del intérprete"
        className="grid grid-cols-1 gap-3 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-4"
        onSubmit={submit}
      >
        <article className="flex h-fit flex-col items-center self-center rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-4 text-center shadow-[0_0_30px_rgba(34,211,238,0.12)] lg:row-span-2">
          <header
            className="grid h-32 w-32 place-items-center rounded-2xl border-2 border-dashed border-cyan-400/30 bg-cyan-400/5 text-3xl font-black text-cyan-300"
            role="img"
            aria-label={`Espacio para la foto de perfil de ${form.name}`}
          >
            {getInitials(form.name)}
          </header>
          <h2 className="mt-3 text-base font-bold">{form.name}</h2>
          <p className="mt-1 text-sm text-slate-400">Intérprete</p>
        </article>

        <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-4 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
          <header className="mb-3">
            <h2 className="text-lg font-bold">Información personal</h2>
            <p className="mt-1 text-xs text-slate-400">Datos básicos de tu cuenta.</p>
          </header>
          <fieldset className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <legend className="sr-only">Datos personales</legend>
            <label className="grid gap-2 text-xs text-slate-400">
              Nombre
              <input className="rounded-xl border border-cyan-500/20 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400" value={form.name} onChange={(event) => update("name", event.target.value)} required />
            </label>
            <label className="grid gap-2 text-xs text-slate-400">
              Correo
              <input className="rounded-xl border border-cyan-500/20 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required />
            </label>
            <label className="grid gap-2 text-xs text-slate-400">
              Teléfono
              <input className="rounded-xl border border-cyan-500/20 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
            </label>
          </fieldset>
        </article>

        <article className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-4 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
          <header className="mb-3"><h2 className="text-lg font-bold">Preferencias</h2></header>
          <label className="flex items-center justify-between gap-4">
            <span>
              <strong className="block text-sm">Notificaciones</strong>
              <small className="text-xs text-slate-500">Recibir avisos sobre nuevas señas.</small>
            </span>
            <input className="h-5 w-5 accent-cyan-400" type="checkbox" checked={form.notifications} onChange={(event) => update("notifications", event.target.checked)} />
          </label>
        </article>

        <footer className="col-span-full flex flex-col items-center justify-center gap-2 text-center">
          <button className="rounded-xl bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-400 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_18px_rgba(34,211,238,0.2)] transition-all hover:from-blue-600 hover:via-sky-500 hover:to-cyan-300" type="submit">Guardar cambios</button>
          {saved && <span className="text-sm text-emerald-300" role="status">Cambios guardados correctamente.</span>}
        </footer>
      </form>
    </>
  );
}

