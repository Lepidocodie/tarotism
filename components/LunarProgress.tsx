"use client";

import { motion } from "framer-motion";

interface Props {
  currentStep: number; // 0-4
}

const STEPS = [
  { label: "หัวข้อ", sublabel: "Topic" },
  { label: "รูปแบบ", sublabel: "Spread" },
  { label: "จั่วไพ่", sublabel: "Draw" },
  { label: "เปิดไพ่", sublabel: "Reveal" },
  { label: "คำทำนาย", sublabel: "Reading" },
];

export default function LunarProgress({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        const isFuture = i > currentStep;
        return (
          <div key={step.label} className="flex items-center">
            {/* Step indicator */}
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  scale: isCurrent ? 1 : 0.85,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <svg
                  width={isCurrent ? 36 : 28}
                  height={isCurrent ? 36 : 28}
                  viewBox="0 0 36 36"
                  className="transition-all duration-300"
                >
                  {/* Background circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill={
                      isCompleted
                        ? "oklch(0.78 0.14 85 / 0.15)"
                        : isCurrent
                          ? "oklch(0.78 0.14 85 / 0.1)"
                          : "oklch(0.17 0.018 280)"
                    }
                    stroke={
                      isCompleted
                        ? "oklch(0.78 0.14 85 / 0.6)"
                        : isCurrent
                          ? "oklch(0.78 0.14 85)"
                          : "oklch(0.30 0.025 280 / 0.5)"
                    }
                    strokeWidth={isCurrent ? 2 : 1.5}
                  />
                  {/* Completed checkmark */}
                  {isCompleted && (
                    <motion.path
                      d="M12 18 L16 22 L24 14"
                      fill="none"
                      stroke="oklch(0.78 0.14 85)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  {/* Current dot */}
                  {isCurrent && (
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="4"
                      fill="oklch(0.78 0.14 85)"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  {/* Future dot */}
                  {isFuture && (
                    <circle
                      cx="18"
                      cy="18"
                      r="3"
                      fill="oklch(0.30 0.025 280 / 0.5)"
                    />
                  )}
                </svg>
              </motion.div>
              {/* Label */}
              <div className="text-center min-w-[3.5rem]">
                <span
                  className={`block text-[10px] font-medium transition-colors duration-300 ${
                    isCompleted || isCurrent
                      ? "text-primary"
                      : "text-muted"
                  }`}
                >
                  {step.label}
                </span>
                <span
                  className={`block text-[8px] uppercase tracking-widest transition-colors duration-300 ${
                    isCompleted || isCurrent
                      ? "text-on-surface-variant"
                      : "text-muted/50"
                  }`}
                >
                  {step.sublabel}
                </span>
              </div>
            </div>
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="relative mx-1 md:mx-2 w-6 md:w-12 h-px self-start mt-[14px]">
                <div className="absolute inset-0 bg-outline-dim/50" />
                {isCompleted && (
                  <motion.div
                    className="absolute inset-0 bg-primary/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
