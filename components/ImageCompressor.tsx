"use client";
import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";

export default function ImageCompressor() {
  const [original, setOriginal] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string>("");
  const [resultSize, setResultSize] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setOriginal(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultUrl("");
      setResultSize(0);
    }
  };

  const handleCompress = async () => {
    if (!original) return;
    setLoading(true);
    try {
      const options: any = {
        maxWidthOrHeight:
          width && height
            ? Math.max(width, height)
            : width
            ? width
            : height
            ? height
            : undefined,
        maxWidth: width || undefined,
        maxHeight: height || undefined,
        useWebWorker: true,
        initialQuality: 0.8,
      };
      // Remove undefined keys
      Object.keys(options).forEach(
        (k) => options[k] === undefined && delete options[k]
      );
      const compressed = await imageCompression(original, options);
      setResultUrl(URL.createObjectURL(compressed));
      setResultSize(compressed.size);
    } catch (err) {
      alert("Gagal kompres gambar");
    }
    setLoading(false);
  };

  const resetAll = () => {
    setOriginal(null);
    setPreviewUrl("");
    setResultUrl("");
    setResultSize(0);
    setWidth(undefined);
    setHeight(undefined);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow flex flex-col gap-4">
      <label className="font-semibold text-lg">Pilih Gambar</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="block"
        onChange={handleFile}
      />
      {previewUrl && (
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div>
            <img
              src={previewUrl}
              alt="preview"
              className="max-h-40 rounded border"
            />
            <div className="text-xs text-gray-500 mt-1">
              Original: {(original?.size! / 1024).toFixed(1)} KB
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>
              <span className="mr-2">Width:</span>
              <input
                type="number"
                min={1}
                placeholder="auto"
                value={width || ""}
                onChange={(e) =>
                  setWidth(e.target.value ? parseInt(e.target.value) : undefined)
                }
                className="border rounded px-2 py-1 w-20"
              />
            </label>
            <label>
              <span className="mr-2">Height:</span>
              <input
                type="number"
                min={1}
                placeholder="auto"
                value={height || ""}
                onChange={(e) =>
                  setHeight(
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="border rounded px-2 py-1 w-20"
              />
            </label>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition mt-2"
              onClick={handleCompress}
              disabled={loading}
              type="button"
            >
              {loading ? "Memproses..." : "Kompres / Resize"}
            </button>
            <button
              className="text-gray-400 underline text-xs mt-2"
              onClick={resetAll}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      )}
      {resultUrl && (
        <div className="flex flex-col items-center gap-2 mt-4">
          <img
            src={resultUrl}
            alt="result"
            className="max-h-40 rounded border"
          />
          <div className="text-xs text-green-700">
            Hasil: {(resultSize / 1024).toFixed(1)} KB
          </div>
          <a
            href={resultUrl}
            download="compressed-image.jpg"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
          >
            Download Hasil
          </a>
        </div>
      )}
    </div>
  );
        }
