'use client';

import React, { useState } from 'react';
import { Layers, Image as ImageIcon, Music, Sparkles, Clock, Heart, Church, Calendar, Shirt, Gift, MailCheck } from 'lucide-react';
import { EventData } from '@/types/event';

interface EditorSidebarLeftProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  eventData: EventData;
  onSelectImageForSection?: (imageUrl: string) => void;
}

export default function EditorSidebarLeft({
  activeSection,
  setActiveSection,
  eventData,
  onSelectImageForSection,
}: EditorSidebarLeftProps) {
  const [activeTab, setActiveTab] = useState<'layers' | 'photos' | 'music'>('layers');

  // Secciones disponibles para edición
  const sections = [
    { id: 'hero', name: '01. Portada (Hero)', icon: Sparkles, photoKey: 'heroImage' },
    { id: 'countdown', name: '02. Cuenta Regr. & Frase', icon: Clock, photoKey: 'gallery-0' },
    { id: 'dedication', name: '03. Bendición de Padres', icon: Heart, photoKey: 'gallery-1' },
    { id: 'locations', name: '04. Misa & Recepción', icon: Church, photoKey: 'gallery-2' },
    { id: 'itinerary', name: '05. Itinerario de la Noche', icon: Calendar, photoKey: 'gallery-3' },
    { id: 'dressCode', name: '06. Código de Vestimenta', icon: Shirt },
    { id: 'giftRegistry', name: '07. Mesa de Regalos', icon: Gift },
    { id: 'rsvp', name: '08. Confirmación RSVP', icon: MailCheck },
  ];

  // Fotos disponibles en el proyecto
  const availablePhotos = [
    { name: 'Portada Principal', url: '/fotos/gabriela-torres/inicio.jpg' },
    { name: 'Sesión en Jardín 1', url: '/fotos/gabriela-torres/dsc09665.jpg' },
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

  return (
    <aside className="w-72 bg-[#181818] border-r border-white/10 flex flex-col z-20 shrink-0 select-none">
      {/* Selector de Pestañas (Capas / Fotos / Música) */}
      <div className="flex items-center border-b border-white/10 p-2 gap-1 bg-[#141414]">
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'layers'
              ? 'bg-white/10 text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Capas</span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'photos'
              ? 'bg-white/10 text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Fotos</span>
        </button>

        <button
          onClick={() => setActiveTab('music')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'music'
              ? 'bg-white/10 text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>Audio</span>
        </button>
      </div>

      {/* Contenido de la Pestaña */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {activeTab === 'layers' && (
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 px-2 block mb-2">
              Secciones del Sitio Web
            </span>

            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;

              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-rosegold/15 border border-rosegold/40 text-white shadow-md'
                      : 'text-gray-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isActive ? 'bg-rosegold text-[#131313]' : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium tracking-wide">{sec.name}</span>
                  </div>

                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-rosegold animate-pulse" />}
                </button>
              );
            })}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="space-y-3">
            <div className="px-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">
                Biblioteca de la Sesión
              </span>
              <p className="text-[11px] text-gray-400 font-light mt-0.5">
                Toca cualquier foto para asignarla a la sección activa: <strong className="text-rosegold uppercase">{activeSection}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {availablePhotos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectImageForSection && onSelectImageForSection(photo.url)}
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

        {activeTab === 'music' && (
          <div className="space-y-4 px-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">
              Música de Fondo
            </span>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rosegold/20 border border-rosegold/40 flex items-center justify-center text-rosegold">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-white font-medium">Canción de Gabriela</h4>
                  <span className="text-[10px] text-gray-400 font-mono">/musica/15.mp3</span>
                </div>
              </div>

              <audio controls className="w-full h-8 pt-1" src={eventData.musicUrl} />
            </div>

            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
              La música cuenta con <strong>reproducción automática inteligente</strong> para sonar en cuanto el invitado ingrese o deslice en su teléfono.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
