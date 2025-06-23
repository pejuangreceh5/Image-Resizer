import '../styles/globals.css';
import type { ReactNode } from "react";

export const metadata = {
  title: "Image Compressor & Resizer",
  description: "Kompres dan resize gambar langsung di browser, tanpa backend.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/logo.svg" />
        <meta name="google-site-verification" content="cadTnD0tiC7zartGuwagZwH4ECWViLkMuXsnoyn9dLc" />
      </head>
      <body>{children}</body>
    </html>
  );
}
