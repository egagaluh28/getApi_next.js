"use client";
import Image from "next/image";

export default function GameDetailUI({ game }) {
  const formatTanggal = (tanggal) => {
    if (!tanggal) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(tanggal).toLocaleDateString("id-ID", options);
  };

  return (
    <main className="relative flex items-center justify-center w-full min-h-screen p-4 overflow-hidden">
      {/* bg */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `
      linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,0.9)),
      url(${game.thumbnail})
    `,
        }}>
        <div className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-sm backdrop-saturate-150"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row max-w-5xl w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 ease-in-out">
        <div className="md:w-2/5">
          <Image
            className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            src={game.thumbnail}
            width={500}
            height={300}
            alt={game.title}
          />
        </div>

        <div
          className="relative flex flex-col justify-between p-6 sm:p-8 md:w-3/5
                     bg-gradient-to-br from-slate-900/70 to-slate-900/50
                     backdrop-blur-sm">
          <div
            className="absolute top-0 left-0 w-2/3 h-2/3 rounded-full opacity-20
                      bg-radial-gradient-tl from-white/30 via-transparent to-transparent"></div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-x-1.5 py-1 px-3 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 ring-1 ring-inset ring-blue-500/30">
                {game.genre}
              </span>
              <span className="inline-flex items-center gap-x-1.5 py-1 px-3 rounded-full text-xs font-medium bg-green-500/20 text-green-300 ring-1 ring-inset ring-green-500/30">
                {game.platform}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white shadow-black/50 text-shadow-lg">
              {game.title}
            </h1>

            <p className="mt-4 text-slate-200">{game.short_description}</p>

            <ul className="mt-6 space-y-4 border-t border-white/10 pt-4 text-sm text-slate-200">
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4z"
                  />
                </svg>
                <span className="font-semibold text-slate-400">Publisher:</span>
                <span>{game.publisher}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span className="font-semibold text-slate-400">Developer:</span>
                <span>{game.developer}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-semibold text-slate-400">
                  Tanggal Rilis:
                </span>
                <span>{formatTanggal(game.release_date)}</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 flex flex-col mt-8 sm:flex-row sm:gap-4">
            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition shadow-lg hover:shadow-blue-500/50">
              Mainkan Sekarang
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
