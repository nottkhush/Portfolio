// lib/fonts.ts
import {
  Geist,
  Geist_Mono,
  Bebas_Neue,
  Story_Script,
  Oswald,
  Inter,
  DM_Serif_Display,
} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const storyScript = Story_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-story-script",
});

export const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const dmSerifSans = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
});
