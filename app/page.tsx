"use client"; import { useState, useRef } from "react"; import Cropper from "react-easy-crop";

export default function Page() { const [image, setImage] = useState<File | null>(null); const [imageUrl, setImageUrl] = useState<string | null>(null); const [croppedUrl, setCroppedUrl] = useState<string | null>(null); const [width, setWidth] = useState<number | "">(""); const [height, setHeight] = useState<number | "">(""); const [quality, setQuality] = useState<number>(0.8); const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg"); const [loading, setLoading] = useState(false); const inputRef = useRef<HTMLInputElement>(null);

const handleFile = (file: File) => { setImage(file); const reader = new FileReader(); reader.onload = () => { setImageUrl(reader.result as string); }; reader.readAsDataURL(file); };

const handleResize = async () => { if (!imageUrl || !width || !height) return; setLoading(true); const img = new Image(); img.crossOrigin = "anonymous"; img.src = imageUrl; img.onload = () => { const canvas = document.createElement("canvas"); canvas.width = Number(width); canvas.height = Number(height); const ctx = canvas.getContext("2d")!; ctx.drawImage(img, 0, 0, canvas.width, canvas.height); canvas.toBlob((blob) => { if (blob) { const url = URL.createObjectURL(blob); setCroppedUrl(url); } setLoading(false); }, format, quality); }; };

return ( <main className="max-w-3xl mx-auto p-6 text-gray-900 bg-white min-h-screen"> <header className="text-center mb-8"> <h1 className="text-3xl font-bold">Image Converter & Resizer Online</h1> <p className="text-gray-600 mt-2"> Ubah ukuran dan format gambar Anda langsung di browser. Gratis, cepat, dan tanpa watermark. </p> </header>

<section className="bg-gray-50 border p-4 rounded-xl shadow-sm text-center">
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
      }}
      className="hidden"
    />
    <button
      onClick={() => inputRef.current?.click()}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold"
    >
      Pilih Gambar
    </button>

    {imageUrl && (
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">Preview Gambar</h2>
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-sm mx-auto border rounded-lg shadow"
        />
      </div>
    )}

    {imageUrl && (
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-3 justify-center">
          <input
            type="number"
            placeholder="Lebar (px)"
            className="w-32 px-2 py-1 border rounded"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Tinggi (px)"
            className="w-32 px-2 py-1 border rounded"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-3 justify-center items-center">
          <label>Format:</label>
          <select
            className="border px-2 py-1 rounded"
            value={format}
            onChange={(e) => setFormat(e.target.value as any)}
          >
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
          <label>Kualitas:</label>
          <input
            type="range"
            min={0.3}
            max={1}
            step={0.1}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
          <span>{Math.round(quality * 100)}%</span>
        </div>
        <button
          onClick={handleResize}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold"
        >
          {loading ? "Memproses..." : "Resize & Convert"}
        </button>
      </div>
    )}

    {croppedUrl && (
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">Hasil</h2>
        <img src={croppedUrl} alt="Output" className="max-w-sm mx-auto border rounded-lg shadow" />
        <a
          href={croppedUrl}
          download={`output.${format.split("/")[1]}`}
          className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
        >
          Download Gambar
        </a>
      </div>
    )}
  </section>

  <section className="mt-12 text-sm text-gray-700 leading-relaxed">
    <h2 className="text-xl font-bold mb-2">Tentang Image Converter</h2>

            
