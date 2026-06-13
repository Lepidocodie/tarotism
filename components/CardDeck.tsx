"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import TarotCard from "./TarotCard";
import type { DrawnCard } from "@/lib/types";

interface Props {
  cards: DrawnCard[];
  onAllRevealed: () => void;
}

export default function CardDeck({ cards, onAllRevealed }: Props) {
  const [pickedCount, setPickedCount] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(new Array(cards.length).fill(false));

  const handlePick = () => {
    if (pickedCount < cards.length) {
      setPickedCount((prev) => prev + 1);
    }
  };

  const handleFlip = useCallback(
    (index: number) => {
      setRevealed((prev) => {
        const next = [...prev];
        next[index] = true;
        // Check if all cards are now revealed
        if (next.every(Boolean)) {
          setTimeout(onAllRevealed, 800);
        }
        return next;
      });
    },
    [onAllRevealed]
  );

  const isPicking = pickedCount < cards.length;

  return (
    <section className="flex flex-col items-center gap-10 py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <p className="text-kicker mb-3">
          {isPicking ? "Draw Your Cards" : "Your Spread"}
        </p>
        <h2 className="text-headline text-on-surface mb-3">
          {isPicking ? "เลือกไพ่ของคุณ" : "ชะตากรรมที่รอคอย"}
        </h2>
        <p className="text-body text-muted">
          {isPicking
            ? `โปรดเลือกไพ่จากสำรับให้ครบ ${cards.length} ใบ (${pickedCount}/${cards.length})`
            : revealed.every(Boolean)
              ? "ไพ่ทุกใบถูกเปิดแล้ว กำลังตีความ..."
              : "คลิกที่ไพ่เพื่อเปิดเผยชะตากรรมของคุณ"}
        </p>
      </motion.div>

      {/* Picking Area - Circular/Spiral Ring */}
      {isPicking ? (
        <div className="relative w-full flex flex-col items-center justify-center" style={{ height: "700px" }}>
          <div className="relative" style={{ width: "600px", height: "600px" }}>
            {[...Array(40)].map((_, i) => {
              const totalCards = 40;
              // Spiral logic: t goes from 0 to 1. Inner is 0, outer is 1.
              // To match the screenshot, we want the cards to spiral around 1.5 times.
              const t = i / (totalCards - 1);
              const revolutions = 1.6;
              const angleRad = (t * revolutions * 2 * Math.PI) + (Math.PI * 0.5); // Start at bottom
              const radius = 150 + t * 200; // Start at 150px, end at 350px

              const cx = 300;
              const cy = 300;
              const x = cx + radius * Math.cos(angleRad) - 40;
              const y = cy + radius * Math.sin(angleRad) - 60;
              
              // The card should be tangent to the curve, so we rotate it by the angle + 90 degrees
              // Because radius increases linearly with angle, the tangent is slightly offset, but +90 is close enough visually.
              const cardRotation = (angleRad * 180) / Math.PI + 70 + (t * 20);

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, x: 260, y: 240 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x,
                    y,
                    rotate: cardRotation
                  }}
                  transition={{ delay: i * 0.03, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    scale: 1.15,
                    zIndex: 100,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute w-20 h-[120px] bg-[#141b2d] border border-gold-500/30 rounded-lg shadow-xl cursor-pointer transition-all flex items-center justify-center overflow-hidden"
                  style={{
                    zIndex: i,
                    transformOrigin: "center center",
                  }}
                  onClick={handlePick}
                >
                  <div className="absolute inset-0 bg-[#d4af37]/5 hover:bg-[#d4af37]/20 transition-colors" />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-500/40">
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                  </svg>
                </motion.div>
              );
            })}
            
            {/* Center Counter */}
            <motion.div
              key={pickedCount}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-[60] pointer-events-none"
            >
              <div className="w-24 h-24 rounded-full border border-gold-500/20 bg-[#0a0e17]/90 shadow-[0_0_30px_rgba(10,14,23,0.8)] flex flex-col items-center justify-center">
                <span className="text-gray-400 text-xs mb-1 font-light tracking-wide">คลิกเลือกไพ่</span>
                <span className="text-gold-400 font-bold text-2xl">
                  {pickedCount}<span className="text-gold-500/50 text-lg">/{cards.length}</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        /* Spread Area */
        <div className="flex gap-6 md:gap-10 justify-center flex-wrap">
          {cards.map((dc, i) => (
            <TarotCard
              key={`${dc.card.name_short}-${i}`}
              drawnCard={dc}
              index={i}
              onFlip={() => handleFlip(i)}
              isRevealed={revealed[i]}
            />
          ))}
        </div>
      )}
    </section>
  );
}
