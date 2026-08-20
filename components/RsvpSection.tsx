'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Send, Heart, Sparkles, User, Phone, MessageSquare, AlertCircle, Users } from 'lucide-react';

interface RsvpSectionProps {
  slug: string;
  name: string;
  rsvpDeadline: string;
}

export default function RsvpSection({ slug, name, rsvpDeadline }: RsvpSectionProps) {
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestsCount, setGuestsCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#d97706', '#f59e0b', '#ffffff'],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }

    if (attending === null) {
      setErrorMsg('Por favor indícanos si podrás asistir o no.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          fullName: fullName.trim(),
          attending,
          guestsCount: attending ? Number(guestsCount) || 1 : 0,
          phone: phone.trim(),
          dietaryRestrictions: dietaryRestrictions.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al guardar confirmación');
      }

      setSubmitted(true);
      if (attending) {
        triggerConfetti();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Ocurrió un error al enviar tu respuesta. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card-gold rounded-3xl p-8 sm:p-12 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center relative z-10 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-400/30 text-rose-300 text-xs tracking-widest uppercase mb-4">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
            <span>Confirmación de Asistencia</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium mb-3">
            ¿Nos Acompañas a Celebrar?
          </h2>

          <p className="text-rose-100/80 text-sm sm:text-base max-w-lg mx-auto">
            Tu presencia hará que los 15 años de <span className="font-serif italic font-semibold text-amber-300">{name}</span> sean aún más inolvidables.
          </p>

          <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-black/40 border border-amber-400/20 text-xs text-amber-300">
            Confirmar antes del: <strong className="font-serif font-bold text-white">{rsvpDeadline}</strong>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center mx-auto text-white shadow-xl shadow-rose-950/60">
                {attending ? <Sparkles className="w-10 h-10 animate-bounce" /> : <Heart className="w-10 h-10" />}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                {attending ? '¡Muchas gracias por confirmar!' : 'Gracias por avisarnos'}
              </h3>

              <p className="text-gray-300 max-w-md mx-auto text-sm sm:text-base">
                {attending
                  ? `Hemos registrado tu asistencia (${guestsCount} ${guestsCount === 1 ? 'persona' : 'personas'}). ¡Te esperamos con los brazos abiertos para festejar en grande!`
                  : `Lamentamos que no puedas acompañarnos, pero valoramos mucho tu mensaje y buenos deseos.`}
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setAttending(null);
                  setMessage('');
                }}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 text-xs tracking-wider uppercase transition-colors"
              >
                Enviar otra respuesta
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10"
            >
              {errorMsg && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Pregunta Principal: ¿Asistes? */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-300 font-sans mb-3 text-center">
                  ¿Podrás acompañarnos? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all text-sm font-medium ${
                      attending === true
                        ? 'bg-gradient-to-r from-rose-700 to-amber-600 text-white border-amber-400 shadow-lg shadow-rose-950/80 scale-[1.02]'
                        : 'bg-black/40 border-white/10 text-gray-300 hover:border-rose-400/40'
                    }`}
                  >
                    <CheckCircle2 className={`w-5 h-5 ${attending === true ? 'text-white' : 'text-rose-400'}`} />
                    <span>¡Sí, con gusto asistiré!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all text-sm font-medium ${
                      attending === false
                        ? 'bg-zinc-800 text-white border-zinc-500 shadow-md scale-[1.02]'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-zinc-500/40'
                    }`}
                  >
                    <XCircle className="w-5 h-5 text-gray-400" />
                    <span>No podré asistir</span>
                  </button>
                </div>
              </div>

              {/* Nombre Completo */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-300 font-sans mb-2">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Familia Rodríguez Morales / Andrés Gómez"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/60 border border-rose-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Si confirma que SÍ asiste, mostrar cantidad de personas y notas */}
              {attending === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 pt-2"
                >
                  {/* Cantidad de Asistentes */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-300 font-sans mb-2">
                      Número de Pases / Personas
                    </label>
                    <div className="relative">
                      <Users className="w-5 h-5 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/60 border border-rose-400/20 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors text-sm"
                      >
                        <option value={1}>1 Persona</option>
                        <option value={2}>2 Personas</option>
                        <option value={3}>3 Personas</option>
                        <option value={4}>4 Personas</option>
                        <option value={5}>5 Personas</option>
                        <option value={6}>6 Personas</option>
                      </select>
                    </div>
                  </div>

                  {/* Restricciones alimenticias */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-300 font-sans mb-2">
                      Restricciones Alimenticias o Alergias (Opcional)
                    </label>
                    <input
                      type="text"
                      value={dietaryRestrictions}
                      onChange={(e) => setDietaryRestrictions(e.target.value)}
                      placeholder="Ej. 1 vegetariano, alergia a mariscos..."
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-rose-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors text-sm"
                    />
                  </div>
                </motion.div>
              )}

              {/* Teléfono / WhatsApp */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-300 font-sans mb-2">
                  Teléfono / WhatsApp de Contacto (Opcional)
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. +52 55 1234 5678"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/60 border border-rose-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Mensaje de Felicitaciones */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-300 font-sans mb-2">
                  Mensaje o Dedicatoria para la Quinceañera
                </label>
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-rose-400 absolute left-3.5 top-4" />
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tus palabras de cariño y buenos deseos..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/60 border border-rose-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors text-sm resize-none"
                  />
                </div>
              </div>

              {/* Botón de Enviar */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 hover:opacity-95 text-white font-medium text-base sm:text-lg shadow-xl shadow-rose-950/80 transition-all transform active:scale-98 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <span>Guardando tu respuesta...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Confirmar Asistencia</span>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
