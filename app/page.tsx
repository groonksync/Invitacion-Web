'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllEvents } from '@/data/events';
import {
  Sparkles,
  Eye,
  ShieldCheck,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Lock,
  Link as LinkIcon,
  Smartphone,
  Send
} from 'lucide-react';

export default function HomePage() {
  const events = getAllEvents();
  const [origin, setOrigin] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#0d0a0f] text-gray-100 selection:bg-rose-500 selection:text-white sparkle-bg py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Cabecera Principal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-400/30 text-rose-300 text-xs tracking-widest uppercase shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Panel Central de Gestión de Invitaciones</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-medium">
            Invitaciones Digitales <br />
            <span className="rose-gradient-text font-cursive text-5xl sm:text-7xl block pt-2">
              Mis Quince Años
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Administra tus invitaciones interactivas, copia los enlaces directos para los invitados y entrega a cada familia su panel privado de control de asistencia con PIN.
          </p>
        </div>

        {/* Sección de Tarjetas con las Invitaciones y Enlaces de Copiado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => {
            const isDemo = event.slug === 'valeria-15';
            const invitationUrl = origin ? `${origin}/${event.slug}` : `/${event.slug}`;
            const adminUrl = origin ? `${origin}/${event.slug}/admin` : `/${event.slug}/admin`;

            return (
              <div
                key={event.id}
                className={`glass-card rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-amber-400/50 hover:shadow-2xl ${
                  isDemo ? 'border-rose-400/40 shadow-rose-950/50' : 'border-white/10'
                }`}
              >
                {/* Portada Miniatura */}
                <div className="relative h-60 w-full overflow-hidden bg-black">
                  <img
                    src={event.heroImage}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16121a] via-transparent to-black/40" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    {isDemo ? (
                      <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-semibold uppercase tracking-wider shadow-lg">
                        Demo Completa
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 rounded-full bg-zinc-800/90 border border-zinc-600 text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                        Plantilla en Blanco
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-sans block">
                      {event.subtitle}
                    </span>
                    <h2 className="font-cursive text-4xl text-white drop-shadow-md">
                      {event.name}
                    </h2>
                  </div>
                </div>

                {/* Contenido y Cajas de URLs para copiar */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  {/* Cajas de URLs directas */}
                  <div className="space-y-4">
                    {/* URL 1: Para los Invitados */}
                    <div className="bg-black/50 border border-rose-400/25 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
                          <LinkIcon className="w-3.5 h-3.5 text-rose-400" />
                          <span>Enlace para los Invitados</span>
                        </span>
                        <button
                          onClick={() => copyToClipboard(invitationUrl, `inv-${event.slug}`)}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-400/30 text-rose-200 text-xs font-medium transition-colors"
                        >
                          {copiedKey === `inv-${event.slug}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-green-400">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar URL</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-2 rounded-lg bg-black/70 font-mono text-xs text-gray-300 truncate select-all border border-white/5">
                        {invitationUrl}
                      </div>
                    </div>

                    {/* URL 2: Para la Madre / Anfitriones */}
                    <div className="bg-black/50 border border-amber-400/25 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Panel Privado para la Mamá</span>
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              `Hola! Aquí tienes el enlace de tu panel de control de asistencia para los 15 años de ${event.name}:\nEnlace: ${adminUrl}\nPIN de Acceso: ${event.adminPin}`,
                              `admin-${event.slug}`
                            )
                          }
                          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-400/30 text-amber-200 text-xs font-medium transition-colors"
                        >
                          {copiedKey === `admin-${event.slug}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-green-400">¡Copiado con PIN!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar URL + PIN</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-2 rounded-lg bg-black/70 font-mono text-xs text-gray-300 truncate select-all border border-white/5">
                        {adminUrl}
                      </div>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                        <span>PIN de Acceso Exclusivo:</span>
                        <span className="font-mono font-bold text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-400/20">
                          {event.adminPin}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botones de Acción (Ver en directo) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10">
                    <Link
                      href={`/${event.slug}`}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:opacity-95 text-white text-sm font-medium text-center shadow-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Abrir Invitación Web</span>
                    </Link>

                    <Link
                      href={`/${event.slug}/admin`}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black/60 hover:bg-rose-950/80 border border-rose-400/30 text-rose-200 hover:text-white text-sm font-medium text-center transition-all"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Abrir Panel de Asistencia</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sección Informativa: Explicación de los Enlaces */}
        <div className="glass-card-gold rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-sans block">
              Guía Rápida para Compartir
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
              ¿Qué enlace le entregas a cada persona?
            </h2>
            <p className="text-sm text-gray-300">
              Cada cliente y cada grupo de personas tiene su enlace correspondiente para mantener la total privacidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-6 rounded-2xl bg-black/50 border border-rose-400/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-medium">
                <Smartphone className="w-5 h-5" />
                <h3 className="font-serif text-lg text-white">1. Enlace para los Invitados</h3>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Este es el enlace que la quinceañera y sus padres comparten a sus familiares y amigos por WhatsApp o redes sociales. Los invitados verán la música, la galería de fotos, el mapa y el formulario para confirmar su asistencia.
              </p>
              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-400/20 text-rose-200 text-xs font-mono">
                👉 tudominio.vercel.app/valeria-15
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/50 border border-amber-400/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-medium">
                <Lock className="w-5 h-5" />
                <h3 className="font-serif text-lg text-white">2. Enlace Privado para los Padres</h3>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Este enlace es exclusivo para la mamá o los padres. Al ingresar con su PIN, pueden ver la lista de cuántas personas confirmaron en vivo, sus dedicatorias y presionar el botón de **Descargar en Excel**.
              </p>
              <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-400/20 text-amber-200 text-xs font-mono">
                👉 tudominio.vercel.app/valeria-15/admin (PIN: 1515)
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
