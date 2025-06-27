"use client";
import Head from "next/head";
import ImageCompressor from "@/components/ImageCompressor";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Image Resizer & Compressor Online - Gratis & Cepat</title>
        <meta
          name="description"
          content="Resize dan kompres gambar JPG, PNG, dan WebP secara online tanpa aplikasi. Gratis, cepat, dan mudah digunakan."
        />
        <meta
          name="keywords"
          content="image resizer online, image compressor, kompres gambar, ubah ukuran jpg png webp"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Image Resizer & Compressor Online" />
        <meta
          property="og:description"
          content="Alat gratis untuk resize dan kompres gambar langsung di browser."
        />
        <meta
          property="og:url"
          content="https://imageresizeronline.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://imageresizeronline.vercel.app/logo.svg"
        />
        <link
          rel="canonical"
          href="https://imageresizeronline.vercel.app/"
        />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50 text-gray-800">
        <header className="max-w-xl w-full text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Resize & Kompres Gambar Online Gratis
          </h1>
          <p className="text-gray-600">
            Gunakan alat online kami untuk mengubah ukuran dan mengompres gambar seperti JPG, PNG, dan WebP. Tidak perlu install aplikasi, semua langsung di browser.
          </p>
        </header>

        <ImageCompressor />

        <footer className="mt-16 text-sm text-gray-500 text-center">
          &copy; 2025 Image Resizer Online - Dibuat untuk pengguna yang butuh alat kompres dan resize cepat.
        </footer>
      </main>
    </>
  );
}
