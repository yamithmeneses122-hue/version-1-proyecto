"use client";

import { useState } from 'react';
import {
  CameraIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

export default function ControlesSenalAvatar({ onSubmitText, onAudioAction, onVideoAction }) {
  const [textoInput, setTextoInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!textoInput.trim()) return;
    onSubmitText(textoInput.trim());
    setTextoInput('');
  };

  const channelClass = 'rounded-2xl border border-slate-700 bg-slate-950/50 p-4';
  const buttonClass = 'flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all';

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit} id="form-control-avatar">
        <fieldset className={channelClass}>
          <legend className="flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-300">
            <PencilSquareIcon className="h-4 w-4" />
            Canal A · Texto
          </legend>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">Convierte una palabra o frase en movimiento de señas.</p>
          <section className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              id="input-texto-avatar"
              value={textoInput}
              onChange={(event) => setTextoInput(event.target.value)}
              placeholder="Ejemplo: Hola, gracias..."
              className="w-full flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
            <button type="submit" className={`${buttonClass} border-cyan-400 bg-cyan-500 text-slate-950 hover:bg-cyan-300 sm:w-auto`}>
              <PaperAirplaneIcon className="h-5 w-5" />
              Enviar
            </button>
          </section>
        </fieldset>

        <fieldset className={channelClass}>
          <legend className="flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-300">
            <MicrophoneIcon className="h-4 w-4" />
            Canal B · Audio
          </legend>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">Sincroniza el micrófono para convertir voz en señas.</p>
          <button type="button" className={`${buttonClass} mt-4 border-cyan-400/30 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500 hover:text-slate-950`} onClick={onAudioAction}>
            <MicrophoneIcon className="h-5 w-5" />
            Activar reconocimiento de voz
          </button>
        </fieldset>

        <fieldset className={channelClass}>
          <legend className="flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-300">
            <CameraIcon className="h-4 w-4" />
            Canal C · Video
          </legend>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">Vincula el streaming de las gafas para auditar la traducción.</p>
          <button type="button" className={`${buttonClass} mt-4 border-cyan-400/30 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500 hover:text-slate-950`} onClick={onVideoAction}>
            <CameraIcon className="h-5 w-5" />
            Vincular streaming de video
          </button>
        </fieldset>
      </form>
    </>
  );
}
