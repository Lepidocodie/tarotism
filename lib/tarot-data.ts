import tarotData from "@/data/tarot-cards.json";
import type { TarotCard, DrawnCard } from "./types";

const cards: TarotCard[] = tarotData.cards as TarotCard[];

/**
 * Get all 78 tarot cards.
 */
export function getAllCards(): TarotCard[] {
  return cards;
}

/**
 * Get a single card by its numeric ID (0-77).
 */
export function getCardById(id: number): TarotCard | undefined {
  return cards.find((c) => c.id === id);
}

/**
 * Get a card by its short name (e.g. "ar01", "cu05").
 */
export function getCardByShortName(nameShort: string): TarotCard | undefined {
  return cards.find((c) => c.name_short === nameShort);
}

/**
 * Draw N unique random cards from the deck.
 * Each card has a 50/50 chance of being reversed.
 */
export function drawRandomCards(
  count: number,
  positions?: string[]
): DrawnCard[] {
  const deck = [...cards];
  const drawn: DrawnCard[] = [];

  for (let i = 0; i < count && deck.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck.splice(randomIndex, 1)[0];
    drawn.push({
      card,
      isReversed: Math.random() < 0.5,
      position: positions?.[i],
    });
  }

  return drawn;
}

/**
 * Get position labels based on spread type and mode.
 */
export function getPositionLabels(
  spreadType: "single" | "three",
  threeCardMode?: "past-present-future" | "problem-cause-advice"
): string[] {
  if (spreadType === "single") {
    return ["single"];
  }
  if (threeCardMode === "problem-cause-advice") {
    return ["problem", "cause", "advice"];
  }
  return ["past", "present", "future"];
}
