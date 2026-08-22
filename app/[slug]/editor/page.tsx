'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { EVENTS } from '@/data/events';
import { getClientStoredEventBySlug, saveClientStoredEvent } from '@/lib/clientEventStorage';
import { EventData } from '@/types/event';
import EditorTopBar from '@/components/editor/EditorTopBar';
import EditorSidebarLeft from '@/components/editor/EditorSidebarLeft';
import EditorCanvas from '@/components/editor/EditorCanvas';
import EditorInspectorRight from '@/components/editor/EditorInspectorRight';

export default function StudioEditorPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = typeof rawSlug === 'string' ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] : 'gabriela-torres';

  // Obtener plantilla base desde localStorage o defaults
  const getInitialEvent = (targetSlug: string): EventData => {
    return (
      getClientStoredEventBySlug(targetSlug) ||
      EVENTS[targetSlug] ||
      EVENTS['gabriela-torres'] ||
      Object.values(EVENTS)[0]
    );
  };

  const [initialData, setInitialData] = useState<EventData>(() => getInitialEvent(slug));
  const [eventData, setEventData] = useState<EventData>(() => getInitialEvent(slug));
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Sincronizar cuando cambia el slug o al montar en el navegador
  useEffect(() => {
    const fresh = getInitialEvent(slug);
    setInitialData(JSON.parse(JSON.stringify(fresh)));
    setEventData(JSON.parse(JSON.stringify(fresh)));
    setHasUnsavedChanges(false);
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
      // 1. Guardar en localStorage del cliente
      saveClientStoredEvent(slug, eventData);

      // 2. Guardar en API del servidor
      try {
        await fetch('/api/events/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, eventData }),
        });
      } catch (e) {
        console.warn('Server save warning:', e);
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
      const copy = JSON.parse(JSON.stringify(prev));

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

  return (
    <div className="h-screen w-screen flex flex-col bg-[#131313] text-gray-100 overflow-hidden font-sans select-none">
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

      {/* 2. ÁREA DE TRABAJO */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Panel Izquierdo */}
        <EditorSidebarLeft
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          eventData={eventData}
          setEventData={setEventData as any}
          onSelectImageForSection={handleSelectImageForSection}
          markUnsaved={() => setHasUnsavedChanges(true)}
        />

        {/* Lienzo Central: Simulador Móvil */}
        <EditorCanvas
          eventData={eventData}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          deviceMode={deviceMode}
        />

        {/* Panel Derecho: Inspector */}
        <EditorInspectorRight
          activeSection={activeSection}
          eventData={eventData}
          setEventData={setEventData as any}
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
