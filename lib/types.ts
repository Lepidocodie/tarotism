// ============================================================
// Tarotism – Shared TypeScript Interfaces
// ============================================================

export interface TarotCard {
  id: number;
  name: string;
  name_short: string;
  type: "major" | "minor";
  suit?: string;
  value_int: number;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
  image_url: string;
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position?: string; // e.g. "past" | "present" | "future" | "problem" | "cause" | "advice"
}

export type Topic =
  | "general"
  | "love"
  | "finance"
  | "career"
  | "health"
  | "yesno";

export type SpreadType = "single" | "three";
export type ThreeCardMode = "past-present-future" | "problem-cause-advice";

export interface ReadingRequest {
  topic: Topic;
  spreadType: SpreadType;
  threeCardMode?: ThreeCardMode;
}

export interface ReadingResult {
  cards: DrawnCard[];
  topic: Topic;
  spreadType: SpreadType;
  threeCardMode?: ThreeCardMode;
}

// Labels in Thai for the UI
export const TOPIC_LABELS: Record<Topic, { th: string; en: string; icon: string }> = {
  general: { th: "ภาพรวม", en: "General", icon: "✦" },
  love: { th: "ความรัก", en: "Love", icon: "♥" },
  finance: { th: "การเงิน", en: "Finance", icon: "◈" },
  career: { th: "การงาน", en: "Career", icon: "⚙" },
  health: { th: "สุขภาพ", en: "Health", icon: "☘" },
  yesno: { th: "ใช่หรือไม่", en: "Yes / No", icon: "⚖" },
};

export const POSITION_LABELS: Record<string, { th: string; en: string }> = {
  past: { th: "อดีต", en: "Past" },
  present: { th: "ปัจจุบัน", en: "Present" },
  future: { th: "อนาคต", en: "Future" },
  problem: { th: "ปัญหา", en: "Problem" },
  cause: { th: "สาเหตุ", en: "Cause" },
  advice: { th: "คำแนะนำ", en: "Advice" },
  single: { th: "ไพ่ของคุณ", en: "Your Card" },
};
