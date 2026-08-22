'use client';

import React, { useState } from 'react';
import {
  Layers,
  Type,
  Palette,
  Sparkles,
  Image as ImageIcon,
  Sliders,
  Clock,
  Heart,
  Church,
  Calendar,
  Shirt,
  Gift,
  MailCheck,
  Zap,
  Flame,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  LayoutGrid
} from 'lucide-react';
import { EventData } from '@/types/event';

interface EditorSidebarLeftProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  eventData: EventData;
  setEventData: React.Dispatch<React.SetStateAction<EventData | null>>;
  onSelectImageForSection: (imageUrl: string) => void;
  markUnsaved: () => void;
}

export default function EditorSidebarLeft({
  activeSection,
  setActiveSection,
  eventData,
  setEventData,
  onSelectImageForSection,
  markUnsaved,
}: EditorSidebarLeftProps) {
  const [activeTab, setActiveTab] = useState<'layers' | 'layout' | 'texts' | 'fonts' | 'effects' | 'animations' | 'photos'>('layers');

  // Secciones por defecto
  const defaultSections = [
    { id: 'hero', name: '01. Portada (Hero)', icon: Sparkles },
    { id: 'countdown', name: '02. Cuenta Regr. & Frase', icon: Clock },
    { id: 'dedication', name: '03. Bendición de Padres', icon: Heart },
    { id: 'locations', name: '04. Misa & Recepción', icon: Church },
    { id: 'itinerary', name: '05. Itinerario de la Noche', icon: Calendar },
    { id: 'dressCode', name: '06. Código de Vestimenta', icon: Shirt },
    { id: 'giftRegistry', name: '07. Mesa de Regalos', icon: Gift },
    { id: 'rsvp', name: '08. Confirmación RSVP', icon: MailCheck },
  ];

  // Orden actual de secciones
  const currentOrder = eventData.sectionOrder || defaultSections.map((s) => s.id);
  const hiddenSections = eventData.hiddenSections || [];
  const currentLayouts = eventData.sectionLayouts || {};

  // Ordenar según sectionOrder
  const orderedSections = currentOrder
    .map((id) => defaultSections.find((s) => s.id === id))
    .filter(Boolean) as typeof defaultSections;

  // 10 Familias Tipográficas Profesionales Gratuitas de Google Fonts
  const typographyList = [
    { id: 'playfair', name: 'Playfair Display', fontClass: 'font-playfair', type: 'Serif Clásica & Lujo' },
    { id: 'great-vibes', name: 'Great Vibes', fontClass: 'font-great-vibes', type: 'Caligrafía Elegante' },
    { id: 'cormorant', name: 'Cormorant Garamond', fontClass: 'font-cormorant', type: 'Alta Costura / Vogue' },
    { id: 'cinzel', name: 'Cinzel', fontClass: 'font-cinzel', type: 'Romana Majestuosa' },
    { id: 'pinyon', name: 'Pinyon Script', fontClass: 'font-pinyon', type: 'Caligrafía Real' },
    { id: 'alex', name: 'Alex Brush', fontClass: 'font-alex', type: 'Cursiva Fluida' },
    { id: 'italiana', name: 'Italiana', fontClass: 'font-italiana', type: 'Editorial Minimalista' },
    { id: 'prata', name: 'Prata', fontClass: 'font-prata', type: 'Serif Refinada' },
    { id: 'bodoni', name: 'Bodoni Moda', fontClass: 'font-bodoni', type: 'Revista de Gala' },
    { id: 'montserrat', name: 'Montserrat', fontClass: 'font-montserrat', type: 'Moderna & Limpia' },
  ];

  // Paletas de Color de Ultra-Lujo
  const colorPalettes = [
    { id: 'rose-gold', name: 'Oro Rosa / Rose Gold', hex: '#E2A4AD' },
    { id: 'classic-gold', name: 'Oro Real / Royal Gold', hex: '#D4AF37' },
    { id: 'silver-diamond', name: 'Plata Diamante', hex: '#E0E0E0' },
    { id: 'emerald-luxury', name: 'Verde Esmeralda', hex: '#10B981' },
    { id: 'sapphire-night', name: 'Azul Zafiro', hex: '#60A5FA' },
    { id: 'imperial-purple', name: 'Púrpura Imperial', hex: '#C084FC' },
  ];

  // Opciones de Maquetación / Layout por Sección
  const layoutStyles = [
    { id: 'fullscreen', name: '🖼️ Inmersivo Cinemático', desc: 'Foto a pantalla completa con viñeta perimetral suave y texto superpuesto' },
    { id: 'album-duo', name: '📸 Álbum Dúo Editorial', desc: 'Composición de 2 fotografías complementarias con tarjeta central' },
    { id: 'floating-glass', name: '💎 Tarjeta Flotante Fine-Art', desc: 'Tarjeta de cristal esmerilado flotante con fondo desenfocado' },
  ];

  // Animaciones Profesionales
  const animationList = [
    { id: 'fade-in', name: 'Desvanecimiento Suave (Fade In)', desc: 'Aparece gradualmente al hacer scroll' },
    { id: 'slide-up', name: 'Elevación Cinemática (Slide Up)', desc: 'Sube suavemente desde la penumbra' },
    { id: 'float', name: 'Levitación Flotante (Floating Glow)', desc: 'Movimiento continuo y etéreo' },
    { id: 'sparkle', name: 'Destello de Partículas (Sparkles)', desc: 'Brillo sutil de polvo de estrellas' },
  ];

  // Fotos disponibles
  const availablePhotos = [
    { name: 'Portada Principal', url: '/fotos/gabriela-torres/inicio.jpg' },
    { name: 'Sesión Jardín 1', url: '/fotos/gabriela-torres/dsc09665.jpg' },
    { name: 'Sonrisas y Naturaleza', url: '/fotos/gabriela-torres/dsc09668.jpg' },
    { name: 'Retrato de Gala 1', url: '/fotos/gabriela-torres/dsc09701.jpg' },
    { name: 'Elegancia y Tiara', url: '/fotos/gabriela-torres/dsc09709.jpg' },
    { name: 'Vestido Completo', url: '/fotos/gabriela-torres/dsc09721.jpg' },
    { name: 'Retrato de Salón', url: '/fotos/gabriela-torres/dsc09735.jpg' },
    { name: 'Mirada Iluminada', url: '/fotos/gabriela-torres/dsc09801.jpg' },
    { name: 'Gala Nocturna', url: '/fotos/gabriela-torres/dsc09823.jpg' },
    { name: 'Momento Mágico', url: '/fotos/gabriela-torres/dsc09867.jpg' },
    { name: 'Noche Inolvidable', url: '/fotos/gabriela-torres/dsc09885.jpg' },
  ];

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

  // Reordenar capas hacia arriba o abajo
  const moveSection = (idx: number, direction: 'up' | 'down') => {
    markUnsaved();
    const newOrder = [...currentOrder];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;

    const temp = newOrder[idx];
    newOrder[idx] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;

    updateField('sectionOrder', newOrder);
  };

  // Alternar visibilidad de una sección
  const toggleVisibility = (secId: string) => {
    markUnsaved();
    const isHidden = hiddenSections.includes(secId);
    const updated = isHidden
      ? hiddenSections.filter((id) => id !== secId)
      : [...hiddenSections, secId];
    updateField('hiddenSections', updated);
  };

  // Cambiar layout de la sección activa
  const setSectionLayout = (layoutId: string) => {
    markUnsaved();
    updateField(`sectionLayouts.${activeSection}`, layoutId);
  };

  return (
    <aside className="w-80 bg-[#181818] border-r border-white/10 flex flex-col z-20 shrink-0 select-none">
      {/* Selector de Pestañas Superior */}
      <div className="grid grid-cols-6 border-b border-white/10 p-1.5 gap-1 bg-[#141414]">
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[9px] font-medium transition-all ${
            activeTab === 'layers' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Capas y Orden"
        >
          <Layers className="w-3.5 h-3.5 mb-0.5" />
          <span>Capas</span>
        </button>

        <button
          onClick={() => setActiveTab('layout')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[9px] font-medium transition-all ${
            activeTab === 'layout' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Diseño / Layout de Capa"
        >
          <LayoutGrid className="w-3.5 h-3.5 mb-0.5" />
          <span>Diseño</span>
        </button>

        <button
          onClick={() => setActiveTab('texts')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[9px] font-medium transition-all ${
            activeTab === 'texts' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Editar Textos"
        >
          <Type className="w-3.5 h-3.5 mb-0.5" />
          <span>Textos</span>
        </button>

        <button
          onClick={() => setActiveTab('fonts')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[9px] font-medium transition-all ${
            activeTab === 'fonts' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Catálogo de Tipografías"
        >
          <Sliders className="w-3.5 h-3.5 mb-0.5" />
          <span>Fuentes</span>
        </button>

        <button
          onClick={() => setActiveTab('effects')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[9px] font-medium transition-all ${
            activeTab === 'effects' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Difuminados & Paletas"
        >
          <Palette className="w-3.5 h-3.5 mb-0.5" />
          <span>Efectos</span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[9px] font-medium transition-all ${
            activeTab === 'photos' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Fotos de la Sesión"
        >
          <ImageIcon className="w-3.5 h-3.5 mb-0.5" />
          <span>Fotos</span>
        </button>
      </div>

      {/* Contenido Dinámico */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* 1. PESTAÑA CAPAS / REORDENAR / VISIBILIDAD */}
        {activeTab === 'layers' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">
                Organización de Capas
              </span>
              <span className="text-[9px] text-rosegold font-light">Mover & Visibilidad</span>
            </div>

            <div className="space-y-1.5">
              {orderedSections.map((sec, idx) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                const isHidden = hiddenSections.includes(sec.id);

                return (
                  <div
                    key={sec.id}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-rosegold/20 border-rosegold text-white shadow-lg'
                        : isHidden
                        ? 'bg-black/30 border-white/5 opacity-50 text-gray-500'
                        : 'bg-black/40 border-white/5 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {/* Botón para seleccionar y enfocar la capa */}
                    <button
                      onClick={() => setActiveSection(sec.id)}
                      className="flex items-center gap-2.5 flex-1 text-left truncate"
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-rosegold text-[#131313]' : 'bg-white/5 text-gray-400'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-medium block truncate">{sec.name}</span>
                        <span className="text-[9px] text-gray-500 capitalize">
                          {currentLayouts[sec.id] || 'Inmersivo'}
                        </span>
                      </div>
                    </button>

                    {/* Acciones de Capa: Subir, Bajar y Ocultar/Mostrar */}
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button
                        onClick={() => moveSection(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-20 hover:bg-white/10"
                        title="Subir posición"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => moveSection(idx, 'down')}
                        disabled={idx === orderedSections.length - 1}
                        className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-20 hover:bg-white/10"
                        title="Bajar posición"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => toggleVisibility(sec.id)}
                        className={`p-1 rounded hover:bg-white/10 ${isHidden ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
                        title={isHidden ? 'Mostrar sección' : 'Ocultar sección'}
                      >
                        {isHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. PESTAÑA DISEÑO / LAYOUT DE LA CAPA ACTIVA */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div className="px-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-rosegold block">
                Estilo de Diseño para:
              </span>
              <strong className="text-sm text-white uppercase">{activeSection}</strong>
            </div>

            <div className="space-y-2.5">
              {layoutStyles.map((ly) => {
                const isSelected = (currentLayouts[activeSection] || 'fullscreen') === ly.id;

                return (
                  <button
                    key={ly.id}
                    onClick={() => setSectionLayout(ly.id)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-rosegold/20 border-rosegold text-white shadow-lg'
                        : 'bg-black/40 border-white/10 hover:border-white/20 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{ly.name}</span>
                      {isSelected && <span className="text-[9px] font-mono text-rosegold uppercase bg-rosegold/20 px-1.5 py-0.5 rounded">ACTIVO</span>}
                    </div>
                    <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                      {ly.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. PESTAÑA TEXTOS */}
        {activeTab === 'texts' && (
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-wider text-rosegold block px-1">
              Editar Textos de la Quinceañera
            </span>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-gray-300">Nombre de la Quinceañera</label>
                <input
                  type="text"
                  value={eventData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-gray-300">Subtítulo / Ocasión</label>
                <input
                  type="text"
                  value={eventData.subtitle}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-gray-300">Frase / Pensamiento</label>
                <textarea
                  rows={3}
                  value={eventData.phrase}
                  onChange={(e) => updateField('phrase', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-gray-300">Nombre de la Madre</label>
                <input
                  type="text"
                  value={eventData.parents.mother}
                  onChange={(e) => updateField('parents.mother', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-gray-300">Nombre del Padre</label>
                <input
                  type="text"
                  value={eventData.parents.father}
                  onChange={(e) => updateField('parents.father', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-gray-300">Padrinos</label>
                <input
                  type="text"
                  value={eventData.parents.godparents || ''}
                  onChange={(e) => updateField('parents.godparents', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-rosegold focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. PESTAÑA TIPOGRAFÍAS */}
        {activeTab === 'fonts' && (
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-wider text-rosegold block px-1">
              Catálogo de Tipografías de Lujo
            </span>

            <div className="space-y-2">
              {typographyList.map((font) => (
                <button
                  key={font.id}
                  onClick={() => updateField('theme.fontFamily', font.id)}
                  className="w-full p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 hover:border-rosegold text-left transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-base text-white group-hover:text-rosegold ${font.fontClass}`}>
                      {font.name}
                    </span>
                    <span className="text-[9px] uppercase font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                      {font.type}
                    </span>
                  </div>
                  <span className={`text-xs text-gray-400 block pt-1 ${font.fontClass}`}>
                    Mis Quince Años — {eventData.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 5. PESTAÑA EFECTOS */}
        {activeTab === 'effects' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/50 border border-rosegold/30 space-y-3">
              <div className="flex items-center gap-2 text-rosegold">
                <Flame className="w-4 h-4 text-rosegold" />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Desvanecimiento a Negro (Fade to Black)
                </span>
              </div>
              <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                Elimina los bordes duros de las fotos para fundirlas suavemente con el fondo <strong>#131313</strong>.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-white font-medium">Bordes Difuminados en 4 Lados</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  ACTIVO
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block px-1">
                Gama de Acento
              </span>
              <div className="grid grid-cols-2 gap-2">
                {colorPalettes.map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => updateField('theme.palette', pal.id)}
                    className="p-2.5 rounded-xl bg-black/40 border border-white/10 hover:border-rosegold text-left transition-all space-y-1.5"
                  >
                    <div className="w-full h-4 rounded-lg shadow-inner" style={{ backgroundColor: pal.hex }} />
                    <span className="text-[11px] text-gray-200 font-medium block truncate">
                      {pal.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. PESTAÑA FOTOS */}
        {activeTab === 'photos' && (
          <div className="space-y-3">
            <div className="px-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block">
                Fotos de la Sesión
              </span>
              <p className="text-[11px] text-gray-400 font-light mt-0.5">
                Toca cualquier imagen para asignarla a la sección activa: <strong className="text-rosegold uppercase">{activeSection}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {availablePhotos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectImageForSection(photo.url)}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-rosegold transition-all shadow-md"
                >
                  <img src={photo.url} alt={photo.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-[10px] text-white font-medium truncate">{photo.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
