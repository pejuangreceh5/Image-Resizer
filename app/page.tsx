"use client";
import { useState, useRef } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Dummy compress handler (replace with real logic as needed)
  function handleFile(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      // Simulasi kompresi
      setTimeout(() => {
        setOutput(reader.result as string); // Replace with real compressed result
        setLoading(false);
      }, 1200);
    };
    reader.readAsDataURL(file);
  }

  function reset() {
    setImage(null);
    setOutput(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-6 pb-16 bg-[#f6f6f6]">
      {/* HEADER ala Play Store */}
      <header className="w-full max-w-2xl mx-auto flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-xl mb-6 animate-fade-in">
        <span className="text-4xl">🖼️</span>
        <div>
          <h1 className="text-white text-2xl font-bold tracking-tight drop-shadow">Image Compressor & Resizer</h1>
          <p className="text-white text-sm">Cepat, ringan, 100% offline • Play Store style</p>
        </div>
      </header>

      {/* CARD utama */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-6 py-8 flex flex-col gap-6 animate-fade-in">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Kompres atau Resize Gambar</h2>
          <p className="text-gray-500 text-sm">Langsung di browsermu, tanpa upload ke server. Aman & gratis!</p>
        </div>

        <label className="flex flex-col items-center gap-3">
          <span className="font-medium text-gray-700">Pilih Gambar</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600 transition"
            onChange={handleFile}
            disabled={loading}
          />
        </label>

        {loading && (
          <div className="flex justify-center items-center gap-2 text-green-600">
            <span className="animate-spin inline-block text-xl">🔄</span>
            <span>Memproses gambar...</span>
          </div>
        )}

        {image && (
          <div className="flex flex-col items-center gap-3">
            <img src={image} alt="preview" className="max-w-[180px] max-h-[180px] rounded-xl border shadow" />
            <button
              className="text-xs text-blue-500 underline"
              onClick={reset}
              type="button"
            >
              Ganti gambar
            </button>
          </div>
        )}

        {output && (
          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="text-green-600 font-medium">✓ Sukses dikompres!</span>
            <a
              href={output}
              download="output.jpg"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-full shadow"
            >
              Download Gambar
            </a>
          </div>
        )}
      </div>

      {/* FOOTER ala Play Store */}
      <footer className="fixed bottom-0 left-0 w-full flex justify-center py-4 bg-white/95 border-t border-gray-100 text-gray-500 text-xs font-medium tracking-wide rounded-t-2xl">
        © {new Date().getFullYear()} Image Compressor · Inspired by Play Store UI
      </footer>
    </div>
  );
          }
