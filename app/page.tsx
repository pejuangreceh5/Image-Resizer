import Head from "next/head";
import ImageCompressor from "@/components/ImageCompressor";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Resize & Kompres Gambar Online Gratis | JPG PNG WebP</title>
        <meta name="description" content="Ubah ukuran & kompres gambar secara online tanpa install aplikasi. Mendukung JPG, PNG, WebP. Gratis & cepat langsung dari browser!" />
        <meta name="keywords" content="kompres gambar, resize gambar, kompres jpg, kompres png, kompres webp, ubah ukuran gambar, tool kompres online" />
        <meta name="author" content="ImageResizerOnline" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for social media */}
        <meta property="og:title" content="Resize & Kompres Gambar Online Gratis" />
        <meta property="og:description" content="Tool gratis untuk ubah ukuran & kompres gambar seperti JPG, PNG, dan WebP langsung di browser." />
        <meta property="og:url" content="https://imageresizeronline.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://imageresizeronline.vercel.app/logo.svg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resize & Kompres Gambar Online Gratis" />
        <meta name="twitter:description" content="Tool gratis ubah ukuran & kompres gambar online seperti JPG, PNG, WebP." />
        <meta name="twitter:image" content="https://imageresizeronline.vercel.app/logo.svg" />

        {/* Optional: Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Image Resizer Online",
            "url": "https://imageresizeronline.vercel.app",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://imageresizeronline.vercel.app?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }} />
      </Head>

      {/* Tool Component */}
      <main className="flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 max-w-lg leading-tight">
          Resize & Kompres Gambar Online Gratis
        </h1>
        <p className="text-center text-gray-600 max-w-xl mb-10">
          Gunakan alat online kami untuk mengubah ukuran dan mengompres gambar seperti JPG, PNG, dan WebP. Tidak perlu install aplikasi, semua langsung di browser.
        </p>
        <ImageCompressor />
      </main>
    </>
  );
}
