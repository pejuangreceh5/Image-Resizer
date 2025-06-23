import Head from "next/head";
import ImageResizer from "../components/ImageResizer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Free Online Image Resizer - Resize Images Instantly</title>
        <meta
          name="description"
          content="Resize your images online for free, instantly. No watermark, no signup. Supports JPG, PNG, WebP, and more! Try our free image resizer now!"
        />
        <meta
          name="keywords"
          content="image resizer, resize gambar, online, free, jpg, png, webp, tanpa watermark, compress image"
        />
        <meta property="og:title" content="Free Online Image Resizer" />
        <meta
          property="og:description"
          content="Resize your images online for free, instantly. No watermark, no signup. Supports JPG, PNG, WebP, and more!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://imageresizeronline.vercel.app/" />
        {/* <meta property="og:image" content="https://imageresizeronline.vercel.app/og-image.png" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online Image Resizer" />
        <meta
          name="twitter:description"
          content="Resize your images online for free, instantly. No watermark, no signup. Supports JPG, PNG, WebP, and more!"
        />
        {/* <meta name="twitter:image" content="https://imageresizeronline.vercel.app/og-image.png" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://imageresizeronline.vercel.app/" />
      </Head>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center">
        <ImageResizer />
        <footer className="text-center text-gray-500 text-xs mt-12 mb-4">
          &copy; {new Date().getFullYear()} Free Image Resizer by pejuangreceh5
        </footer>
      </main>
    </>
  );
        }
