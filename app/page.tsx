import React from 'react';
import Link from 'next/link';
import { getAllEvents } from '@/data/events';
import { Sparkles, Eye, ShieldCheck, Heart, ArrowRight, Music, Download, Smartphone, Laptop } from 'lucide-react';

export default function HomePage() {
  const events = getAllEvents();

  return (
    <main className="min-h-screen bg-[#0d0a0f] text-gray-100 selection:bg-rose-500 selection:text-white sparkle-bg py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Cabecera Principal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-400/30 text-rose-300 text-xs tracking-widest uppercase shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Plataforma de Invitaciones Web Interactivas</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-medium">
            Invitaciones Digitales <br />
            <span className="rose-gradient-text font-cursive text-5xl sm:text-7xl block pt-2">
              Mis Quince Años
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Experiencias digitales inolvidables con música de fondo, galería de fotos en alta resolución, cronograma interactivo, mapas GPS y control de asistencia RSVP en tiempo real para los padres.
          </p>
        </div>

        {/* Sección de Tarjetas con las Invitaciones Creadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => {
            const isDemo = event.slug === 'valeria-15';

            return (
              <div
                key={event.id}
                className={`glass-card rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-amber-400/50 hover:shadow-2xl ${
                  isDemo ? 'border-rose-400/40 shadow-rose-950/50' : 'border-white/10'
                }`}
              >
                {/* Portada Miniatura */}
                <div className="relative h-64 w-full overflow-hidden bg-black">
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

                {/* Contenido y Botones */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3 text-sm text-gray-300">
                    <p className="line-clamp-2 italic font-serif">
                      &ldquo;{event.phrase}&rdquo;
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-rose-200">
                        🎵 Música integrada
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-amber-200">
                        📸 {event.gallery.length} Fotos en galería
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-emerald-200">
                        📝 Confirmación RSVP
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-indigo-200">
                        📊 Panel con PIN ({event.adminPin})
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    <Link
                      href={`/${event.slug}`}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:opacity-95 text-white text-sm font-medium text-center shadow-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver Invitación Web</span>
                    </Link>

                    <Link
                      href={`/${event.slug}/admin`}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black/60 hover:bg-rose-950/80 border border-rose-400/30 text-rose-200 hover:text-white text-sm font-medium text-center transition-all"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Panel de Asistencia</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sección Informativa: Cómo llevarlo a lo grande con más clientes */}
        <div className="glass-card-gold rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-sans block">
              Escalabilidad & Nuevos Clientes
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
              ¿Cómo agregar invitaciones para más clientes?
            </h2>
            <p className="text-sm text-gray-300">
              La plataforma está estructurada de forma modular para que puedas crear tantas invitaciones como desees sin rehacer el código.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-5 rounded-2xl bg-black/50 border border-rose-400/20 space-y-2">
              <div className="w-8 h-8 rounded-full bg-rose-600/30 text-rose-300 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-serif text-base text-white font-medium">Enlace Único por Cliente</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Cada cliente tiene su propia URL (ej: <code className="text-amber-300 font-mono">/camila-15</code>) aislada, con sus fotos, música y horarios.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-rose-400/20 space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-600/30 text-amber-300 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-serif text-base text-white font-medium">Panel Privado para los Padres</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Cada madre o anfitriona tiene acceso exclusivo en <code className="text-amber-300 font-mono">/camila-15/admin</code> con su PIN para ver la lista y descargar el Excel.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-rose-400/20 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-serif text-base text-white font-medium">Despliegue Global en Vercel</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Sincronizado con tu cuenta de GitHub y alojado en Vercel con HTTPS gratuito y carga ultra rápida en smartphones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
