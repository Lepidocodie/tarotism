"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { DrawnCard } from "@/lib/types";
import { POSITION_LABELS } from "@/lib/types";

interface Props {
  drawnCard: DrawnCard;
  index: number;
  onFlip: () => void;
  isRevealed: boolean;
}

export default function TarotCard({ drawnCard, index, onFlip, isRevealed }: Props) {
  const [imgError, setImgError] = useState(false);
  const { card, isReversed, position } = drawnCard;
  const posLabel = position ? POSITION_LABELS[position] : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateZ: -5 + index * 5 }}
      animate={{ opacity: 1, y: 0, rotateZ: 0 }}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-4 w-32 sm:w-40 md:w-[200px]"
    >
      {/* Position Label */}
      {posLabel && (
        <div className="text-center space-y-0.5">
          <span className="text-kicker block">{posLabel.th}</span>
          <span className="text-[9px] uppercase tracking-[0.14em] text-muted block">{posLabel.en}</span>
        </div>
      )}

      {/* Card */}
      <div
        role="button"
        tabIndex={isRevealed ? -1 : 0}
        aria-label={isRevealed ? card.name : "Click to reveal card"}
        onKeyDown={(e) => {
          if (!isRevealed && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onFlip();
          }
        }}
        className={`perspective cursor-pointer w-full aspect-[20/34] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
          isRevealed
            ? "animate-golden-reveal"
            : "animate-pulse-glow hover:-translate-y-2 transition-transform duration-300"
        }`}
        onClick={() => !isRevealed && onFlip()}
      >
        <div className={`card-inner ${isRevealed ? "flipped" : ""}`}>
          {/* Back */}
          <div className="card-face card-back card-back-pattern flex items-center justify-center">
            <div className="flex flex-col items-center gap-2.5 opacity-70">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/60">
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
              </svg>
              <div className="w-12 h-px bg-primary/20" />
              <span className="text-[9px] uppercase tracking-[0.14em] text-muted/60">
                {isRevealed ? "" : "Tap to Reveal"}
              </span>
            </div>
          </div>

          {/* Front */}
          <div className="card-face card-front border border-primary/40 bg-surface-container overflow-hidden" style={{ borderRadius: "var(--radius-sm)" }}>
            <div
              className="relative w-full h-full flex flex-col"
              style={isReversed ? { transform: "rotate(180deg)" } : undefined}
            >
              {!imgError ? (
                <Image
                  src={card.image_url}
                  alt={card.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 200px"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center bg-secondary p-4">
                  <span className="text-body text-center text-on-surface" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {card.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Name and Status Label */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center"
        >
          <p className="text-sm md:text-base text-on-surface font-medium" style={{ fontFamily: "var(--font-cinzel)" }}>
            {card.name}
          </p>
          {isReversed && (
            <p className="text-[10px] text-error mt-1 uppercase tracking-[0.14em] font-semibold">
              กลับหัว (Reversed)
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
