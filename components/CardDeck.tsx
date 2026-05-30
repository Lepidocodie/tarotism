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

      {/* Picking Area - Circular Ring */}
      {isPicking ? (
        <div className="relative w-full flex flex-col items-center justify-center" style={{ height: "660px" }}>
          <div className="relative" style={{ width: "600px", height: "600px" }}>
            {[...Array(40)].map((_, i) => {
              const totalCards = 40;
              const angleDeg = (i / totalCards) * 360 - 90;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 240;
              const cx = 300;
              const cy = 300;
              const x = cx + radius * Math.cos(angleRad) - 40;
              const y = cy + radius * Math.sin(angleRad) - 60;
              const cardRotation = angleDeg + 90;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ delay: i * 0.02, duration: 0.4 }}
                  whileHover={{
                    scale: 1.15,
                    zIndex: 50,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute w-20 h-[120px] card-back-pattern rounded-lg shadow-xl cursor-pointer transition-colors flex items-center justify-center overflow-hidden"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: `rotate(${cardRotation}deg)`,
                    zIndex: i,
                    transformOrigin: "center center",
                  }}
                  onClick={handlePick}
                >
                  <div className="absolute inset-0 bg-primary/5 hover:bg-transparent transition-colors" />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/40">
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                  </svg>
                </motion.div>
              );
            })}
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center mystic-panel p-6" style={{ borderRadius: "50%", width: "140px", height: "140px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <p className="text-body text-muted mb-1">คลิกเลือกไพ่</p>
                <p className="text-xl font-semibold text-primary" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {pickedCount}/{cards.length}
                </p>
              </div>
            </div>
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
