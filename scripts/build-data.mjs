// Build the tarot-cards.json from the raw API data
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_URL = "https://raw.githubusercontent.com/ekelen/tarot-api/main/static/card_data.json";

// Image base URL from krates98/tarotcardapi
const IMG_BASE = "https://raw.githubusercontent.com/krates98/tarotcardapi/main/images";

// Map standard names to krates98 image filenames
function getImageUrl(name) {
  // krates98 repo uses lowercase names without spaces, mostly ending in .jpeg, some .jpg
  let safeName = name.toLowerCase().replace(/[^a-z]/g, '');
  if (safeName === "strength") safeName = "thestrength";
  
  // Specific overrides for krates98 repo inconsistencies
  if (safeName === "thelovers") return `${IMG_BASE}/TheLovers.jpg`;
  
  return `${IMG_BASE}/${safeName}.jpeg`;
}

async function main() {
  console.log("Fetching card data...");
  const res = await fetch(RAW_URL);
  const raw = await res.json();

  const cards = raw.cards.map((card, index) => ({
    id: index,
    name: card.name,
    name_short: card.name_short,
    type: card.type,
    ...(card.suit ? { suit: card.suit } : {}),
    value_int: card.value_int,
    meaning_up: card.meaning_up,
    meaning_rev: card.meaning_rev,
    desc: card.desc.slice(0, 200), // Truncate long descriptions to save space
    image_url: getImageUrl(card.name),
  }));

  const output = { nhits: cards.length, cards };
  const outPath = path.join(__dirname, "..", "data", "tarot-cards.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8");
  console.log(`✓ Wrote ${cards.length} cards to ${outPath}`);
}

main().catch(console.error);
