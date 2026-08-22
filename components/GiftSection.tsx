'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink } from 'lucide-react';
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
    <section className="py-24 sm:py-32 px-6 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        <span className="text-[11px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block">
          Mesa de Regalos
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
          {giftRegistry.title}
        </h2>

        <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
          {giftRegistry.description}
        </p>

        {/* Datos Bancarios Integrados */}
        {(giftRegistry.bankName || giftRegistry.accountNumber) && (
          <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-[#1A1A1A]/80 border border-rosegold/20 text-left space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs tracking-widest uppercase text-rosegold font-sans font-medium">
                Transferencia
              </span>
              <span className="text-xs text-gray-400 font-sans">{giftRegistry.bankName}</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm font-light">
              {giftRegistry.accountHolder && (
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-gray-500 block">Titular:</span>
                  <span className="text-gray-200 font-serif">{giftRegistry.accountHolder}</span>
                </div>
              )}

              {giftRegistry.accountNumber && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-gray-500 block">Cuenta:</span>
                    <span className="font-mono text-rosegold-light">{giftRegistry.accountNumber}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(giftRegistry.accountNumber!, 'account')}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rosegold transition-colors"
                    title="Copiar"
                  >
                    {copiedField === 'account' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {giftRegistry.clabeOrCbu && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-gray-500 block">CLABE:</span>
                    <span className="font-mono text-rosegold-light">{giftRegistry.clabeOrCbu}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(giftRegistry.clabeOrCbu!, 'clabe')}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rosegold transition-colors"
                    title="Copiar"
                  >
                    {copiedField === 'clabe' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {giftRegistry.alias && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-gray-500 block">Alias:</span>
                    <span className="font-mono text-rosegold font-bold">{giftRegistry.alias}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(giftRegistry.alias!, 'alias')}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rosegold transition-colors"
                    title="Copiar"
                  >
                    {copiedField === 'alias' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {giftRegistry.wishListUrl && (
          <div className="pt-2">
            <a
              href={giftRegistry.wishListUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-rosegold/30 hover:bg-rosegold/10 text-rosegold text-xs tracking-widest uppercase transition-all"
            >
              <span>Ver Mesa Online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        <div className="w-12 h-[1px] bg-rosegold/30 mx-auto mt-8" />
      </motion.div>
    </section>
  );
}
