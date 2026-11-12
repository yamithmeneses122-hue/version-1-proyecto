"use client";

import { useEffect, useRef, useState } from "react";
import EncabezadoPagina from "./EncabezadoPagina";
import { signCategories } from "../data/interpreterData";
import { registerSign } from "../funcionalidades/interpreterActions";
import { getRegistrationDraft, saveRegistrationDraft } from "../funcionalidades/interpreterStorage";
import { validateSignForm } from "../funcionalidades/interpreterUtils";

const initialForm = { word: "", category: "Personas", meaning: "", description: "", attachment: null };
const maxAttachmentSize = 1024 * 1024;
const acceptedTypes = ["image/png", "image/jpeg", "image/webp", "video/mp4"];

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("No se pudo leer el archivo seleccionado."));
    reader.readAsDataURL(file);
  });
}

function VistaPreviaAdjunto({ attachment }) {
  if (!attachment) return null;
  if (attachment.type === "video/mp4") {
    return <video className="max-h-64 w-full rounded-xl object-contain" controls src={attachment.data}>{attachment.name}</video>;
  }
  return <img className="max-h-64 w-full rounded-xl object-contain" src={attachment.data} alt={`Vista previa: ${attachment.name}`} />;
}

export default function ContenidoRegistro() {
  const [form, setForm] = useState(() => ({ ...initialForm, ...(getRegistrationDraft() || {}) }));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [draftWarning, setDraftWarning] = useState("");
  const [readingFile, setReadingFile] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    try {
      saveRegistrationDraft(form);
      setDraftWarning("");
    } catch {
      setDraftWarning("No se pudo guardar el borrador en este dispositivo. Revisa el espacio disponible del navegador.");
    }
  }, [form]);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
    setMessage("");
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!acceptedTypes.includes(file.type)) {
      setError("El archivo debe ser PNG, JPG, WEBP o MP4.");
      event.target.value = "";
      return;
    }
    if (file.size > maxAttachmentSize) {
      setError("El archivo supera el límite de 1 MB para guardarlo en este dispositivo.");
      event.target.value = "";
      return;
    }

    setReadingFile(true);
    setError("");
    try {
      const data = await readFile(file);
      updateField("attachment", { name: file.name, type: file.type, data });
    } catch (fileError) {
      setError(fileError.message);
      event.target.value = "";
    } finally {
      setReadingFile(false);
    }
  }

  function removeAttachment() {
    updateField("attachment", null);
    if (fileInput.current) fileInput.current.value = "";
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validateSignForm(form);
    if (Object.keys(errors).length) {
      setError(Object.values(errors)[0]);
      setMessage("");
      return;
    }

    try {
      registerSign(form);
      setError("");
      setMessage(`La seña "${form.word}" fue registrada y quedó pendiente de validación.`);
      setForm(initialForm);
      if (fileInput.current) fileInput.current.value = "";
    } catch {
      setError("No se pudo guardar la seña. Revisa el espacio disponible del navegador e inténtalo de nuevo.");
      setMessage("");
    }
  }

  function clearForm() {
    setForm(initialForm);
    setMessage("");
    setError("");
    if (fileInput.current) fileInput.current.value = "";
  }

  return (
    <>
      <EncabezadoPagina title="Registrar seña" description="Agrega una nueva seña al diccionario para que pueda ser revisada por el equipo." />
      <form className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.12)]" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="mb-5 text-sm font-bold text-cyan-300">Información de la seña</legend>
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs text-slate-400">Palabra</span>
              <input className="h-11 rounded-xl border border-cyan-500/20 bg-slate-950 px-3 text-sm outline-none focus:border-cyan-400" name="word" value={form.word} onChange={(event) => updateField("word", event.target.value)} placeholder="Ej. Familia" required />
            </label>
            <label className="grid gap-2">
              <span className="text-xs text-slate-400">Categoría</span>
              <select className="h-11 rounded-xl border border-cyan-500/20 bg-slate-950 px-3 text-sm outline-none focus:border-cyan-400" name="category" value={form.category} onChange={(event) => updateField("category", event.target.value)}>
                {signCategories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs text-slate-400">Significado</span>
              <textarea className="min-h-28 rounded-xl border border-cyan-500/20 bg-slate-950 p-3 text-sm outline-none focus:border-cyan-400" name="meaning" value={form.meaning} onChange={(event) => updateField("meaning", event.target.value)} required />
            </label>
            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs text-slate-400">Descripción de la seña</span>
              <textarea className="min-h-32 rounded-xl border border-cyan-500/20 bg-slate-950 p-3 text-sm outline-none focus:border-cyan-400" name="description" value={form.description} onChange={(event) => updateField("description", event.target.value)} required />
            </label>
          </section>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="mb-3 text-sm font-bold text-cyan-300">Recurso visual</legend>
          <label className="grid min-h-40 cursor-pointer place-items-center gap-2 rounded-2xl border border-dashed border-cyan-400/30 bg-cyan-400/[0.02] p-4 text-center transition-colors hover:bg-cyan-400/[0.05]">
            <span className="text-2xl text-cyan-300" aria-hidden="true">↑</span>
            <strong className="text-sm">{readingFile ? "Cargando archivo..." : form.attachment?.name || "Selecciona una imagen o video"}</strong>
            <small className="text-xs text-slate-500">JPG, PNG, WEBP o MP4 · máximo 1 MB</small>
            <input ref={fileInput} className="sr-only" type="file" accept="image/png,image/jpeg,image/webp,video/mp4" onChange={handleFileChange} disabled={readingFile} />
          </label>
          {form.attachment && (
            <section className="mt-4 rounded-2xl border border-cyan-500/20 bg-slate-950/60 p-4">
              <VistaPreviaAdjunto attachment={form.attachment} />
              <button className="mt-3 text-xs font-semibold text-rose-300 hover:text-rose-200" type="button" onClick={removeAttachment}>Quitar recurso</button>
            </section>
          )}
          <p className="mt-2 text-xs text-slate-500" role="status">El borrador se guarda automáticamente en este dispositivo.</p>
        </fieldset>
        <footer className="mt-5 flex flex-wrap justify-end gap-2">
          <button className="rounded-xl border border-cyan-500/20 bg-slate-950/50 px-4 py-2.5 text-sm font-bold hover:bg-cyan-500/10" type="button" onClick={clearForm}>Limpiar</button>
          <button className="rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-60" type="submit" disabled={readingFile}>Registrar seña</button>
        </footer>
        {draftWarning && <p className="mt-4 text-sm text-amber-300" role="alert">{draftWarning}</p>}
        {error && <p className="mt-4 text-sm text-rose-300" role="alert">{error}</p>}
        {message && <p className="mt-4 text-sm text-emerald-300" role="status">{message}</p>}
      </form>
    </>
  );
}
