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
      const img = document.createElement("img"); // ✅ fix for TypeScript
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
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Image Resizer</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ margin: "10px 0" }}
      />

      <div style={{ marginBottom: "10px" }}>
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            style={{ marginLeft: "8px", padding: "4px", width: "80px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            style={{ marginLeft: "8px", padding: "4px", width: "80px" }}
          />
        </label>
      </div>

      <button
        onClick={handleResize}
        style={{
          backgroundColor: "#2563EB",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Resize Image
      </button>

      {resizedImage && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Resized Image</h2>
          <img
            src={resizedImage}
            alt="Resized"
            style={{ margin: "10px 0", maxWidth: "100%" }}
          />
          <br />
          <a
            href={resizedImage}
            download="resized-image.jpg"
            style={{ color: "#2563EB", textDecoration: "underline" }}
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
