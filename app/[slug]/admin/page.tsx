'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getEventBySlug } from '@/data/events';
import { RsvpEntry, RsvpStats } from '@/types/rsvp';
import {
  Users,
  CheckCircle2,
  XCircle,
  Download,
  Share2,
  ExternalLink,
  Search,
  Lock,
  ArrowLeft,
  RefreshCw,
  Phone,
  MessageSquare,
  AlertTriangle,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function AdminPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const event = getEventBySlug(slug);

  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [stats, setStats] = useState<RsvpStats>({
    totalResponses: 0,
    totalAttending: 0,
    totalDeclined: 0,
    totalConfirmedGuests: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'attending' | 'declined'>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Verificar sesión existente en sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && event) {
      const savedAuth = sessionStorage.getItem(`admin_auth_${slug}`);
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
        fetchData();
      }
    }
  }, [slug, event]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    if (pin.trim() === event.adminPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem(`admin_auth_${slug}`, 'true');
      setAuthError('');
      fetchData();
    } else {
      setAuthError('PIN incorrecto. Intenta nuevamente.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rsvp?slug=${slug}`);
      const data = await res.json();
      if (res.ok) {
        setRsvps(data.rsvps || []);
        setStats(data.stats || {
          totalResponses: 0,
          totalAttending: 0,
          totalDeclined: 0,
          totalConfirmedGuests: 0,
        });
      }
    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (rsvps.length === 0) {
      alert('No hay registros para exportar todavía.');
      return;
    }

    const headers = [
      'Nombre del Invitado',
      'Asistencia',
      'Cantidad de Personas / Pases',
      'Teléfono / WhatsApp',
      'Restricciones Alimenticias',
      'Mensaje / Dedicatoria',
      'Fecha de Registro',
    ];

    const rows = rsvps.map((r) => [
      `"${r.fullName.replace(/"/g, '""')}"`,
      r.attending ? 'CONFIRMADO (SÍ)' : 'NO ASISTIRÁ',
      r.guestsCount || 0,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.dietaryRestrictions || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      new Date(r.createdAt).toLocaleString('es-ES'),
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `asistencia_${slug}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyInvitationLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/${slug}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0d0a0f] flex items-center justify-center p-4">
        <div className="glass-card rounded-2xl p-8 text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-xl font-serif text-white mb-2">Evento no encontrado</h1>
          <p className="text-gray-400 text-sm mb-6">No existe un evento registrado para el identificador &quot;{slug}&quot;.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    );
  }

  // Pantalla de Bloqueo / PIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0a0f] flex items-center justify-center p-4 sparkle-bg">
        <div className="glass-card-gold rounded-3xl p-8 sm:p-10 max-w-md w-full text-center relative shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 to-amber-500 flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-rose-950/80">
            <Lock className="w-8 h-8" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-2">
            Panel de Asistencia
          </h1>
          <p className="text-rose-200/80 text-sm mb-6 font-serif italic">
            {event.name} - {event.subtitle}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-300 font-sans mb-2 text-left">
                Ingresa el PIN de Acceso:
              </label>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder={`PIN de muestra: ${event.adminPin}`}
                className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-rose-400/30 text-white text-center text-xl tracking-widest focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-red-400 text-xs font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:opacity-90 text-white font-medium text-sm transition-all shadow-lg shadow-rose-950/60"
            >
              Entrar al Panel
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-rose-400/20 text-center">
            <Link
              href={`/${slug}`}
              className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Invitación Pública</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtrar RSVPs según búsqueda y tab
  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch = r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.message && r.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.phone && r.phone.includes(searchTerm));

    if (filter === 'attending') return matchesSearch && r.attending;
    if (filter === 'declined') return matchesSearch && !r.attending;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0d0a0f] text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Barra Superior */}
        <header className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-400/30 text-rose-300 text-xs tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Panel de Control de Anfitriones</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-medium">
              Invitación de {event.name}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Control de asistencia en tiempo real, pases y mensajes de los invitados.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={copyInvitationLink}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/60 border border-rose-400/30 text-rose-200 text-xs sm:text-sm hover:bg-rose-950 transition-colors"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace Invitación'}</span>
            </button>

            <Link
              href={`/${slug}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/80 border border-rose-400/40 text-white text-xs sm:text-sm hover:bg-rose-900 transition-colors"
            >
              <span>Ver Invitación</span>
              <ExternalLink className="w-4 h-4" />
            </Link>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white text-xs sm:text-sm font-medium shadow-lg shadow-emerald-950/50 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Excel (CSV)</span>
            </button>
          </div>
        </header>

        {/* Tarjetas de Métricas Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card-gold rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 block font-sans">Total Pases Confirmados</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white">{stats.totalConfirmedGuests}</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex items-center gap-4 border-emerald-500/20">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 block font-sans">Familias / Invitados Sí</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300">{stats.totalAttending}</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex items-center gap-4 border-rose-500/20">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 block font-sans">No Podrán Asistir</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-rose-300">{stats.totalDeclined}</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex items-center gap-4 border-indigo-500/20">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 block font-sans">Total Respuestas</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-indigo-200">{stats.totalResponses}</span>
            </div>
          </div>
        </div>

        {/* Tabla y Listado de Invitados */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Barra de Filtros y Buscador */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, mensaje o teléfono..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-rose-400/20 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                  filter === 'all'
                    ? 'bg-rose-600 text-white'
                    : 'bg-black/40 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                Todos ({rsvps.length})
              </button>
              <button
                onClick={() => setFilter('attending')}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                  filter === 'attending'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-black/40 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                Confirmados ({stats.totalAttending})
              </button>
              <button
                onClick={() => setFilter('declined')}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                  filter === 'declined'
                    ? 'bg-zinc-700 text-white'
                    : 'bg-black/40 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                No Asistirán ({stats.totalDeclined})
              </button>
              <button
                onClick={fetchData}
                disabled={loading}
                title="Actualizar lista"
                className="p-2 rounded-xl bg-black/40 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Tabla de Resultados */}
          {filteredRsvps.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-rose-400/20 rounded-2xl">
              <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No se encontraron confirmaciones con ese criterio de búsqueda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-rose-400/20 text-xs uppercase tracking-wider text-amber-300/80 font-sans">
                    <th className="py-3 px-4">Invitado / Familia</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4 text-center">Pases</th>
                    <th className="py-3 px-4">Contacto</th>
                    <th className="py-3 px-4">Alergias / Menú</th>
                    <th className="py-3 px-4">Mensaje</th>
                    <th className="py-3 px-4 text-right">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-400/10">
                  {filteredRsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-medium text-white">
                        {rsvp.fullName}
                      </td>
                      <td className="py-4 px-4">
                        {rsvp.attending ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Confirmado</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-600 text-zinc-400 text-xs">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>No Asistirá</span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-serif font-bold text-amber-200 text-base">
                          {rsvp.attending ? rsvp.guestsCount : 0}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-xs">
                        {rsvp.phone ? (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                            <span>{rsvp.phone}</span>
                          </div>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-300 max-w-xs truncate">
                        {rsvp.dietaryRestrictions || <span className="text-gray-600">Ninguna</span>}
                      </td>
                      <td className="py-4 px-4 text-xs text-rose-200/90 italic max-w-xs">
                        {rsvp.message ? (
                          <div className="flex items-start gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">&ldquo;{rsvp.message}&rdquo;</span>
                          </div>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right text-xs text-gray-400 whitespace-nowrap">
                        {new Date(rsvp.createdAt).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
