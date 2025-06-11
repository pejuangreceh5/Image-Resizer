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

export default function ImageCompressor() {
  // File & preview states
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Output states
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputFile, setOutputFile] = useState<File | null>(null);

  // Resize & compress settings
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");

  // Cropper states
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
  const [croppedImgUrl, setCroppedImgUrl] = useState<string | null>(null);

  // Drag & Drop
  const [dragActive, setDragActive] = useState(false);

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  // File input ref
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

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  function reset() {
    setFile(null);
    setImageUrl(null);
    setOutputUrl(null);
    setOutputFile(null);
    setCroppedImgUrl(null);
    setShowCrop(false);
    setWidth("");
    setHeight("");
    setMode("auto");
    if (inputRef.current) inputRef.current.value = "";
  }

  function formatSize(size: number | undefined) {
    if (!size) return "-";
    return `${(size / 1024).toFixed(1)} KB`;
  }

  // Drag & Drop handlers
  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  }
  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
  }
  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length) handleFile(files[0]);
  }

  // Cropper logic
  const onCropComplete = (_: any, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  async function handleCropDone() {
    if (!imageUrl || !croppedAreaPixels) return;
    setLoading(true);
    try {
      const { url } = await getCroppedImg(imageUrl, croppedAreaPixels, format, quality);
      setCroppedImgUrl(url);
      setShowCrop(false);
    } catch {
      alert("Crop gagal");
    }
    setLoading(false);
  }

  async function handleProcess() {
    if (!(croppedImgUrl || imageUrl)) return;
    setLoading(true);
    try {
      let src = croppedImgUrl || imageUrl!;
      let targetWidth = width && typeof width === "number" ? width : undefined;
      let targetHeight = height && typeof height === "number" ? height : undefined;
      if (mode === "auto") {
        // Auto: gunakan width/height proporsional
        const img = new window.Image();
        img.src = src;
        await new Promise(res => { img.onload = res; });
        if (targetWidth && !targetHeight) {
          targetHeight = Math.round((img.height / img.width) * targetWidth);
        } else if (!targetWidth && targetHeight) {
          targetWidth = Math.round((img.width / img.height) * targetHeight);
        } else if (!targetWidth && !targetHeight) {
          targetWidth = img.width;
          targetHeight = img.height;
        }
      }
      // Resize & compress
      const { url, file: outFile } = await resizeImage(
        src,
        targetWidth!,
        targetHeight!,
        format,
        quality
      );
      setOutputUrl(url);
      setOutputFile(outFile);
    } catch {
      alert("Gagal memproses gambar");
    }
    setLoading(false);
  }

  // Dark mode toggle
  function toggleDark() {
    setDarkMode(d => !d);
    document.body.classList.toggle("dark", !darkMode);
  }

  // UI
  return (
    <div className={`w-full max-w-md ${darkMode ? "bg-gray-900 text-gray-50" : "bg-white text-gray-800"} rounded-2xl shadow-2xl px-6 py-8 flex flex-col gap-6 animate-fade-in`}>
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>Kompres / Resize Gambar</h2>
          <p className="text-gray-500 text-sm">Pilih gambar, crop (opsional), atur ukuran, lalu tekan Kompres / Resize.</p>
        </div>
        <button
          className={`w-8 h-8 flex items-center justify-center rounded-full transition ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
          aria-label="Toggle dark mode"
          onClick={toggleDark}
          type="button"
        >{darkMode ? "🌙" : "☀️"}</button>
      </div>

      {/* Drag & drop area */}
      <div
        className={`flex flex-col items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition ${dragActive ? "border-blue-400 bg-blue-50/50" : "border-gray-200"} ${darkMode ? "border-gray-700 bg-gray-800" : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        style={{ minHeight: 110 }}
        tabIndex={0}
      >
        <span className="font-medium">Pilih atau Drag & Drop Gambar</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
          disabled={loading}
        />
        {file && <span className="text-xs">{file.name}</span>}
      </div>

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
          {outputUrl ? (
            <>
              <img src={outputUrl} alt="Sesudah" className="max-w-[110px] max-h-[110px] rounded-xl border shadow" />
              <span className="text-xs text-gray-500">Ukuran: {formatSize(outputFile?.size)}</span>
            </>
          ) : (
            <div className="w-[110px] h-[110px] flex items-center justify-center text-gray-300 text-xs border rounded-xl">Belum ada</div>
          )}
        </div>
      </div>

      {/* Cropper modal */}
      {showCrop && imageUrl && (
        <div className="fixed z-50 inset-0 bg-black/60 flex flex-col items-center justify-center">
          <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-2xl flex flex-col gap-4 shadow-2xl`}>
            <div className="relative w-[320px] h-[320px]">
              <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={width && height ? Number(width) / Number(height) : 1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="rect"
                showGrid={true}
                style={{
                  containerStyle: { background: "#333" }
                }}
              />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xs">Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={e => setZoom(Number(e.target.value))}
                className="w-32"
              />
            </div>
            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg" onClick={handleCropDone} disabled={loading}>
                Terapkan Crop
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg" onClick={() => setShowCrop(false)} disabled={loading}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {file && (
        <div className="flex flex-col gap-3">
          {/* Tombol crop */}
          {imageUrl && (
            <button
              className="text-sm text-blue-600 underline w-max"
              type="button"
              onClick={() => setShowCrop(true)}
              disabled={loading}
            >
              Crop Gambar
            </button>
          )}
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
          {/* Format & Quality */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm">Format:</label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as any)}
                className="border rounded px-2 py-1"
                disabled={loading}
              >
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Kualitas:</label>
              <input
                type="range"
                min={0.3}
                max={1}
                step={0.01}
                value={quality}
                onChange={e => setQuality(Number(e.target.value))}
                className="w-20"
                disabled={loading || format === "image/png"}
              />
              <span className="text-xs">{Math.round(quality * 100)}%</span>
            </div>
          </div>
          <button
            onClick={handleProcess}
            disabled={loading || !((croppedImgUrl || imageUrl) && ((mode === "manual" && width && height) || mode === "auto"))}
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
            download={"output" + getExtFromFormat(format)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-full shadow"
          >
            Download Gambar
          </a>
        </div>
      )}
    </div>
  );
}
