'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { EVENTS } from '@/data/events';
import { EventData } from '@/types/event';
import EditorTopBar from '@/components/editor/EditorTopBar';
import EditorSidebarLeft from '@/components/editor/EditorSidebarLeft';
import EditorCanvas from '@/components/editor/EditorCanvas';
import EditorInspectorRight from '@/components/editor/EditorInspectorRight';

export default function StudioEditorPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'gabriela-torres';

  const [initialData, setInitialData] = useState<EventData | null>(null);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const base = EVENTS[slug] || EVENTS['gabriela-torres'];
    if (base) {
      setInitialData(JSON.parse(JSON.stringify(base)));
      setEventData(JSON.parse(JSON.stringify(base)));
    }
  }, [slug]);

  const showToast = (text: string, type: 'success' | 'error') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSave = async () => {
    if (!eventData) return;
    setIsSaving(true);

    try {
      const res = await fetch('/api/events/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, eventData }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al guardar');
      }

      setInitialData(JSON.parse(JSON.stringify(eventData)));
      setHasUnsavedChanges(false);
      showToast('¡Invitación guardada y publicada exitosamente!', 'success');
    } catch (error: any) {
      console.error(error);
      showToast(error.message || 'Error al guardar los cambios', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (!initialData) return;
    if (confirm('¿Deseas revertir los cambios no guardados?')) {
      setEventData(JSON.parse(JSON.stringify(initialData)));
      setHasUnsavedChanges(false);
      showToast('Cambios revertidos al último guardado', 'success');
    }
  };

  const handleSelectImageForSection = (imageUrl: string) => {
    if (!eventData) return;
    setHasUnsavedChanges(true);

    setEventData((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };

      if (activeSection === 'hero') {
        copy.heroImage = imageUrl;
      } else if (activeSection === 'countdown') {
        if (!copy.gallery[0]) copy.gallery[0] = { url: imageUrl, alt: 'Foto 1' };
        else copy.gallery[0].url = imageUrl;
      } else if (activeSection === 'dedication') {
        if (!copy.gallery[1]) copy.gallery[1] = { url: imageUrl, alt: 'Foto 2' };
        else copy.gallery[1].url = imageUrl;
      } else if (activeSection === 'locations') {
        if (!copy.gallery[2]) copy.gallery[2] = { url: imageUrl, alt: 'Foto 3' };
        else copy.gallery[2].url = imageUrl;
      } else if (activeSection === 'itinerary') {
        if (!copy.gallery[3]) copy.gallery[3] = { url: imageUrl, alt: 'Foto 4' };
        else copy.gallery[3].url = imageUrl;
      }

      return copy;
    });

    showToast(`Foto asignada a la sección: ${activeSection}`, 'success');
  };

  if (!eventData) {
    return (
      <div className="h-screen w-screen bg-[#131313] flex items-center justify-center text-white">
        <div className="flex items-center gap-3 text-rosegold">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Cargando Studio XV Editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#131313] text-gray-100 overflow-hidden font-sans">
      {/* 1. BARRA SUPERIOR */}
      <EditorTopBar
        slug={slug}
        name={eventData.name}
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        onSave={handleSave}
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        onReset={handleReset}
      />

      {/* 2. ÁREA DE TRABAJO (PANEL IZQ + LIENZO + PANEL DER) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Panel Izquierdo: Capas y Fotos */}
        <EditorSidebarLeft
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          eventData={eventData}
          onSelectImageForSection={handleSelectImageForSection}
        />

        {/* Lienzo Central: Simulador Móvil */}
        <EditorCanvas
          eventData={eventData}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          deviceMode={deviceMode}
        />

        {/* Panel Derecho: Inspector de Propiedades */}
        <EditorInspectorRight
          activeSection={activeSection}
          eventData={eventData}
          setEventData={setEventData}
          markUnsaved={() => setHasUnsavedChanges(true)}
        />
      </div>

      {/* Notificación Flotante (Toast) */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-2xl text-xs font-medium tracking-wide flex items-center gap-2 border transition-all animate-bounce ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40 backdrop-blur-md'
              : 'bg-red-950/90 text-red-200 border-red-500/40 backdrop-blur-md'
          }`}
        >
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
