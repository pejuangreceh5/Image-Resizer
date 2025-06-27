"use client";
import { useState, useRef } from "react";
import Cropper from "react-easy-crop";

interface CroppedAreaPixels {
  width: number;
  height: number;
  x: number;
  y: number;
}

function getCroppedImg(imageSrc: string, crop: CroppedAreaPixels, format: string, quality: number): Promise<{ url: string, file: File }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(
        img,
        crop.x, crop.y, crop.width, crop.height,
        0, 0, crop.width, crop.height
      );
      canvas.toBlob((blob) => {
        if (!blob) return reject();
        const url = URL.createObjectURL(blob);
        resolve({ url, file: new File([blob], "output" + getExtFromFormat(format), { type: format }) });
      }, format, quality);
    };
    img.onerror = reject;
  });
}

function resizeImage(imgSrc: string, width: number, height: number, format: string, quality: number): Promise<{ url: string, file: File }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return reject();
        const url = URL.createObjectURL(blob);
        resolve({ url, file: new File([blob], "output" + getExtFromFormat(format), { type: format }) });
      }, format, quality);
    };
    img.onerror = reject;
  });
}

function getExtFromFormat(format: string) {
  if (format === "image/jpeg") return ".jpg";
  if (format === "image/png") return ".png";
  if (format === "image/webp") return ".webp";
  return ".img";
}

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputFile, setOutputFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
  const [croppedImgUrl, setCroppedImgUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    setFile(f);
    setOutputUrl(null);
    setOutputFile(null);
    setCroppedImgUrl(null);
    setShowCrop(false);
    setWidth("");
    setHeight("");
    setMode("auto");
    const url = URL.createObjectURL(f);
    setImageUrl(url);
  }

  function formatSize(size: number | undefined) {
    if (!size) return "-";
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return (
    <Head>
  <title>Image Converter & Resizer Online - Gratis & Cepat</title>
  <meta name="description" content="Ubah ukuran dan format gambar Anda langsung di browser. Gratis, cepat, dan tanpa watermark." />
  <meta name="keywords" content="image converter, image resizer, ubah ukuran gambar, kompres gambar, convert gambar online" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="google-site-verification" content="cadTnD0tiC7zartGuwagZwH4ECWViLkMuXsnoyn9dLc" />
  <link rel="canonical" href="https://imageresizeronline.vercel.app/" />

  <!-- Open Graph -->
  <meta property="og:title" content="Image Converter & Resizer Online - Gratis & Cepat" />
  <meta property="og:description" content="Resize dan ubah format gambar online. Cepat dan gratis tanpa watermark." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://imageresizeronline.vercel.app/" />
  <meta property="og:image" content="https://imageresizeronline.vercel.app/og-image.jpg" />

  <!-- JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Image Converter & Resizer Online",
    "url": "https://imageresizeronline.vercel.app/",
    "applicationCategory": "PhotoApplication",
    "operatingSystem": "All",
    "description": "Aplikasi web gratis untuk ubah ukuran dan format gambar secara online.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "276"
    }
  }
  </script>

  <link rel="icon" href="/logo.svg" />
</Head>

    <main className="max-w-3xl mx-auto p-6 text-gray-900 bg-white min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Image Converter & Resizer Online</h1>
        <p className="text-gray-600 mt-2">
          Ubah ukuran dan format gambar Anda langsung di browser. Gratis, cepat, dan tanpa watermark.
        </p>
      </header>

      <section className="bg-gray-50 border p-4 rounded-xl shadow-sm text-center">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="hidden"
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold"
        >
          Pilih Gambar
        </button>

        {imageUrl && (
          <div className="mt-4">
            <p className="text-sm mt-2">Ukuran: {formatSize(file?.size)}</p>
            <img src={imageUrl} alt="Preview" className="mt-2 max-w-xs mx-auto rounded shadow" />
            <button onClick={() => setShowCrop(true)} className="underline text-blue-600 mt-2 text-sm">
              Crop Gambar
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
