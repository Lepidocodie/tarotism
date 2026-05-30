import { NextResponse } from "next/server";
import { drawRandomCards, getPositionLabels } from "@/lib/tarot-data";
import type { ReadingRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: ReadingRequest = await request.json();
    const { topic, spreadType, threeCardMode } = body;

    if (!topic || !spreadType) {
      return NextResponse.json(
        { error: "Missing topic or spreadType" },
        { status: 400 }
      );
    }

    const count = spreadType === "single" ? 1 : 3;
    const positions = getPositionLabels(spreadType, threeCardMode);
    const cards = drawRandomCards(count, positions);

    return NextResponse.json({
      cards,
      topic,
      spreadType,
      threeCardMode,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to draw cards" },
      { status: 500 }
    );
  }
}
