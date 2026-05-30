"use client";

import { motion } from "framer-motion";
import type { Topic } from "@/lib/types";
import { TOPIC_LABELS } from "@/lib/types";

interface Props {
  onSelect: (topic: Topic) => void;
  selected?: Topic;
}

const topics: Topic[] = ["general", "love", "finance", "career", "health", "yesno"];

const TOPIC_ICONS: Record<Topic, React.ReactNode> = {
  general: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
    </svg>
  ),
  love: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  finance: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 3 8 9l4 13 4-13-2.5-6" />
      <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
      <path d="M2 9h20" />
    </svg>
  ),
  career: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  ),
  health: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M7.5 12h9" />
      <path d="M12 7.5v9" />
    </svg>
  ),
  yesno: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
      <path d="M7 14h.01" />
      <path d="M17 14h.01" />
      <path d="M12 14h.01" />
      <path d="M12 18v-4" />
      <path d="M7 18v-4" />
      <path d="M17 18v-4" />
    </svg>
  ),
};

export default function TopicSelector({ onSelect, selected }: Props) {
  return (
    <section className="flex flex-col items-center gap-10">
      <div className="text-center max-w-2xl">
        <p className="text-kicker mb-4">Private Tarot Reading</p>
        <h1 className="text-display text-on-surface mb-5">
          Seek Guidance from the Aether
        </h1>
        <p className="text-body-lg text-muted max-w-xl mx-auto">
          เลือกหัวข้อที่คุณต้องการดูดวง แล้วปล่อยให้ไพ่ทาโรต์เผยเส้นทางของคุณ
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl">
        {topics.map((topic, i) => {
          const label = TOPIC_LABELS[topic];
          const isActive = selected === topic;
          return (
            <motion.button
              key={topic}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelect(topic)}
              className={`
                choice-card group relative flex flex-col items-start gap-3 p-5 text-left
                ${isActive ? "choice-card-active" : ""}
              `}
            >
              {/* Icon badge */}
              <div className="flex items-center justify-between w-full gap-3">
                <div className={`icon-badge transition-colors duration-300 ${isActive ? "border-primary/40 text-primary" : ""}`}>
                  {TOPIC_ICONS[topic]}
                </div>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-full border border-primary/30 bg-surface-strong px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-primary"
                  >
                    Selected
                  </motion.span>
                )}
              </div>

              {/* Labels */}
              <div>
                <span
                  className={`block text-title transition-colors duration-300 ${
                    isActive ? "text-on-surface" : "text-on-surface"
                  }`}
                >
                  {label.th}
                </span>
                <span className="text-kicker mt-1 block" style={{ color: isActive ? "var(--color-purple)" : "var(--color-muted)" }}>
                  {label.en}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
