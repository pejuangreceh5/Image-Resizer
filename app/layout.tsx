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
        <link rel="icon" href="/logo.svg" />
        <meta name="google-site-verification" content="cadTnD0tiC7zartGuwagZwH4ECWViLkMuXsnoyn9dLc" />
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
              description:
                "Aplikasi web gratis untuk resize dan kompres gambar secara online. Mendukung format JPG, PNG, dan WebP.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "128",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
