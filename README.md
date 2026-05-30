<div align="center">

# ✦ Tarotism

### AI-Powered Tarot Reading

ดูดวงไพ่ทาโรต์ด้วย AI ตีความอย่างลึกซึ้ง — เลือกหัวข้อ สุ่มไพ่ และรับคำทำนายแบบ Real-time

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## ✨ Features

- 🎴 **ไพ่ทาโรต์ครบ 78 ใบ** — Major & Minor Arcana พร้อมความหมายทั้งหัวตั้งและกลับหัว
- 🔮 **AI ตีความ Real-time** — Gemini 2.5 Flash สตรีมคำทำนายแบบ real-time ด้วยภาษาไทยที่สละสลวย
- 🃏 **2 รูปแบบการจั่ว** — ไพ่ใบเดียว (Single Card) หรือสามใบ (Three-Card Spread)
- 📖 **โหมดไพ่ 3 ใบ** — อดีต-ปัจจุบัน-อนาคต หรือ ปัญหา-สาเหตุ-คำแนะนำ
- 🌙 **6 หัวข้อดูดวง** — ภาพรวม, ความรัก, การเงิน, การงาน, สุขภาพ, ใช่หรือไม่
- ✦ **3D Card Flip Animation** — อนิเมชั่นพลิกไพ่แบบ 3D ที่สมจริง
- 🎨 **Mystic Editorial Design** — ธีม dark mode ด้วย OKLCH color system

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI** | [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + Custom Design System |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **AI** | [Google Gemini 2.5 Flash](https://ai.google.dev/) |
| **Fonts** | Cinzel · Noto Serif · Inter (via `next/font`) |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17+
- [Google AI API Key](https://aistudio.google.com/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/tarotism.git
cd tarotism

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

เพิ่ม API key ลงในไฟล์ `.env.local`:

```env
GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
```

### Development

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
tarotism/
├── app/
│   ├── api/
│   │   ├── draw/          # API สุ่มไพ่
│   │   └── interpret/     # API ตีความด้วย Gemini
│   ├── fonts.ts           # Google Fonts configuration
│   ├── globals.css        # Design system & components
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page (state machine)
├── components/
│   ├── CardDeck.tsx       # แสดงไพ่ที่จั่วได้
│   ├── Footer.tsx         # Footer
│   ├── InterpretationStream.tsx  # สตรีมคำทำนาย AI
│   ├── LunarProgress.tsx  # Progress indicator
│   ├── Navbar.tsx         # Navigation bar
│   ├── SpreadSelector.tsx # เลือกรูปแบบการจั่ว
│   ├── TarotCard.tsx      # ไพ่แต่ละใบ (3D flip)
│   └── TopicSelector.tsx  # เลือกหัวข้อดูดวง
├── data/
│   └── tarot-cards.json   # ข้อมูลไพ่ 78 ใบ
├── lib/
│   ├── tarot-data.ts      # ฟังก์ชันจัดการข้อมูลไพ่
│   └── types.ts           # TypeScript interfaces
└── scripts/
    └── build-data.mjs     # สร้างข้อมูลไพ่จาก API
```

## 🎮 How It Works

```
เลือกหัวข้อ → เลือกรูปแบบ → สุ่มไพ่ → พลิกไพ่ → AI ตีความ
   Topic      Spread Type     Draw      Reveal    Interpret
```

1. **เลือกหัวข้อ** — เลือกจาก 6 หัวข้อที่ต้องการดูดวง
2. **เลือกรูปแบบ** — เลือกจั่วไพ่ 1 ใบ หรือ 3 ใบ
3. **สุ่มไพ่** — ระบบสุ่มไพ่จากสำรับ 78 ใบ พร้อมกำหนดหัวตั้ง/กลับหัว
4. **พลิกไพ่** — คลิกเพื่อพลิกไพ่ทีละใบด้วย 3D animation
5. **AI ตีความ** — Gemini วิเคราะห์ไพ่และสตรีมคำทำนายเป็นภาษาไทย

## 🎨 Design System

โปรเจ็คใช้ **Mystic Editorial** design system ที่สร้างด้วย OKLCH color space:

- **Surfaces** — Indigo-tinted dark palette (ไม่ใช้ pure black)
- **Primary** — Warm gold (`oklch(0.78 0.14 85)`)
- **Accents** — Deep purple, teal highlights
- **Typography** — Cinzel สำหรับ headings, Inter สำหรับ body text
- **Effects** — Glassmorphism navbar, golden glow animations, 3D card flips

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- ข้อมูลไพ่จาก [tarot-api](https://github.com/ekelen/tarot-api)
- ภาพไพ่จาก [tarotcardapi](https://github.com/krates98/tarotcardapi)
- AI โดย [Google Gemini](https://ai.google.dev/)

---

<div align="center">

**✦ May the cards guide your path ✦**

</div>
