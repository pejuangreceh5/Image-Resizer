import ImageCompressor from "../components/ImageCompressor";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-2 flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <img src="/logo.svg" alt="logo" className="w-16 h-16 mb-2" />
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Image Compressor & Resizer
        </h1>
        <p className="text-gray-600 text-center max-w-lg mt-2">
          Kompres atau resize gambar langsung di browsermu, tanpa upload ke server. Aman dan cepat!
        </p>
      </div>
      <ImageCompressor />
      <footer className="mt-10 text-gray-400 text-xs text-center">
        &copy; {new Date().getFullYear()} Image Compressor &middot; 100% Frontend
      </footer>
    </main>
  );
}
