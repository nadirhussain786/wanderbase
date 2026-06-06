import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionProvider from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: { default: "WanderBase — Discover the World", template: "%s | WanderBase" },
  description: "WanderBase is your ultimate travel companion. Explore 120+ handcrafted destinations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <SessionProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ style: { borderRadius: "12px", fontFamily: "inherit" } }} />
        </SessionProvider>
      </body>
    </html>
  );
}
