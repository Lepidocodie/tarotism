"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SpreadType, ThreeCardMode } from "@/lib/types";

interface Props {
  onSelect: (spread: SpreadType, mode?: ThreeCardMode) => void;
}

export default function SpreadSelector({ onSelect }: Props) {
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);

  return (
    <section className="flex flex-col items-center gap-8">
      {/* Header */}
      <div className="text-center max-w-2xl">
        <p className="text-kicker mb-3">Choose Your Spread</p>
        <h2 className="text-headline text-on-surface mb-3">
          เลือกรูปแบบการจั่วไพ่
        </h2>
        <p className="text-body text-muted">
          เลือกรูปแบบการจั่วไพ่ที่เหมาะกับคำถามของคุณ
        </p>
      </div>

      {/* Editorial panel wrapper */}
      <div className="w-full max-w-4xl p-2 sm:p-4">
        {/* Spread options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          {/* Single Card */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
            onClick={() => onSelect("single")}
            className="flat-card text-center p-8 flex flex-col items-center group relative z-10 hover:border-gold-400"
          >
            <div className="text-primary mb-4 w-12 h-12 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-on-surface mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              SINGLE CARD
            </h3>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted mb-4">
              ไพ่ 1 ใบ สำหรับคำตอบที่ชัดเจน
            </p>
            <div className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">
                1-CARD CLARITY
              </span>
            </div>
          </motion.button>

          {/* Three Card */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
            onClick={() => setSelectedSpread("three")}
            className={`flat-card text-center p-8 flex flex-col items-center group relative z-10 hover:border-gold-400 ${
              selectedSpread === "three" ? "border-gold-500 shadow-md" : ""
            }`}
          >
            <div className="text-primary mb-4 flex items-center justify-center gap-2">
              <svg width="24" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="-rotate-12 opacity-50">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M12 8v8" />
              </svg>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="z-10">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg width="24" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-12 opacity-50">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M8 12h8" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-on-surface mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              THREE CARDS
            </h3>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted mb-4">
              ไพ่ 3 ใบ สำหรับการวิเคราะห์เชิงลึก
            </p>
            <div className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">
                3-CARD STRUCTURE
              </span>
            </div>
          </motion.button>
        </div>

        {/* Three-card mode sub-options */}
        {selectedSpread === "three" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 relative"
          >
            <div className="text-center mb-6 relative z-10">
              <p className="text-kicker text-primary">CHOOSE READING MODE</p>
              <p className="text-body text-muted">เลือกโหมดการอ่าน</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 relative justify-center">
              <div className="relative group flex-1 max-w-sm">
                <button
                  onClick={() => onSelect("three", "past-present-future")}
                  className="flat-card w-full p-4 flex items-center justify-center text-center relative z-10 hover:border-gold-400"
                >
                  <div className="flex flex-col items-center">
                    <span className="block text-lg text-gray-200 font-medium tracking-wide">
                      อดีต — ปัจจุบัน — อนาคต
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-gray-500 mt-1.5 group-hover:text-gold-500 transition-colors">
                      PAST — PRESENT — FUTURE
                    </span>
                  </div>
                </button>
              </div>
              <div className="relative group flex-1 max-w-sm">
                <button
                  onClick={() => onSelect("three", "problem-cause-advice")}
                  className="flat-card w-full p-4 flex items-center justify-center text-center relative z-10 hover:border-gold-400"
                >
                  <div className="flex flex-col items-center">
                    <span className="block text-lg text-gray-200 font-medium tracking-wide">
                      ปัญหา — สาเหตุ — คำแนะนำ
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-gray-500 mt-1.5 group-hover:text-gold-500 transition-colors">
                      PROBLEM — CAUSE — ADVICE
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
