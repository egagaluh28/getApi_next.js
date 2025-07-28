"use client";
import { useState } from "react";
import Image from "next/image";
import {
  InformationCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import ModalPreview from "./ModalCards";
import getGameById from "../../lib/apiClient";


export default function Cards({ games }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loadingGame, setLoadingGame] = useState(false);
  const [query, setQuery] = useState("");

  const handlePreviewClick = async (id) => {
    try {
      setIsModalOpen(true);
      setLoadingGame(true);
      const res = await axios.get(`/api/games/${id}`);
      setSelectedGame(res.data);
    } catch (error) {
      console.error("Error fetching game details:", error);
    } finally {
      setLoadingGame(false);
    }
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen text-white py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center lg:text-start">
          Game Terbaru
        </h2>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari game favoritmu..."
          className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredGames.map((game) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
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
                  <button
                    onClick={() => handlePreviewClick(game.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-1 py-1 bg-blue-700 hover:bg-blue-800 text-white font-sm rounded-lg shadow-md hover:shadow-blue-500/50 transition-all duration-200">
                    <InformationCircleIcon className="w-5 h-5" /> Preview
                  </button>

                  <a
                    href={`/DetailGames/${game.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-1 py-1 bg-green-600 hover:bg-green-700 text-white font-sm rounded-lg shadow-md hover:shadow-green-500/50 transition-all duration-200">
                    <PlayCircleIcon className="w-5 h-5" /> Detail
                  </a>
                </div>
              </div>
            </div>
          ))}
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
