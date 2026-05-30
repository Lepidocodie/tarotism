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
      <div className="mystic-panel-strong w-full max-w-2xl p-5 sm:p-6">
        {/* Section kicker */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-5">
          <p className="text-kicker">Select Spread Type</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mystic-pill text-[10px]">
              1 or 3 Cards
            </span>
          </div>
        </div>

        {/* Spread options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Single Card */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelect("single")}
            className="choice-card p-5 text-left"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="icon-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.5 3 8 9l4 13 4-13-2.5-6" />
                  <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
                  <path d="M2 9h20" />
                </svg>
              </div>
              <span className="rounded-full border border-outline-dim/70 bg-surface-container px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-muted">
                Quick read
              </span>
            </div>
            <h3 className="text-title text-on-surface mb-1.5">
              Single Card
            </h3>
            <p className="text-[11px] uppercase tracking-[0.16em] text-purple mb-2">
              ไพ่ 1 ใบ สำหรับคำตอบที่ชัดเจน
            </p>
            <div className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/8 px-2 py-0.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">
                1-card clarity
              </span>
            </div>
          </motion.button>

          {/* Three Card */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedSpread("three")}
            className={`choice-card p-5 text-left ${
              selectedSpread === "three" ? "choice-card-active" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="icon-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z" />
                  <path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845" />
                </svg>
              </div>
              {selectedSpread === "three" ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-full border border-primary/30 bg-surface-strong px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-primary"
                >
                  Selected
                </motion.span>
              ) : (
                <span className="rounded-full border border-outline-dim/70 bg-surface-container px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-muted">
                  Deep read
                </span>
              )}
            </div>
            <h3 className="text-title text-on-surface mb-1.5">
              Three Cards
            </h3>
            <p className="text-[11px] uppercase tracking-[0.16em] text-purple mb-2">
              ไพ่ 3 ใบ สำหรับการวิเคราะห์เชิงลึก
            </p>
            <div className="inline-flex items-center gap-1 rounded-md border border-teal/30 bg-teal/8 px-2 py-0.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-teal">
                3-card structure
              </span>
            </div>
          </motion.button>
        </div>

        {/* Three-card mode sub-options */}
        {selectedSpread === "three" && (
          <>
            <div className="editorial-divider" />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <p className="text-kicker">Choose Reading Mode</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onSelect("three", "past-present-future")}
                  className="editorial-chip flex-1 justify-center py-3.5 text-center cursor-pointer"
                >
                  <div>
                    <span className="block text-sm text-on-surface" style={{ fontFamily: "var(--font-cinzel)" }}>
                      อดีต — ปัจจุบัน — อนาคต
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-muted mt-0.5">
                      Past — Present — Future
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => onSelect("three", "problem-cause-advice")}
                  className="editorial-chip flex-1 justify-center py-3.5 text-center cursor-pointer"
                >
                  <div>
                    <span className="block text-sm text-on-surface" style={{ fontFamily: "var(--font-cinzel)" }}>
                      ปัญหา — สาเหตุ — คำแนะนำ
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-muted mt-0.5">
                      Problem — Cause — Advice
                    </span>
                  </div>
                </button>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                เลือกมุมมองที่เหมาะกับคำถามของคุณ
              </p>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
