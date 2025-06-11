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
      let resultUrl = "";
      let outFile: File | null = null;
      if (mode === "manual" && width && height) {
        // Manual resize: use canvas for non-proportional resizing
        const img = document.createElement("img");
        img.src = image!;
        await new Promise(resolve => { img.onload = resolve; });
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx
