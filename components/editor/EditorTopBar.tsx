'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Smartphone,
  Tablet,
  Monitor,
  Save,
  ExternalLink,
  Sparkles,
  Check,
  ArrowLeft,
  RotateCcw,
  ChevronDown,
  Plus
} from 'lucide-react';
import { EVENTS } from '@/data/events';
import CreateEventModal from './CreateEventModal';

interface EditorTopBarProps {
  slug: string;
  name: string;
  deviceMode: 'mobile' | 'tablet' | 'desktop';
  setDeviceMode: (mode: 'mobile' | 'tablet' | 'desktop') => void;
  onSave: () => void;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  onReset: () => void;
}

export default function EditorTopBar({
  slug,
  name,
  deviceMode,
  setDeviceMode,
  onSave,
  isSaving,
  hasUnsavedChanges,
  onReset,
}: EditorTopBarProps) {
  const router = useRouter();
  const allEvents = Object.values(EVENTS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSwitchEvent = (newSlug: string) => {
    if (hasUnsavedChanges) {
      if (!confirm('Tienes cambios sin guardar. ¿Deseas cambiar de plantilla de todos modos?')) {
        return;
      }
    }
    router.push(`/${newSlug}/editor`);
  };

  return (
    <>
      <header className="h-16 bg-[#181818] border-b border-white/10 px-3 sm:px-4 flex items-center justify-between z-30 shrink-0 select-none">
        {/* Lado Izquierdo: Volver, Selector de Plantilla y Botón + Nueva */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Volver al Catálogo Principal"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 via-amber-500 to-rose-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xs sm:text-sm font-semibold text-white tracking-wide">
                  STUDIO XV
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-rosegold/20 text-rosegold-light border border-rosegold/30">
                  PRO
                </span>
              </div>

              {/* Menú Desplegable para Cambiar de Plantilla */}
              <div className="relative flex items-center mt-0.5">
                <select
                  value={slug}
                  onChange={(e) => handleSwitchEvent(e.target.value)}
                  className="appearance-none bg-black/60 hover:bg-black/80 text-rosegold-light text-xs font-medium pl-2 pr-6 py-0.5 rounded-lg border border-rosegold/30 focus:outline-none cursor-pointer max-w-[150px] sm:max-w-[200px] truncate"
                >
                  {allEvents.map((evt) => (
                    <option key={evt.slug} value={evt.slug} className="bg-[#181818] text-white">
                      {evt.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-rosegold absolute right-1.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Botón + Nueva Invitación */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rosegold hover:text-[#131313] border border-white/10 text-white text-xs font-medium transition-all shadow-sm ml-1 sm:ml-2"
            title="Crear nueva invitación desde cero o clonada"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Nueva Invitación</span>
          </button>
        </div>

        {/* Centro: Selector de Dispositivo (Móvil / Tablet / PC) */}
        <div className="hidden lg:flex items-center p-1 rounded-xl bg-black/50 border border-white/10">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'mobile'
                ? 'bg-[#E2A4AD] text-[#131313] shadow-md font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Vista Móvil (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Móvil</span>
          </button>

          <button
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'tablet'
                ? 'bg-[#E2A4AD] text-[#131313] shadow-md font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Vista Tablet (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>

          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'desktop'
                ? 'bg-[#E2A4AD] text-[#131313] shadow-md font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Vista Escritorio"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Escritorio</span>
          </button>
        </div>

        {/* Lado Derecho: Acciones (Reset, Previsualizar, Guardar y Publicar) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botón de Reiniciar Cambios */}
          <button
            onClick={onReset}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 text-xs transition-colors"
            title="Revertir cambios no guardados"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Revertir</span>
          </button>

          {/* Ver Invitación Pública en vivo */}
          <Link
            href={`/${slug}`}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-medium transition-colors"
            title="Abrir invitación en nueva pestaña"
          >
            <ExternalLink className="w-3.5 h-3.5 text-rosegold" />
            <span className="hidden sm:inline">Ver en Vivo</span>
          </Link>

          {/* Botón Guardar y Publicar */}
          <button
            onClick={onSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-medium tracking-wide uppercase transition-all shadow-lg ${
              hasUnsavedChanges
                ? 'bg-gradient-to-r from-[#C97D88] via-[#E2A4AD] to-[#C97D88] text-[#131313] hover:opacity-95 shadow-rosegold/20'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            } disabled:opacity-50`}
          >
            {isSaving ? (
              <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : hasUnsavedChanges ? (
              <Save className="w-3.5 h-3.5" />
            ) : (
              <Check className="w-3.5 h-3.5" />
            )}
            <span>{isSaving ? '...' : hasUnsavedChanges ? 'Publicar' : 'Guardado'}</span>
          </button>
        </div>
      </header>

      {/* Modal de Creación de Invitación */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
