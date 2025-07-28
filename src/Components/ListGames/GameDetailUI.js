"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  BookOpenIcon,
  BuildingLibraryIcon,
  CodeBracketIcon,
  CalendarDaysIcon,
  LinkIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  RectangleStackIcon,
  SwatchIcon,
  CubeIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

export default function GameDetailUI({ game }) {
  const formatTanggal = (tanggal) => {
    if (!tanggal) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(tanggal).toLocaleDateString("id-ID", options);
  };

  const allImages = [
    game.thumbnail,
    ...(game.screenshots ? game.screenshots.map((s) => s.image) : []),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [game]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 1 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentMainImage = allImages?.[currentImageIndex];

  return (
    <main className="relative flex flex-col items-center w-full min-h-screen p-4 overflow-hidden bg-gray-950 font-sans">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,0.9)),
            url(${currentMainImage})
          `,
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-black/70 backdrop-blur-xl backdrop-saturate-150"></div>
      </div>

      <div className="relative z-10 flex flex-col max-w-7xl w-full overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[1.005] bg-gradient-to-br from-slate-800/90 to-slate-900/80 border border-slate-700/50">
        <div className="relative min-h-[350px]">
          <Image
            className="object-cover w-full h-full rounded-t-3xl"
            src={currentMainImage}
            width={1200}
            height={800}
            alt={game.title}
            priority
            quality={85}
          />
          {allImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 z-20 transition-all duration-200"
                aria-label="Previous image"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 z-20 transition-all duration-200"
                aria-label="Next image"
              >
                <ArrowRightIcon className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "bg-white scale-125" : "bg-gray-400/70 hover:bg-gray-200"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>

        <div
          className="relative flex flex-col p-6 sm:p-8 text-white overflow-y-auto max-h-[80vh] lg:max-h-[unset] custom-scrollbar"
        >
          <div
            className="absolute top-0 left-0 w-2/3 h-2/3 rounded-full opacity-10
                     bg-radial-gradient-tl from-cyan-400/30 via-transparent to-transparent"
          ></div>

          <div className="relative z-10 flex-grow">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-x-1.5 py-1.5 px-4 rounded-full text-xs font-medium bg-blue-600/30 text-blue-200 ring-1 ring-inset ring-blue-600/40 transform hover:scale-105 transition-transform duration-200">
                {game.genre}
              </span>
              <span className="inline-flex items-center gap-x-1.5 py-1.5 px-4 rounded-full text-xs font-medium bg-green-600/30 text-green-200 ring-1 ring-inset ring-green-600/40 transform hover:scale-105 transition-transform duration-200">
                {game.platform}
              </span>
              <span
                className={`inline-flex items-center gap-x-1.5 py-1.5 px-4 rounded-full text-xs font-medium ${
                  game.status === "Live"
                    ? "bg-emerald-600/30 text-emerald-200 ring-emerald-600/40"
                    : "bg-red-600/30 text-red-200 ring-red-600/40"
                } ring-1 ring-inset transform hover:scale-105 transition-transform duration-200`}
              >
                {game.status}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
              {game.title}
            </h1>

            <p className="mt-4 text-slate-300 text-lg leading-relaxed">
              {game.short_description}
            </p>

            {game.description && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <BookOpenIcon className="w-6 h-6 text-slate-400" />
                  Tentang Game Ini
                </h2>
                <p className="text-slate-300 leading-relaxed text-base whitespace-pre-line">
                  {game.description}
                </p>
              </div>
            )}

            <ul className="mt-8 space-y-4 border-t border-white/10 pt-6 text-base text-slate-200">
              <li className="flex items-center gap-4">
                <BuildingLibraryIcon className="w-6 h-6 text-slate-400 flex-shrink-0" />
                <span className="font-semibold text-slate-400">Penerbit:</span>
                <span className="flex-1">{game.publisher}</span>
              </li>
              <li className="flex items-center gap-4">
                <CodeBracketIcon className="w-6 h-6 text-slate-400 flex-shrink-0" />
                <span className="font-semibold text-slate-400">Pengembang:</span>
                <span className="flex-1">{game.developer}</span>
              </li>
              <li className="flex items-center gap-4">
                <CalendarDaysIcon className="w-6 h-6 text-slate-400 flex-shrink-0" />
                <span className="font-semibold text-slate-400">
                  Tanggal Rilis:
                </span>
                <span className="flex-1">{formatTanggal(game.release_date)}</span>
              </li>
              <li className="flex items-center gap-4">
                <LinkIcon className="w-6 h-6 text-slate-400 flex-shrink-0" />
                <span className="font-semibold text-slate-400">
                  FreetoGame Profile:
                </span>
                <a
                  href={game.freetogame_profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline transition-colors duration-200 truncate"
                >
                  {game.freetogame_profile_url}
                </a>
              </li>
            </ul>

            {game.minimum_system_requirements && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Persyaratan Sistem Minimum
                </h2>
                <ul className="space-y-3 text-base text-slate-300">
                  <li className="flex items-start gap-3">
                    <ComputerDesktopIcon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold text-slate-400">OS:</span>
                    <span>{game.minimum_system_requirements.os}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CpuChipIcon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold text-slate-400">Prosesor:</span>
                    <span>{game.minimum_system_requirements.processor}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <RectangleStackIcon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold text-slate-400">Memori:</span>
                    <span>{game.minimum_system_requirements.memory}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <SwatchIcon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold text-slate-400">Grafis:</span>
                    <span>{game.minimum_system_requirements.graphics}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CubeIcon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold text-slate-400">
                      Penyimpanan:
                    </span>
                    <span>{game.minimum_system_requirements.storage}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative z-10 flex flex-col mt-8 sm:flex-row sm:gap-4 justify-center lg:justify-start">
            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-500/50 font-medium rounded-xl text-lg px-8 py-3 text-center transition shadow-lg hover:shadow-blue-600/60 transform hover:scale-105 duration-200 ease-in-out"
            >
              Mainkan Sekarang
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}