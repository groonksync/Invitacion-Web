'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Send, Heart, Sparkles, AlertCircle } from 'lucide-react';

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
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E2A4AD', '#F5D3D8', '#B8737D', '#ffffff'],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre.');
      return;
    }

    if (attending === null) {
      setErrorMsg('Por favor indícanos si podrás asistir.');
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
      setErrorMsg(err.message || 'Ocurrió un error al enviar tu respuesta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-28 sm:py-36 px-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-12"
      >
        {/* Encabezado sin contenedores rígidos */}
        <div className="text-center space-y-4">
          <span className="text-[11px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block">
            Confirmación
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-white font-light">
            ¿Nos Acompañas?
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto font-light leading-relaxed">
            Tu presencia hará que esta noche sea aún más inolvidable.
          </p>

          <span className="inline-block text-xs text-rosegold/80 font-sans tracking-wider uppercase pt-2">
            Confirmar antes del {rsvpDeadline}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-16 h-16 rounded-full border border-rosegold/40 flex items-center justify-center mx-auto text-rosegold">
                {attending ? <Sparkles className="w-8 h-8" /> : <Heart className="w-8 h-8" />}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                {attending ? '¡Gracias por Confirmar!' : 'Gracias por tu Respuesta'}
              </h3>

              <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto font-light">
                {attending
                  ? `Hemos registrado tu asistencia (${guestsCount} ${guestsCount === 1 ? 'pase' : 'pases'}). ¡Te esperamos con mucha ilusión!`
                  : `Lamentamos que no puedas acompañarnos, valoramos mucho tus buenos deseos.`}
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setAttending(null);
                  setMessage('');
                }}
                className="inline-block text-xs text-rosegold hover:underline uppercase tracking-widest pt-4"
              >
                Enviar otra respuesta
              </button>
            </motion.div>
          ) : (
            /* Formulario Orgánico Minimalista */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-8 text-left"
            >
              {errorMsg && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Selector de Asistencia */}
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-widest text-rosegold font-sans font-light block text-center">
                  ¿Asistirás a la celebración? *
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`py-3.5 px-4 rounded-2xl border text-xs sm:text-sm font-sans tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                      attending === true
                        ? 'bg-rosegold/20 border-rosegold text-rosegold-light shadow-lg'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-rosegold/30'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sí, asistiré</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`py-3.5 px-4 rounded-2xl border text-xs sm:text-sm font-sans tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                      attending === false
                        ? 'bg-white/15 border-gray-400 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>No podré ir</span>
                  </button>
                </div>
              </div>

              {/* Nombre Completo */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-gray-400 font-sans font-light">
                  Nombre y Apellidos *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Escribe tu nombre completo"
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-rosegold transition-colors text-sm font-light"
                />
              </div>

              {/* Campos condicionales si asiste */}
              {attending === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest text-gray-400 font-sans font-light">
                      Número de Pases
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#1A1A1A] border border-white/10 text-white focus:outline-none focus:border-rosegold text-sm"
                    >
                      <option value={1}>1 Persona</option>
                      <option value={2}>2 Personas</option>
                      <option value={3}>3 Personas</option>
                      <option value={4}>4 Personas</option>
                      <option value={5}>5 Personas</option>
                      <option value={6}>6 Personas</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest text-gray-400 font-sans font-light">
                      Restricciones Alimenticias (Opcional)
                    </label>
                    <input
                      type="text"
                      value={dietaryRestrictions}
                      onChange={(e) => setDietaryRestrictions(e.target.value)}
                      placeholder="Ej. Menú vegetariano, alergia..."
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-rosegold text-sm font-light"
                    />
                  </div>
                </motion.div>
              )}

              {/* Teléfono */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-gray-400 font-sans font-light">
                  Teléfono / WhatsApp (Opcional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-rosegold text-sm font-light"
                />
              </div>

              {/* Mensaje de Felicitación */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-gray-400 font-sans font-light">
                  Mensaje para la Quinceañera
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe unas palabras de cariño..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-rosegold text-sm font-light resize-none"
                />
              </div>

              {/* Botón de Envío Minimalista en Oro Rosa */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C97D88] via-[#E2A4AD] to-[#C97D88] hover:opacity-95 text-[#131313] font-serif font-medium text-base tracking-widest uppercase transition-all shadow-xl shadow-rosegold/10 disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Confirmar Asistencia'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
