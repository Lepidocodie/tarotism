"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import TopicSelector from "@/components/TopicSelector";
import SpreadSelector from "@/components/SpreadSelector";
import CardDeck from "@/components/CardDeck";
import InterpretationStream from "@/components/InterpretationStream";
import LunarProgress from "@/components/LunarProgress";
import Footer from "@/components/Footer";
import type { Topic, SpreadType, ThreeCardMode, ReadingResult } from "@/lib/types";

type Phase = "topic" | "spread" | "drawing" | "revealing" | "interpreting";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("topic");
  const [topic, setTopic] = useState<Topic | undefined>();
  const [reading, setReading] = useState<ReadingResult | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const stepMap: Record<Phase, number> = {
    topic: 0,
    spread: 1,
    drawing: 2,
    revealing: 3,
    interpreting: 4,
  };

  const handleTopicSelect = useCallback((t: Topic) => {
    setTopic(t);
    setPhase("spread");
  }, []);

  const handleSpreadSelect = useCallback(
    async (spreadType: SpreadType, threeCardMode?: ThreeCardMode) => {
      if (!topic) return;
      setPhase("drawing");
      setIsDrawing(true);

      try {
        const res = await fetch("/api/draw", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, spreadType, threeCardMode }),
        });
        const data: ReadingResult = await res.json();
        setReading(data);

        // Brief delay to show the shuffle, then reveal cards
        setTimeout(() => {
          setIsDrawing(false);
          setPhase("revealing");
        }, 1200);
      } catch {
        setIsDrawing(false);
        setPhase("spread");
      }
    },
    [topic]
  );

  const handleAllRevealed = useCallback(() => {
    setPhase("interpreting");
  }, []);

  const handleBack = useCallback(() => {
    switch (phase) {
      case "spread":
        setPhase("topic");
        break;
      case "drawing":
      case "revealing":
        setReading(null);
        setIsDrawing(false);
        setPhase("spread");
        break;
      case "interpreting":
        setPhase("revealing");
        break;
    }
  }, [phase]);

  const handleReset = useCallback(() => {
    setPhase("topic");
    setTopic(undefined);
    setReading(null);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          {phase !== "topic" && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleBack}
              className="flex items-center gap-2 text-muted hover:text-on-surface transition-colors mb-6 cursor-pointer group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-x-1 transition-transform"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span className="text-[11px] uppercase tracking-[0.14em] font-medium">ย้อนกลับ</span>
            </motion.button>
          )}

          {/* Progress */}
          <div className="mb-10">
            <LunarProgress currentStep={stepMap[phase]} />
          </div>

          {/* Phase Content */}
          <AnimatePresence mode="wait">
            {phase === "topic" && (
              <motion.div
                key="topic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <TopicSelector onSelect={handleTopicSelect} selected={topic} />
              </motion.div>
            )}

            {phase === "spread" && (
              <motion.div
                key="spread"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpreadSelector onSelect={handleSpreadSelect} />
              </motion.div>
            )}

            {phase === "drawing" && isDrawing && (
              <motion.div
                key="drawing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-6 py-20"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-36 rounded-lg card-back-pattern"
                  />
                  <div className="absolute inset-0 rounded-lg animate-pulse-glow" style={{ filter: "blur(8px)" }} />
                </div>
                <p className="text-body-lg text-muted" style={{ fontFamily: "var(--font-cinzel)" }}>
                  กำลังสับไพ่...
                </p>
              </motion.div>
            )}

            {(phase === "revealing" || phase === "interpreting") && reading && (
              <motion.div
                key="cards"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-16"
              >
                <CardDeck
                  cards={reading.cards}
                  onAllRevealed={handleAllRevealed}
                />

                {phase === "interpreting" && (
                  <InterpretationStream reading={reading} />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset Button */}
          {phase === "interpreting" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex justify-center mt-12"
            >
              <button onClick={handleReset} className="btn-mystic">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                </svg>
                เริ่มดูดวงใหม่
              </button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
