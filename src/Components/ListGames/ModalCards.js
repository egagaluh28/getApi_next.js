"use client";

import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@heroui/react";

export default function ModalCards({ isOpen, onClose, game }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = game
    ? [
        game.thumbnail,
        ...(Array.isArray(game.screenshots)
          ? game.screenshots.map((s) => s.image)
          : []),
      ].filter(Boolean)
    : [];

  useEffect(() => {
    if (isOpen && game) setCurrentImageIndex(0);
  }, [game, isOpen]);

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

  if (!isOpen || !game) return null;

  const currentMainImage = allImages[currentImageIndex];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="relative w-full h-72 sm:h-80 lg:h-96">
          {currentMainImage && (
            <Image
              src={currentMainImage}
              alt={game.title}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-gray-700/50 p-2 rounded-full">
            <XMarkIcon className="w-7 h-7" />
          </button>

          {allImages.length > 1 && (
            <>
              <Button
                onPress={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full">
                <ChevronLeftIcon className="w-6 h-6" />
              </Button>
              <Button
                onPress={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full">
                <ChevronRightIcon className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>

        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto p-4 bg-gray-800/50">
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

        <div className="p-6">
          <h2 className="text-3xl font-bold text-white mb-2">{game.title}</h2>
          <div className="flex flex-wrap gap-2 mb-2">
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
          <p className="text-gray-300 mb-6">{game.short_description}</p>
          <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end">
            <Button
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold">
              Mainkan Sekarang
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
