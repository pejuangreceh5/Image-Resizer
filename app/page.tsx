import ImageCompressor from "@/components/ImageCompressor";

export const metadata = {
  title: "Image Compressor & Resizer Online Gratis",
  description:
    "Kompres dan resize gambar JPG, PNG, WebP secara online langsung di browser. Cepat, gratis, dan tanpa watermark.",
};

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-6 pb-16 bg-[#f6f6f6] dark:bg-gray-950 transition-colors">
      <header className="w-full max-w-2xl mx-auto flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-xl mb-6 animate-fade-in">
        <span className="text-4xl">🖼️</span>
        <div>
          <h1 className="text-white text-2xl font-bold tracking-tight drop-shadow">
            Image Compressor & Resizer
          </h1>
        </div>
      </header>

      {/* Konten SEO statis */}
      <section className="prose dark:prose-invert max-w-2xl px-4 mb-10 animate-fade-in">
        <h1>Image Compressor & Resizer Online Gratis</h1>
        <p>
          Selamat datang di alat kompres dan resize gambar gratis berbasis web.
          Aplikasi ini membantu Anda mengurangi ukuran file gambar secara instan
          tanpa mengorbankan kualitas visual.
        </p>
        <h2>Fitur Unggulan</h2>
        <ul>
          <li>Mendukung format JPG, PNG, dan WebP</li>
          <li>Resize otomatis atau manual</li>
          <li>Crop gambar sebelum resize</li>
          <li>Mode gelap dan terang</li>
          <li>Gratis tanpa watermark</li>
        </ul>
        <h2>Kenapa Kompresi Gambar Penting?</h2>
        <p>
          Gambar berukuran besar memperlambat loading website dan menguras
          bandwidth. Dengan mengompres gambar, Anda bisa mempercepat akses,
          menghemat ruang penyimpanan, dan memperbaiki performa SEO website Anda.
        </p>
        <h2>Cara Menggunakan</h2>
        <ol>
          <li>Pilih gambar dari perangkat Anda atau drag & drop</li>
          <li>Crop (jika perlu), atur ukuran dan kualitas</li>
          <li>Klik "Kompres / Resize"</li>
          <li>Download gambar hasil kompresi</li>
        </ol>
        <h2>Privasi Terjamin</h2>
        <p>
          Semua proses dilakukan langsung di browser Anda tanpa upload ke server.
          Data gambar Anda tetap aman dan privat.
        </p>
      </section>

      {/* Komponen utama aplikasi */}
      <ImageCompressor />

      {/* Navigasi tambahan */}
      <div className="text-center mt-8 text-sm text-gray-500">
        <a href="/about" className="mx-2 hover:underline">Tentang</a>
        <a href="/faq" className="mx-2 hover:underline">FAQ</a>
        <a href="/privacy" className="mx-2 hover:underline">Privasi</a>
      </div>

      <footer className="fixed bottom-0 left-0 w-full flex justify-center py-4 bg-white/95 dark:bg-gray-900/95 border-t border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium tracking-wide rounded-t-2xl transition-colors">
        © 2025 Image Compressor
      </footer>
    </main>
  );
}
