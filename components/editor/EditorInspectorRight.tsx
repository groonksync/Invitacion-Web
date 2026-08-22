'use client';

import React from 'react';
import { Sliders, Focus, Image as ImageIcon } from 'lucide-react';
import { EventData } from '@/types/event';

interface EditorInspectorRightProps {
  activeSection: string;
  eventData: EventData;
  setEventData: React.Dispatch<React.SetStateAction<EventData | null>>;
  markUnsaved: () => void;
}

export default function EditorInspectorRight({
  activeSection,
  eventData,
  setEventData,
  markUnsaved,
}: EditorInspectorRightProps) {
  const updateField = (path: string, value: any) => {
    markUnsaved();
    setEventData((prev) => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current: any = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const getSectionImageIndex = (secId: string) => {
    switch (secId) {
      case 'countdown': return 0;
      case 'dedication': return 1;
      case 'locations': return 2;
      case 'itinerary': return 3;
      default: return -1;
    }
  };

  const currentImgPosition = activeSection === 'hero'
    ? (eventData.heroImagePosition || 'top')
    : (eventData.gallery[getSectionImageIndex(activeSection)]?.position || 'top');

  const setImgPosition = (pos: 'top' | 'center' | 'bottom' | 'contain') => {
    if (activeSection === 'hero') {
      updateField('heroImagePosition', pos);
    } else {
      const idx = getSectionImageIndex(activeSection);
      if (idx >= 0) {
        updateField(`gallery.${idx}.position`, pos);
      }
    }
  };

  return (
    <aside className="w-80 bg-[#181818] border-l border-white/10 flex flex-col z-20 shrink-0 select-none">
      {/* Encabezado del Inspector */}
      <div className="h-12 border-b border-white/10 px-4 flex items-center justify-between bg-[#141414]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-rosegold" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            Propiedades
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded text-gray-300">
          {activeSection}
        </span>
      </div>

      {/* Controles de la Sección */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* HERRAMIENTA: ENCUADRE Y AJUSTE DE FOTO (VERTICAL / HORIZONTAL) */}
        {['hero', 'countdown', 'dedication', 'locations', 'itinerary'].includes(activeSection) && (
          <div className="p-3.5 rounded-2xl bg-black/50 border border-rosegold/25 space-y-2.5">
            <div className="flex items-center gap-1.5 text-rosegold">
              <Focus className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                Encuadre de Foto (Smartphone)
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-light leading-relaxed">
              Si la foto es horizontal o se corta el rostro/vestido en el móvil, ajusta el encuadre aquí:
            </p>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setImgPosition('top')}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-medium border transition-all truncate ${
                  currentImgPosition === 'top'
                    ? 'bg-rosegold/20 border-rosegold text-white font-semibold'
                    : 'bg-black/40 border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                🎯 Arriba / Rostro
              </button>

              <button
                type="button"
                onClick={() => setImgPosition('center')}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-medium border transition-all truncate ${
                  currentImgPosition === 'center'
                    ? 'bg-rosegold/20 border-rosegold text-white font-semibold'
                    : 'bg-black/40 border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                🎯 Centro
              </button>

              <button
                type="button"
                onClick={() => setImgPosition('bottom')}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-medium border transition-all truncate ${
                  currentImgPosition === 'bottom'
                    ? 'bg-rosegold/20 border-rosegold text-white font-semibold'
                    : 'bg-black/40 border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                🎯 Abajo / Vestido
              </button>

              <button
                type="button"
                onClick={() => setImgPosition('contain')}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-medium border transition-all truncate ${
                  currentImgPosition === 'contain'
                    ? 'bg-rosegold/20 border-rosegold text-white font-semibold'
                    : 'bg-black/40 border-white/5 text-gray-400 hover:text-white'
                }`}
                title="Mostrar foto horizontal completa sin recortar bordes"
              >
                🖼️ Vista Completa
              </button>
            </div>
          </div>
        )}

        {/* 1. PORTADA (HERO) */}
        {activeSection === 'hero' && (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-rosegold uppercase tracking-wider block">
                Nombre de la Quinceañera
              </label>
              <input
                type="text"
                value={eventData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium text-gray-300 uppercase tracking-wider block">
                Subtítulo / Ocasión
              </label>
              <input
                type="text"
                value={eventData.subtitle}
                onChange={(e) => updateField('subtitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium text-gray-300 uppercase tracking-wider block">
                Fecha del Evento
              </label>
              <input
                type="datetime-local"
                value={eventData.date ? eventData.date.slice(0, 16) : ''}
                onChange={(e) => updateField('date', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* 2. CUENTA REGRESIVA & FRASE */}
        {activeSection === 'countdown' && (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-rosegold uppercase tracking-wider block">
                Pensamiento / Frase Emotiva
              </label>
              <textarea
                rows={4}
                value={eventData.phrase}
                onChange={(e) => updateField('phrase', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium text-gray-300 uppercase tracking-wider block">
                Firma de la Frase
              </label>
              <input
                type="text"
                value={eventData.phraseAuthor}
                onChange={(e) => updateField('phraseAuthor', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* 3. DEDICATORIA */}
        {activeSection === 'dedication' && (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-rosegold uppercase tracking-wider block">
                Nombre de la Mamá
              </label>
              <input
                type="text"
                value={eventData.parents.mother}
                onChange={(e) => updateField('parents.mother', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium text-rosegold uppercase tracking-wider block">
                Nombre del Papá
              </label>
              <input
                type="text"
                value={eventData.parents.father}
                onChange={(e) => updateField('parents.father', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium text-gray-300 uppercase tracking-wider block">
                Padrinos (Opcional)
              </label>
              <input
                type="text"
                value={eventData.parents.godparents || ''}
                onChange={(e) => updateField('parents.godparents', e.target.value)}
                placeholder="Ej. Nombres de los padrinos"
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* 4. UBICACIONES */}
        {activeSection === 'locations' && (
          <div className="space-y-6">
            <div className="space-y-3 p-3.5 rounded-2xl bg-black/40 border border-white/10">
              <span className="text-xs font-semibold text-rosegold block">⛪ Ceremonia Religiosa</span>
              <div className="space-y-2">
                <input
                  type="text"
                  value={eventData.ceremony.title}
                  onChange={(e) => updateField('ceremony.title', e.target.value)}
                  placeholder="Título"
                  className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
                <input
                  type="text"
                  value={eventData.ceremony.time}
                  onChange={(e) => updateField('ceremony.time', e.target.value)}
                  placeholder="Horario"
                  className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
                <input
                  type="text"
                  value={eventData.ceremony.locationName}
                  onChange={(e) => updateField('ceremony.locationName', e.target.value)}
                  placeholder="Nombre de la Iglesia"
                  className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
                <input
                  type="text"
                  value={eventData.ceremony.address}
                  onChange={(e) => updateField('ceremony.address', e.target.value)}
                  placeholder="Dirección"
                  className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 p-3.5 rounded-2xl bg-black/40 border border-white/10">
              <span className="text-xs font-semibold text-rosegold block">🎉 Recepción & Fiesta</span>
              <div className="space-y-2">
                <input
                  type="text"
                  value={eventData.party.title}
                  onChange={(e) => updateField('party.title', e.target.value)}
                  placeholder="Título"
                  className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
                <input
                  type="text"
                  value={eventData.party.time}
                  onChange={(e) => updateField('party.time', e.target.value)}
                  placeholder="Horario"
                  className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
                <input
                  type="text"
                  value={eventData.party.locationName}
                  onChange={(e) => updateField('party.locationName', e.target.value)}
                  placeholder="Nombre del Salón"
                  className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
                <input
                  type="text"
                  value={eventData.party.address}
                  onChange={(e) => updateField('party.address', e.target.value)}
                  placeholder="Dirección"
                  className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. ITINERARIO */}
        {activeSection === 'itinerary' && (
          <div className="space-y-4">
            <span className="text-[11px] font-medium text-rosegold uppercase tracking-wider block">
              Momentos del Cronograma
            </span>

            {eventData.itinerary.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => updateField(`itinerary.${idx}.time`, e.target.value)}
                    placeholder="00:00"
                    className="w-16 px-2 py-1 rounded bg-black/60 border border-white/10 text-xs font-mono text-rosegold text-center focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateField(`itinerary.${idx}.title`, e.target.value)}
                    placeholder="Título del momento"
                    className="flex-1 px-2 py-1 rounded bg-black/60 border border-white/10 text-xs text-white focus:outline-none font-medium"
                  />
                </div>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateField(`itinerary.${idx}.description`, e.target.value)}
                  placeholder="Descripción"
                  className="w-full px-2 py-1 rounded bg-black/60 border border-white/10 text-[11px] text-gray-300 focus:outline-none font-light"
                />
              </div>
            ))}
          </div>
        )}

        {/* 6. CÓDIGO DE VESTIMENTA */}
        {activeSection === 'dressCode' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-rosegold uppercase tracking-wider block">
                Estilo de Vestimenta
              </label>
              <input
                type="text"
                value={eventData.dressCode.style}
                onChange={(e) => updateField('dressCode.style', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium text-gray-300 uppercase tracking-wider block">
                Descripción / Indicaciones
              </label>
              <textarea
                rows={3}
                value={eventData.dressCode.description}
                onChange={(e) => updateField('dressCode.description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* 7. MESA DE REGALOS */}
        {activeSection === 'giftRegistry' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-rosegold uppercase tracking-wider block">
                Título
              </label>
              <input
                type="text"
                value={eventData.giftRegistry.title}
                onChange={(e) => updateField('giftRegistry.title', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium text-gray-300 uppercase tracking-wider block">
                Nombre del Banco
              </label>
              <input
                type="text"
                value={eventData.giftRegistry.bankName || ''}
                onChange={(e) => updateField('giftRegistry.bankName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium text-gray-300 uppercase tracking-wider block">
                Número de Cuenta
              </label>
              <input
                type="text"
                value={eventData.giftRegistry.accountNumber || ''}
                onChange={(e) => updateField('giftRegistry.accountNumber', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none font-mono"
              />
            </div>
          </div>
        )}

        {/* 8. CONFIRMACIÓN RSVP */}
        {activeSection === 'rsvp' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-rosegold uppercase tracking-wider block">
                Fecha Límite de Confirmación
              </label>
              <input
                type="text"
                value={eventData.rsvpDeadline}
                onChange={(e) => updateField('rsvpDeadline', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium text-gray-300 uppercase tracking-wider block">
                PIN de Acceso a Anfitriones
              </label>
              <input
                type="text"
                value={eventData.adminPin}
                onChange={(e) => updateField('adminPin', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-rosegold focus:outline-none font-mono text-center"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
