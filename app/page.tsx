import dynamic from "next/dynamic";
const ImageCompressor = dynamic(() => import("../components/ImageCompressor"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-6 pb-16 bg-[#f6f6f6] dark:bg-gray-950 transition-colors">
      <header className="w-full max-w-2xl mx-auto flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-xl mb-6 animate-fade-in">
        <span className="text-4xl">🖼️</span>
        <div>
          <h1 className="text-white text-2xl font-bold tracking-tight drop-shadow">
            Image Compressor & Resizer
          </h1>
        </div>
      </header>

      <ImageCompressor />

      <footer className="fixed bottom-0 left-0 w-full flex justify-center py-4 bg-white/95 dark:bg-gray-900/95 border-t border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium tracking-wide rounded-t-2xl transition-colors">
        © {new Date().getFullYear()} Image Compressor
      </footer>
    </div>
  );
}
