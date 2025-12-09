// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono, bebasNeue } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Khushal Jain | Full Stack Developer",
  description:
    "Full-stack developer specializing in Next.js, MERN stack, and scalable web applications.",

  metadataBase: new URL("https://portfolio-sable-psi-30.vercel.app"),

  openGraph: {
    title: "Khushal Jain | Portfolio",
    description:
      "Projects, skills, and experience in MERN, Next.js, and backend development.",
    url: "https://portfolio-sable-psi-30.vercel.app",
    siteName: "Khushal Jain Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Khushal Jain Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Khushal Jain | Portfolio",
    description:
      "Next.js & MERN developer sharing projects and engineering work.",
    images: ["/og.png"],
  },

  icons: {
    icon: "/favicon.svg",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased bg-[#f7f6f2]`}
      >
        {children}
      </body>
    </html>
  );
}
