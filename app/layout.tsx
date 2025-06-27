import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Image Compressor & Resizer",
  description: "Kompres dan resize gambar langsung di browser, tanpa backend.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="cadTnD0tiC7zartGuwagZwH4ECWViLkMuXsnoyn9dLc" />
        <meta name="description" content="Kompres dan resize gambar langsung di browser, tanpa backend." />
        <link rel="icon" href="/logo.svg" />

        {/* Hapus class dark agar terang terus */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('dark');`,
          }}
        />

        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Image Resizer & Compressor",
              url: "https://imageresizeronline.vercel.app/",
              applicationCategory: "PhotoApplication",
              operatingSystem: "All",
              description: "Aplikasi web gratis untuk resize dan kompres gambar online.",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "128",
              },
            }),
          }}
        />
      </head>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
