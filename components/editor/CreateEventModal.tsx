'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Sparkles, Plus, AlertCircle } from 'lucide-react';
import { getClientStoredEvents, saveClientStoredEvent } from '@/lib/clientEventStorage';
import { EventData } from '@/types/event';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  const router = useRouter();
  const allEvents = Object.values(getClientStoredEvents());

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('Mis Quince Años');
  const [date, setDate] = useState('');
  const [templateSlug, setTemplateSlug] = useState('gabriela-torres');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    const autoSlug = val
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    setSlug(autoSlug);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = name.trim();
    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    if (!cleanName) {
      setErrorMsg('Por favor ingresa el nombre de la quinceañera.');
      return;
    }

    if (!cleanSlug) {
      setErrorMsg('Por favor define un enlace o slug válido (ej. luz-garcia).');
      return;
    }

    setLoading(true);

    try {
      // 1. Obtener la plantilla base
      const currentEvents = getClientStoredEvents();
      const baseTemplate: EventData =
        currentEvents[templateSlug] ||
        currentEvents['gabriela-torres'] ||
        Object.values(currentEvents)[0];

      // 2. Construir el nuevo evento
      const newEvent: EventData = {
        ...JSON.parse(JSON.stringify(baseTemplate)),
        id: `evt-${Date.now()}`,
        slug: cleanSlug,
        name: cleanName,
        subtitle: subtitle?.trim() || 'Mis Quince Años',
        date: date || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19),
        phraseAuthor: cleanName,
      };

      // 3. Guardar de forma inmediata en el almacenamiento local del cliente
      saveClientStoredEvent(cleanSlug, newEvent);

      // 4. Notificar a la API del servidor (asíncrono con fallback)
      try {
        await fetch('/api/events/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: cleanName,
            slug: cleanSlug,
            subtitle: subtitle.trim(),
            date: date || undefined,
            templateSlug,
          }),
        });
      } catch (apiErr) {
        console.warn('API sync warning (client saved successfully):', apiErr);
      }

      onClose();
      // 5. Redirigir de inmediato al editor de la nueva quinceañera creada
      router.push(`/${cleanSlug}/editor`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Ocurrió un error al crear la invitación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#181818] border border-rosegold/30 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-amber-500 to-rose-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-white font-medium">
                Crear Nueva Invitación Web
              </h3>
              <span className="text-[11px] text-gray-400 font-sans block">
                Crea una nueva página de 15 años desde cero o clonada
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleCreate} className="space-y-4 text-left">
          {/* Nombre de la Quinceañera */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-rosegold uppercase tracking-wider block">
              Nombre de la Quinceañera *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ej. Luz García"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-rosegold transition-colors"
            />
          </div>

          {/* Enlace / Slug */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 uppercase tracking-wider block">
              Enlace de la Web (Slug) *
            </label>
            <div className="flex items-center rounded-xl bg-black/60 border border-white/10 px-3 py-2 text-xs text-gray-400">
              <span>tudominio.vercel.app/</span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="luz-garcia"
                className="bg-transparent text-rosegold-light font-mono font-medium focus:outline-none flex-1 ml-1"
              />
            </div>
          </div>

          {/* Plantilla Base para Clonar */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 uppercase tracking-wider block">
              Plantilla de Diseño Base
            </label>
            <select
              value={templateSlug}
              onChange={(e) => setTemplateSlug(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-rosegold"
            >
              {allEvents.map((evt) => (
                <option key={evt.slug} value={evt.slug}>
                  Clonar diseño de: {evt.name} ({evt.slug})
                </option>
              ))}
            </select>
            <span className="text-[10px] text-gray-400 font-light block">
              Heredará toda la estructura y diseño inmersivo para que solo reemplaces sus fotos y textos.
            </span>
          </div>

          {/* Fecha del Evento */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 uppercase tracking-wider block">
              Fecha y Hora de la Fiesta (Opcional)
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-rosegold"
            />
          </div>

          {/* Botones */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-gray-400 hover:text-white text-xs font-medium transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:opacity-95 text-white font-medium text-xs tracking-wider uppercase shadow-lg shadow-rose-950/50 disabled:opacity-50 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{loading ? 'Creando...' : 'Crear y Abrir Editor'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
