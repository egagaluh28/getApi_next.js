export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-gray-950 to-slate-900 text-white py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Mainkan Game Favoritmu di
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Kuantum Games
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-slate-400 max-w-3xl mx-auto">
            Temukan berbagai game menarik dan seru yang bisa kamu mainkan secara
            gratis. Dari aksi, petualangan, hingga strategi, semua ada di sini!
          </p>
        </div>
      </div>
    </section>
  );
}
