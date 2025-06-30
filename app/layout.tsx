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

        {/* Hapus dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('dark');`,
          }}
        />

        {/* JSON-LD SEO */}
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

        {/* 🔥 Adsterra Popunder Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var s = document.createElement('script');
              s.src = '//pl27008569.profitableratecpm.com/71/78/7b/71787be7062c7e38867e259dc30b7be8.js';
              s.async = true;
              document.head.appendChild(s);
            `,
          }}
        />
      </head>
      <body className="bg-white text-gray-900">
        {children}

        {/* 🖼️ Adsterra Native Banner */}
        <div className="mt-10 mb-20 flex justify-center">
          <div id="container-91864648c9fdc198c1a5fcee2e1f5c0d"></div>
        </div>
        <script
          async
          data-cfasync="false"
          src="//pl27047528.profitableratecpm.com/91864648c9fdc198c1a5fcee2e1f5c0d/invoke.js"
        ></script>
      </body>
    </html>
  );
        }
