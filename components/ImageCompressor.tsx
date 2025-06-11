"use client";
import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [outputFile, setOutputFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: any) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setOutput(null);
    setOutputFile(null);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(f);
  }

  function reset() {
    setImage(null);
    setFile(null);
    setOutput(null);
    setOutputFile(null);
    setWidth("");
    setHeight("");
    setMode("auto");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleProcess() {
    if (!file) return;
    setLoading(true);
    try {
      const options: any = {
        maxSizeMB: 1,
        useWebWorker: true,
      };
      if (mode === "manual") {
        if (width) options.maxWidthOrHeight = width;
        // Jika ingin width & height berbeda, perlu resize manual pakai canvas (lebih rumit)
        // Untuk browser-image-compression, hanya bisa salah satu (width/height) secara proporsional
      }
      const compressed = await imageCompression(file, options);
      setOutputFile(compressed);
      const result = await imageCompression.getDataUrlFromFile(compressed);
      setOutput(result);
    } catch (err) {
      alert("Gagal kompres/resize gambar");
    }
    setLoading(false);
  }

  function formatSize(size: number | undefined) {
    if (!size) return "-";
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-6 py-8 flex flex-col gap-6 animate-fade-in">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Kompres / Resize Gambar</h2>
        <p className="text-gray-500 text-sm">Pilih gambar, atur ukuran jika ingin, lalu tekan Kompres / Resize.</p>
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

      {image && (
        <div className="flex flex-col items-center gap-2">
          <img src={image} alt="Sebelum" className="max-w-[150px] max-h-[150px] rounded-xl border shadow" />
          <span className="text-xs text-gray-500">Ukuran: {formatSize(file?.size)}</span>
          <button className="text-xs text-blue-500 underline" onClick={reset} type="button" disabled={loading}>
            Ganti gambar
          </button>
        </div>
      )}

      {file && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-center justify-center">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="mode"
                checked={mode === "auto"}
                onChange={() => setMode("auto")}
                disabled={loading}
              />
              <span className="text-sm">Resize Otomatis</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="mode"
                checked={mode === "manual"}
                onChange={() => setMode("manual")}
                disabled={loading}
              />
              <span className="text-sm">Resize Manual</span>
            </label>
          </div>
          {mode === "manual" && (
            <div className="flex gap-3">
              <input
                type="number"
                min={1}
                placeholder="Lebar (px)"
                className="w-1/2 border rounded-lg px-2 py-1 text-sm"
                value={width}
                onChange={e => setWidth(e.target.value ? parseInt(e.target.value) : "")}
                disabled={loading}
              />
              {/* Height dihilangkan krn plugin compress hanya support proporsional, width saja */}
              {/* Bisa ditambah custom resize pakai canvas jika mau */}
            </div>
          )}
          <button
            onClick={handleProcess}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow transition"
            type="button"
          >
            {loading ? "Memproses..." : "Kompres / Resize"}
          </button>
        </div>
      )}

      {output && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <img src={output} alt="Sesudah" className="max-w-[150px] max-h-[150px] rounded-xl border shadow" />
          <span className="text-xs text-gray-500">Ukuran: {formatSize(outputFile?.size)}</span>
          <a
            href={output}
            download="output.jpg"
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-full shadow"
          >
            Download Gambar
          </a>
        </div>
      )}
    </div>
  );
  }
