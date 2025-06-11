import ImageCompressor from "../components/ImageCompressor";

export default function Home() {
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

      {/* CARD: Komponen utama */}
      <ImageCompressor />

      {/* FOOTER ala Play Store */}
      <footer className="fixed bottom-0 left-0 w-full flex justify-center py-4 bg-white/95 border-t border-gray-100 text-gray-500 text-xs font-medium tracking-wide rounded-t-2xl">
        © {new Date().getFullYear()} Image Compressor · Inspired by Play Store UI
      </footer>
    </div>
  );
}
