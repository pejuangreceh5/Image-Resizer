"use client";
import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
    setOutput(null);
  }

  function reset() {
    setImage(null);
    setFile(null);
    setOutput(null);
    setWidth("");
    setHeight("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleProcess() {
    if (!file) return;
    setLoading(true);
    try {
      const options: any = {};
      if (width) options.maxWidth = width;
      if (height) options.maxHeight = height;
      options.maxSizeMB = 1;
      const compressed = await imageCompression(file, options);
      const result = await imageCompression.getDataUrlFromFile(compressed);
      setOutput(result);
    } catch (err) {
      alert("Gagal kompres/resize gambar");
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-6 py-8 flex flex-col gap-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Kompres / Resize Gambar</h2>
        <p className="text-gray-500 text-sm">Langsung di browser, tanpa upload ke server.</p>
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
          <img src={image} alt="preview" className="max-w-[180px] max-h-[180px] rounded-xl border shadow" />
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

      {file && (
        <div className="flex flex-col gap-3">
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
          <button
            onClick={handleProcess}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow transition"
            type="button"
          >
            {loading ? "Memproses..." : "Kompres / Resize!"}
          </button>
        </div>
      )}

      {output && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <span className="text-green-600 font-medium">✓ Sukses!</span>
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
