// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { geistSans, geistMono, bebasNeue } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Khushal Jain — Portfolio",
  description: "Khushal's portfolio",
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
