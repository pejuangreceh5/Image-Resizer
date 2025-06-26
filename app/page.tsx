'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      compressImage(file);
    }
  };

  const compressImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setCompressedImage(compressedDataUrl);
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const downloadImage = () => {
    if (compressedImage) {
      const a = document.createElement('a');
      a.href = compressedImage;
      a.download = 'compressed.jpg';
      a.click();
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-6">Image Compressor & Resizer</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {selectedImage && (
        <div className="mb-4">
          <h2 className="font-semibold">Original:</h2>
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Original"
            width={300}
            height={300}
            className="mx-auto my-2"
          />
        </div>
      )}
      {compressedImage && (
        <div>
          <h2 className="font-semibold">Compressed:</h2>
          <Image
            src={compressedImage}
            alt="Compressed"
            width={300}
            height={300}
            className="mx-auto my-2"
          />
          <button
            onClick={downloadImage}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Compressed Image
          </button>
        </div>
      )}
    </main>
  );
    }
