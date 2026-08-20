'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check, ExternalLink, CreditCard } from 'lucide-react';
import { EventData } from '@/types/event';

interface GiftSectionProps {
  giftRegistry: EventData['giftRegistry'];
}

export default function GiftSection({ giftRegistry }: GiftSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 sm:p-12 border-rose-400/20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-300 text-xs tracking-widest uppercase mb-4">
          <Gift className="w-3.5 h-3.5 text-amber-300" />
          <span>Mesa de Regalos</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium mb-3">
          {giftRegistry.title}
        </h2>

        <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
          {giftRegistry.description}
        </p>

        {/* Tarjeta de Datos Bancarios */}
        {(giftRegistry.bankName || giftRegistry.accountNumber) && (
          <div className="bg-black/50 border border-amber-400/25 rounded-2xl p-6 text-left max-w-md mx-auto mb-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-rose-400/20 pb-3 mb-4">
              <div className="flex items-center gap-2 text-amber-300 text-sm font-medium">
                <CreditCard className="w-4 h-4" />
                <span>Datos para Transferencia</span>
              </div>
              <span className="text-xs text-rose-300/80 font-sans">{giftRegistry.bankName}</span>
            </div>

            <div className="space-y-3 text-sm">
              {giftRegistry.accountHolder && (
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 block">Titular:</span>
                  <span className="font-medium text-white">{giftRegistry.accountHolder}</span>
                </div>
              )}

              {giftRegistry.accountNumber && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 block">N° Cuenta:</span>
                    <span className="font-mono text-amber-200">{giftRegistry.accountNumber}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(giftRegistry.accountNumber!, 'account')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-400/30 text-rose-200 text-xs hover:bg-rose-900 transition-colors"
                  >
                    {copiedField === 'account' ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {giftRegistry.clabeOrCbu && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 block">CLABE / CBU:</span>
                    <span className="font-mono text-amber-200">{giftRegistry.clabeOrCbu}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(giftRegistry.clabeOrCbu!, 'clabe')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-400/30 text-rose-200 text-xs hover:bg-rose-900 transition-colors"
                  >
                    {copiedField === 'clabe' ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {giftRegistry.alias && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 block">Alias:</span>
                    <span className="font-mono text-rose-200 font-bold">{giftRegistry.alias}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(giftRegistry.alias!, 'alias')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-400/30 text-rose-200 text-xs hover:bg-rose-900 transition-colors"
                  >
                    {copiedField === 'alias' ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botón de Mesa de Regalos Externa */}
        {giftRegistry.wishListUrl && (
          <a
            href={giftRegistry.wishListUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-medium text-sm shadow-lg shadow-rose-950/50 transition-all transform hover:scale-105"
          >
            <span>Ver Mesa de Regalos Online</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </motion.div>
    </section>
  );
}
