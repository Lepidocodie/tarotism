import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ReadingResult } from "@/lib/types";

const TOPIC_NAMES: Record<string, string> = {
  general: "ภาพรวมชีวิต",
  love: "ความรัก",
  finance: "การเงิน",
  career: "การงาน",
  health: "สุขภาพ",
  yesno: "ใช่หรือไม่",
};

const POSITION_NAMES: Record<string, string> = {
  past: "อดีต",
  present: "ปัจจุบัน",
  future: "อนาคต",
  problem: "ปัญหา",
  cause: "สาเหตุ",
  advice: "คำแนะนำ",
  single: "ไพ่ของคุณ",
};

function buildPrompt(reading: ReadingResult): string {
  const topicName = TOPIC_NAMES[reading.topic] || reading.topic;
  const spreadLabel =
    reading.spreadType === "single"
      ? "1 ใบ (เจาะจง)"
      : reading.threeCardMode === "problem-cause-advice"
        ? "3 ใบ (ปัญหา-สาเหตุ-คำแนะนำ)"
        : "3 ใบ (อดีต-ปัจจุบัน-อนาคต)";

  const cardDescriptions = reading.cards
    .map((dc) => {
      const orientation = dc.isReversed ? "Reversed (กลับหัว)" : "Upright (หัวตั้ง)";
      const meaning = dc.isReversed ? dc.card.meaning_rev : dc.card.meaning_up;
      const pos = dc.position ? POSITION_NAMES[dc.position] || dc.position : "";
      return `- Position: ${pos} | Card: ${dc.card.name} (${orientation}) — Meaning: ${meaning}`;
    })
    .join("\n");

  return `ผู้ใช้งานต้องการดูดวงในหัวข้อ: ${topicName}
โดยใช้การจั่วไพ่แบบ: ${spreadLabel}

ไพ่ที่จั่วได้คือ (โปรดใช้ชื่อไพ่เป็นภาษาอังกฤษตามนี้เท่านั้น ห้ามแปลชื่อไพ่):
${cardDescriptions}

คำแนะนำสำหรับการพยากรณ์:
1. ห้ามแปลชื่อไพ่เป็นภาษาไทย ให้ใช้ชื่อภาษาอังกฤษ เช่น "The Magician", "Three of Cups"
2. ตีความไพ่เหล่านี้ให้เชื่อมโยงกัน อธิบายถึงสถานการณ์ของผู้ใช้ และให้คำแนะนำที่เป็นประโยชน์
3. ใช้ภาษาไทยที่สละสลวย อ่านง่าย และให้กำลังใจ`;
}

export async function POST(request: Request) {
  try {
    let reading: ReadingResult;
    try {
      reading = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }
    console.log("--- Interpretation Start (Gemini) ---");
    console.log("Topic:", reading.topic);
    
    if (!reading.cards || reading.cards.length === 0) {
      return new Response(JSON.stringify({ error: "No cards provided" }), { status: 400 });
    }

    const apiKey = process.env.GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GENERATIVE_AI_API_KEY is not set in environment variables." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `คุณคือนักพยากรณ์ไพ่ทาโรต์มืออาชีพที่มีความเห็นอกเห็นใจและให้คำปรึกษาอย่างตรงไปตรงมา คุณมีความรู้ลึกซึ้งเกี่ยวกับสัญลักษณ์และความหมายของไพ่ทาโรต์ทุกใบ คุณเป็นคนอบอุ่น ใจดี และให้กำลังใจ แต่ก็พูดตรงๆ เมื่อจำเป็น

กฎเหล็กของคุณ:
1. ห้ามแปลชื่อไพ่ทาโรต์ (Tarot Card Names) เป็นภาษาไทยเด็ดขาด ให้ใช้ชื่อภาษาอังกฤษดั้งเดิมเสมอ เช่น "The Lovers", "Ace of Swords"
2. ตีความไพ่ตามตำแหน่ง (หัวตั้ง/กลับหัว) อย่างถูกต้อง
3. เชื่อมโยงไพ่แต่ละใบเข้าด้วยกันเป็นเรื่องราว
4. ใช้ภาษาไทยที่สละสลวย อ่านง่าย
5. ให้คำแนะนำที่เป็นรูปธรรมและนำไปปฏิบัติได้
6. จบด้วยข้อความให้กำลังใจเสมอ`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContentStream(buildPrompt(reading));

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
        } catch (e) {
          console.error("Stream processing error:", e);
        } finally {
          controller.close();
          console.log("--- Interpretation End ---");
        }
      }
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });

  } catch (err) {
    console.error("Interpret API Fatal Error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
