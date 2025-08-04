"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  InformationCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import ModalPreview from "./ModalCards";
import { Button } from "@heroui/react";
import { getGameById } from "../../lib/apiClient";
import FilterCheckbox from "../../Components/Filter/FilterCheckbox";

export default function Cards({
  games,
  showAll,
  onFilteredCountChange,
  selectedGenres,
  setSelectedGenres,
  query,
  setQuery,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loadingGame, setLoadingGame] = useState(false);

  const handlePreviewClick = async (id) => {
    setIsModalOpen(true);
    setLoadingGame(true);
    const data = await getGameById(id);
    setSelectedGame(data);
    setLoadingGame(false);
  };

  // const handlePreviewClick = (id) => {
  //   setIsModalOpen(true);
  //   setLoadingGame(true);

  //   const selected = games.find((g) => g.id === id);
  //   setSelectedGame(selected || null);

  //   setLoadingGame(false);
  // };

  const filteredGames = games.filter((game) => {
    const filterQuery = game.title
      .toLowerCase()
      .includes((query || "").toLowerCase());
    const filterGenre =
      selectedGenres.includes("All") || selectedGenres.includes(game.genre);
    return filterQuery && filterGenre;
  });

  useEffect(() => {
    if (onFilteredCountChange) onFilteredCountChange(filteredGames.length);
  }, [filteredGames.length, onFilteredCountChange]);

  const displayedGames = showAll ? filteredGames : filteredGames.slice(0, 9);

  return (
    <main className="text-white py-8 px-4">
      <div className="mb-8">
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari game favoritmu..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterCheckbox
            selectedGenres={selectedGenres}
            onChangeGenres={setSelectedGenres}
            allGames={games}
          />
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-4 text-center lg:text-start">
            Game Terbaru
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedGames.map((game) => (
              <div
                key={game.id}
                className="bg-black border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 shadow-xl group rounded-lg overflow-hidden cursor-pointer flex flex-col">
                <div
                  className="relative overflow-hidden flex-shrink-0 rounded-t-lg"
                  onClick={() => handlePreviewClick(game.id)}>
                  <Image
                    alt={game.title}
                    src={game.thumbnail}
                    width={300}
                    height={190}
                    loading="lazy"
                    className="object-cover w-full transition-transform duration-500 group-hover:scale-110 rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                </div>

                <div className="flex flex-col items-stretch p-4 gap-3 bg-black rounded-b-lg flex-grow">
                  <div className="flex flex-col text-left mb-2">
                    <p className="text-xl font-bold text-white truncate">
                      {game.title.length > 20
                        ? game.title.substring(0, 20) + "..."
                        : game.title}
                    </p>
                    <p className="text-sm text-white/70">
                      Genre: {game.genre || "N/A"}
                    </p>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Button
                      onPress={() => handlePreviewClick(game.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-1 py-1 bg-blue-700 hover:bg-blue-800 text-white font-sm rounded-lg shadow-md hover:shadow-blue-500/50 transition-all duration-200">
                      <InformationCircleIcon className="w-5 h-5" /> Preview
                    </Button>
                    <Link
                      href={`/DetailGames/${game.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-1 py-1 bg-green-600 hover:bg-green-700 text-white font-sm rounded-lg shadow-md hover:shadow-green-500/50 transition-all duration-200">
                      <PlayCircleIcon className="w-5 h-5" /> Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ModalPreview
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        game={selectedGame}
        loading={loadingGame}
      />
    </main>
  );
}
