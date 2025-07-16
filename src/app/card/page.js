"use client";
import Image from "next/image";

export default function GameDetailUI({ game }) {
  const formatTanggal = (t) =>
    t
      ? new Date(t).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  const InfoItem = ({ icon, label, value }) => (
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
          d={icon}
        />
      </svg>
      <span className="font-semibold text-slate-400">{label}:</span>
      <span>{value}</span>
    </li>
  );

  return (
    <main className="relative flex items-center justify-center w-full min-h-screen p-4 overflow-hidden">
      {/* Background with gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)),
            url(${game.thumbnail})
          `,
        }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm backdrop-saturate-150" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden">
        <div className="md:w-2/5">
          <Image
            src={game.thumbnail}
            width={500}
            height={300}
            alt={game.title}
            className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>

        <div className="relative flex flex-col justify-between p-6 sm:p-8 md:w-3/5 bg-gradient-to-br from-slate-900/70 to-slate-900/50 backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-2/3 h-2/3 rounded-full opacity-20 bg-white/30" />

          <div className="relative z-10">
            {/* Tags */}
            <div className="flex gap-2 mb-3 text-xs font-medium">
              {[
                { text: game.genre, color: "blue" },
                { text: game.platform, color: "green" },
              ].map(({ text, color }, i) => (
                <span
                  key={i}
                  className={`inline-flex px-3 py-1 rounded-full bg-${color}-500/20 text-${color}-300 ring-1 ring-${color}-500/30`}>
                  {text}
                </span>
              ))}
            </div>

            {/* Title & Description */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white shadow-black/50 text-shadow-lg">
              {game.title}
            </h1>
            <p className="mt-4 text-slate-200">{game.short_description}</p>

            {/* Info List */}
            <ul className="mt-6 space-y-4 border-t border-white/10 pt-4 text-sm text-slate-200">
              <InfoItem
                icon="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4z"
                label="Publisher"
                value={game.publisher}
              />
              <InfoItem
                icon="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                label="Developer"
                value={game.developer}
              />
              <InfoItem
                icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                label="Tanggal Rilis"
                value={formatTanggal(game.release_date)}
              />
            </ul>
          </div>

          <div className="relative z-10 mt-8">
            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-5 py-2.5 text-center shadow-lg hover:shadow-blue-500/50">
              Mainkan Sekarang
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
