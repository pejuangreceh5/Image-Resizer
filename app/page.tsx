"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleResize = () => {
    if (!image) return;

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event) => {
      const img = document.createElement("img"); // ✅ fix: replace new Image()
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const resizedDataUrl = canvas.toDataURL("image/jpeg");
          setResizedImage(resizedDataUrl);
        }
      };
    };
  };

  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center">Image Resizer Online</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <div className="flex gap-4">
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="border rounded p-1 ml-2 w-24"
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="border rounded p-1 ml-2 w-24"
          />
        </label>
      </div>

      <button
        onClick={handleResize}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Resize Image
      </button>

      {resizedImage && (
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Resized Image</h2>
          <img src={resizedImage} alt="Resized" className="mx-auto" />
          <a
            href={resizedImage}
            download="resized-image.jpg"
            className="block mt-2 text-blue-600 underline"
          >
            Download
          </a>
        </div>
      )}
    </main>
  );
          }
