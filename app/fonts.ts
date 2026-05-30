import { Cinzel, Noto_Serif, Inter } from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel-var",
  display: "swap",
});

export const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
