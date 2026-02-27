import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

export const metadata: Metadata = {
  title: "Porsche 911 | Precision in Motion",
  description: "A cinematic luxury storytelling experience of the Porsche 911.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
