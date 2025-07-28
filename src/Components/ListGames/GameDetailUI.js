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
    return new Date(tanggal).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const allImages = [
    game.thumbnail,
    ...(game.screenshots || []).map((s) => s.image),
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => setCurrentImageIndex(0), [game]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const currentMainImage = allImages[currentImageIndex];

  return (
    <main className="relative py-5 flex flex-col items-center w-full min-h-screen bg-gray-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30"
        style={{ backgroundImage: `url(${currentMainImage})` }}></div>
      <div className="relative z-10 w-full max-w-6xl p-6 md:p-10 bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-3xl shadow-2xl border border-gray-700/50">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6">
          <Image
            src={currentMainImage}
            alt={game.title}
            fill
            className="object-cover"
            priority
          />

          {allImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full shadow-md transition">
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full shadow-md transition">
                <ArrowRightIcon className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      idx === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-gray-500/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {allImages.length > 1 && (
          <div className="flex gap-2 mb-4 rounded-3xl overflow-x-auto p-4 bg-gray-800/50">
            {allImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative w-20 h-14 cursor-pointer rounded overflow-hidden border-2 ${
                  idx === currentImageIndex
                    ? "border-blue-500"
                    : "border-transparent"
                }`}>
                <Image
                  src={img}
                  alt={`Screenshot ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-200 text-xs font-medium">
              {game.genre}
            </span>
            <span className="px-3 py-1 rounded-full bg-green-600/30 text-green-200 text-xs font-medium">
              {game.platform}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                game.status === "Live"
                  ? "bg-emerald-600/30 text-emerald-200"
                  : "bg-red-600/30 text-red-200"
              }`}>
              {game.status}
            </span>
          </div>

          <h1 className="text-4xl font-bold">{game.title}</h1>
          <p className="text-gray-300 text-lg">{game.short_description}</p>

          {game.description && (
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <BookOpenIcon className="w-6 h-6 text-gray-400" />
                Tentang Game Ini
              </h2>
              <p className="text-gray-300">{game.description}</p>
            </div>
          )}

          <ul className="space-y-3 border-t border-gray-700 pt-4">
            <li className="flex gap-3">
              <BuildingLibraryIcon className="w-6 text-gray-400" />
              <span className="font-semibold">Penerbit:</span> {game.publisher}
            </li>
            <li className="flex gap-3">
              <CodeBracketIcon className="w-6 text-gray-400" />
              <span className="font-semibold">Pengembang:</span>{" "}
              {game.developer}
            </li>
            <li className="flex gap-3">
              <CalendarDaysIcon className="w-6 text-gray-400" />
              <span className="font-semibold">Rilis:</span>{" "}
              {formatTanggal(game.release_date)}
            </li>
            <li className="flex gap-3">
              <LinkIcon className="w-6 text-gray-400" />
              <span className="font-semibold">FreetoGame:</span>
              <a
                href={game.freetogame_profile_url}
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                {game.freetogame_profile_url}
              </a>
            </li>
          </ul>

          {game.minimum_system_requirements && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">
                Persyaratan Minimum
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <ComputerDesktopIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>
                    <strong>OS:</strong> {game.minimum_system_requirements.os}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CpuChipIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>
                    <strong>Prosesor:</strong>{" "}
                    {game.minimum_system_requirements.processor}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CubeIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>
                    <strong>Memori:</strong>{" "}
                    {game.minimum_system_requirements.memory}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <RectangleStackIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>
                    <strong>Grafis:</strong>{" "}
                    {game.minimum_system_requirements.graphics}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <SwatchIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>
                    <strong>Penyimpanan:</strong>{" "}
                    {game.minimum_system_requirements.storage}
                  </span>
                </li>
              </ul>
            </div>
          )}

          <div className="pt-4">
            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-lg shadow-md transition">
              Mainkan Sekarang
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
