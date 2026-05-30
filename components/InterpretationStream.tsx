"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ReadingResult } from "@/lib/types";

interface Props {
  reading: ReadingResult;
}

export default function InterpretationStream({ reading }: Props) {
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reading) return;

    const abortController = new AbortController();

    const streamInterpretation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setCompletion("");

        const response = await fetch("/api/interpret", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reading),
          signal: abortController.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        if (!response.body) {
          throw new Error("No response body received from server");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          setCompletion((prev) => prev + chunk);
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Stream aborted");
        } else {
          console.error("Interpretation Stream Error:", err);
          setError(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI");
        }
      } finally {
        setIsLoading(false);
      }
    };

    streamInterpretation();

    return () => {
      abortController.abort();
    };
  }, [reading]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="icon-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
          </svg>
        </div>
        <div>
          <p className="text-kicker">Your Reading</p>
          <h2 className="text-headline text-on-surface">
            คำทำนาย
          </h2>
        </div>
      </div>

      {/* Content panel */}
      <div className="mystic-panel p-6 md:p-8">
        {error ? (
          <div className="text-center py-8">
            <div className="icon-badge-lg mx-auto mb-4" style={{ borderColor: "var(--color-error)", color: "var(--color-error)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </div>
            <p className="text-error mb-3 text-sm">{error}</p>
            <p className="text-body text-muted mb-6">
              กรุณาลองใหม่อีกครั้ง หรือติดต่อผู้พัฒนา
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-mystic"
            >
              ลองใหม่
            </button>
          </div>
        ) : (
          <>
            {!completion && isLoading && (
              <div className="flex flex-col items-center gap-4 py-12" role="status" aria-label="กำลังตีความไพ่ของคุณ">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ filter: "blur(6px)" }} />
                </div>
                <p className="text-body text-muted">
                  กำลังตีความไพ่ของคุณ...
                </p>
              </div>
            )}

            {completion && (
              <div
                className={`text-body-lg text-on-surface leading-relaxed whitespace-pre-wrap ${
                  isLoading ? "typing-cursor" : ""
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
                aria-live="polite"
                aria-atomic="false"
              >
                {completion}
              </div>
            )}
          </>
        )}
      </div>
    </motion.section>
  );
}
