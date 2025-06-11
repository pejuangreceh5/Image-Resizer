"use client";
import { useState, useRef } from "react";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
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
    setOutputUrl(null);
    setOutputFile(null);
    setWidth("");
    setHeight("");
    setMode("auto");
    setImageUrl(URL.createObjectURL(f));
  }

  function reset() {
    setFile(null);
    setImageUrl(null);
    setOutputUrl(null);
    setOutputFile(null);
    setWidth("");
    setHeight("");
    setMode("auto");
    if (inputRef.current) inputRef.current.value = "";
  }

  function formatSize(size: number | undefined) {
    if (!size) return "-";
    return `${(size / 1024).toFixed(1)} KB`;
  }

  async function handleProcess() {
    if (!file) return;
    setLoading(true);

    try {
      let img = new window.Image();
      img.src = imageUrl!;
      await new Promise(resolve => { img.onload = resolve; });

      let targetWidth = img.width;
      let targetHeight = img.height;

      if (mode === "manual") {
        if (width && height) {
          targetWidth = width;
          targetHeight = height;
        }
      } else if (mode === "auto" && width) {
        // Resize proporsional berdasarkan width saja
        targetWidth = width;
        targetHeight = Math.round((img.height / img.width) * width);
      } else if (mode === "auto" && height) {
        targetHeight = height;
        targetWidth = Math.round((img.width / img.height) * height);
      }

      // Resize pakai canvas
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Kompresi JPEG dengan kualitas 0.7 (bisa diubah)
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setOutputUrl(url);
          setOutputFile(new File([blob], "output.jpg", { type: "image/jpeg" }));
          setLoading(false);
        },
        "image/jpeg",
        0.7
      );
    } catch (err) {
      alert("Gagal memproses gambar");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-6 py-8 flex flex-col gap-6 animate-fade-in">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Kompres / Resize Gambar</h2>
        <p className="text-gray-500 text-sm">Pilih gambar, atur ukuran, lalu tekan Kompres / Resize.</p>
      </div>

      {/* File Picker */}
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
        {file && <span className="text-xs text-gray-700">{file.name}</span>}
      </label>

      {/* Preview sebelum & sesudah */}
      <div className="flex flex-row justify-center gap-8">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500">Sebelum</span>
          {imageUrl && (
            <>
              <img src={imageUrl} alt="Sebelum" className="max-w-[110px] max-h-[110px] rounded-xl border shadow" />
              <span className="text-xs text-gray-500">Ukuran: {formatSize(file?.size)}</span>
            </>
          )}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500">Sesudah</span>
          {outputUrl && (
            <>
              <img src={outputUrl} alt="Sesudah" className="max-w-[110px] max-h-[110px] rounded-xl border shadow" />
              <span className="text-xs text-gray-500">Ukuran: {formatSize(outputFile?.size)}</span>
            </>
          )}
        </div>
      </div>

      {file && (
        <div className="flex flex-col gap-3">
          {/* Mode pilih */}
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
          {/* Input size */}
          {mode === "manual" ? (
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
              <input
                type="number"
                min={1}
                placeholder="Tinggi (px)"
                className="w-1/2 border rounded-lg px-2 py-1 text-sm"
                value={height}
                onChange={e => setHeight(e.target.value ? parseInt(e.target.value) : "")}
                disabled={loading}
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <input
                type="number"
                min={1}
                placeholder="Lebar (px) (opsional)"
                className="w-1/2 border rounded-lg px-2 py-1 text-sm"
                value={width}
                onChange={e => setWidth(e.target.value ? parseInt(e.target.value) : "")}
                disabled={loading}
              />
              <input
                type="number"
                min={1}
                placeholder="Tinggi (px) (opsional)"
                className="w-1/2 border rounded-lg px-2 py-1 text-sm"
                value={height}
                onChange={e => setHeight(e.target.value ? parseInt(e.target.value) : "")}
                disabled={loading}
              />
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
          <button
            className="text-xs text-blue-500 underline"
            onClick={reset}
            type="button"
            disabled={loading}
          >
            Ganti gambar
          </button>
        </div>
      )}

      {/* Tombol download */}
      {outputUrl && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <a
            href={outputUrl}
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
