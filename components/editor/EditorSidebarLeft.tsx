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
  Check,
  Zap,
  Eye,
  SlidersHorizontal,
  Flame
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
  const [activeTab, setActiveTab] = useState<'layers' | 'texts' | 'fonts' | 'effects' | 'animations' | 'photos'>('layers');

  // Secciones disponibles
  const sections = [
    { id: 'hero', name: '01. Portada (Hero)', icon: Sparkles },
    { id: 'countdown', name: '02. Cuenta Regr. & Frase', icon: Clock },
    { id: 'dedication', name: '03. Bendición de Padres', icon: Heart },
    { id: 'locations', name: '04. Misa & Recepción', icon: Church },
    { id: 'itinerary', name: '05. Itinerario de la Noche', icon: Calendar },
    { id: 'dressCode', name: '06. Código de Vestimenta', icon: Shirt },
    { id: 'giftRegistry', name: '07. Mesa de Regalos', icon: Gift },
    { id: 'rsvp', name: '08. Confirmación RSVP', icon: MailCheck },
  ];

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
    { id: 'rose-gold', name: 'Oro Rosa / Rose Gold', hex: '#E2A4AD', gradient: 'from-[#F5D3D8] via-[#E2A4AD] to-[#C97D88]' },
    { id: 'classic-gold', name: 'Oro Real / Royal Gold', hex: '#D4AF37', gradient: 'from-[#FBF3D5] via-[#D4AF37] to-[#AA7C11]' },
    { id: 'silver-diamond', name: 'Plata Diamante', hex: '#E0E0E0', gradient: 'from-[#FFFFFF] via-[#D1D5DB] to-[#9CA3AF]' },
    { id: 'emerald-luxury', name: 'Verde Esmeralda', hex: '#10B981', gradient: 'from-[#6EE7B7] via-[#10B981] to-[#047857]' },
    { id: 'sapphire-night', name: 'Azul Zafiro', hex: '#60A5FA', gradient: 'from-[#93C5FD] via-[#3B82F6] to-[#1D4ED8]' },
    { id: 'imperial-purple', name: 'Púrpura Imperial', hex: '#C084FC', gradient: 'from-[#E9D5FF] via-[#A855F7] to-[#7E22CE]' },
  ];

  // Animaciones Profesionales
  const animationList = [
    { id: 'fade-in', name: 'Desvanecimiento Suave (Fade In)', desc: 'Aparece gradualmente al hacer scroll' },
    { id: 'slide-up', name: 'Elevación Cinemática (Slide Up)', desc: 'Sube suavemente desde la penumbra' },
    { id: 'float', name: 'Levitación Flotante (Floating Glow)', desc: 'Movimiento continuo y etéreo' },
    { id: 'sparkle', name: 'Destello de Partículas (Sparkles)', desc: 'Brillo sutil de polvo de estrellas' },
    { id: 'zoom-in', name: 'Aproximación Suave (Scale Zoom)', desc: 'Efecto de lente de cámara' },
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

  return (
    <aside className="w-80 bg-[#181818] border-r border-white/10 flex flex-col z-20 shrink-0 select-none">
      {/* Selector de Pestañas Superior */}
      <div className="grid grid-cols-6 border-b border-white/10 p-1.5 gap-1 bg-[#141414]">
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'layers' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Capas y Secciones"
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>Capas</span>
        </button>

        <button
          onClick={() => setActiveTab('texts')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'texts' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Editar Textos"
        >
          <Type className="w-4 h-4 mb-0.5" />
          <span>Textos</span>
        </button>

        <button
          onClick={() => setActiveTab('fonts')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'fonts' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Catálogo de Tipografías"
        >
          <Sliders className="w-4 h-4 mb-0.5" />
          <span>Fuentes</span>
        </button>

        <button
          onClick={() => setActiveTab('effects')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'effects' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Difuminados & Paletas"
        >
          <Palette className="w-4 h-4 mb-0.5" />
          <span>Efectos</span>
        </button>

        <button
          onClick={() => setActiveTab('animations')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'animations' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Animaciones"
        >
          <Zap className="w-4 h-4 mb-0.5" />
          <span>Motion</span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`flex flex-col items-center justify-center py-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'photos' ? 'bg-white/15 text-white shadow' : 'text-gray-400 hover:text-white'
          }`}
          title="Fotos de la Sesión"
        >
          <ImageIcon className="w-4 h-4 mb-0.5" />
          <span>Fotos</span>
        </button>
      </div>

      {/* Contenido Dinámico de la Pestaña Activa */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* =========================================================================
            1. PESTAÑA CAPAS / SECCIONES
        ========================================================================= */}
        {activeTab === 'layers' && (
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block px-1">
              Estructura de la Invitación
            </span>

            <div className="space-y-1.5">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;

                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-rosegold/20 border border-rosegold text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/5 border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-rosegold text-[#131313]' : 'bg-white/5 text-gray-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-medium block">{sec.name}</span>
                        <span className="text-[10px] text-gray-500 font-light">Toca para enfocar</span>
                      </div>
                    </div>
                    {isActive && <div className="w-2 h-2 rounded-full bg-rosegold animate-pulse" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            2. PESTAÑA TEXTOS & CONTENIDOS
        ========================================================================= */}
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

        {/* =========================================================================
            3. PESTAÑA TIPOGRAFÍAS GOOGLE FONTS
        ========================================================================= */}
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
                    Mis Quince Años — Gabriela Torres
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            4. PESTAÑA EFECTOS, DIFUMINADOS & BORDES A NEGRO
        ========================================================================= */}
        {activeTab === 'effects' && (
          <div className="space-y-6">
            {/* Control de Desvanecimiento Perimetral */}
            <div className="p-4 rounded-2xl bg-black/50 border border-rosegold/30 space-y-3">
              <div className="flex items-center gap-2 text-rosegold">
                <Flame className="w-4 h-4 text-rosegold" />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Desvanecimiento a Negro (Fade to Black)
                </span>
              </div>
              <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                Elimina los bordes duros y recuadros rectos de las fotos para fundirlas con el fondo <strong>#131313</strong>.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-white font-medium">Bordes Difuminados en 4 Lados</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  ACTIVO
                </span>
              </div>
            </div>

            {/* Selector de Paleta de Colores */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block px-1">
                Gama de Acento de la Invitación
              </span>

              <div className="grid grid-cols-2 gap-2">
                {colorPalettes.map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => updateField('theme.palette', pal.id)}
                    className="p-2.5 rounded-xl bg-black/40 border border-white/10 hover:border-rosegold text-left transition-all space-y-1.5"
                  >
                    <div className="w-full h-4 rounded-lg bg-gradient-to-r shadow-inner" style={{ backgroundColor: pal.hex }} />
                    <span className="text-[11px] text-gray-200 font-medium block truncate">
                      {pal.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            5. PESTAÑA ANIMACIONES PROFESIONALES
        ========================================================================= */}
        {activeTab === 'animations' && (
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-wider text-rosegold block px-1">
              Efectos de Animación & Movimiento
            </span>

            <div className="space-y-2.5">
              {animationList.map((anim) => (
                <button
                  key={anim.id}
                  onClick={() => updateField('theme.animation', anim.id)}
                  className="w-full p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 hover:border-rosegold text-left transition-all space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-rosegold" />
                    <span className="text-xs font-semibold text-white">{anim.name}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed pl-5">
                    {anim.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            6. PESTAÑA BIBLIOTECA DE FOTOS
        ========================================================================= */}
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
