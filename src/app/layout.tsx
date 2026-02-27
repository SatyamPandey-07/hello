import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";

export const metadata: Metadata = {
  title: "Porsche 911 | Form. Focus. Force.",
  description: "A cinematic luxury experience of the Porsche 911.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
