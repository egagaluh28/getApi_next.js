"use client";
import {
  Card,
  Image,
  CardFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import ModalCards from "./ModalCards";
import {
  InformationCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";

export default function Cards({ games = [] }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedGame, setSelectedGame] = React.useState(null);

  const handlePreviewClick = (game) => {
    setSelectedGame(game);
    onOpen();
  };

  return (
    <main className="min-h-screen text-white py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center lg:text-start animate-fade-in-up">
          Game Terbaru
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className="bg-black border border-gray-700 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl group cursor-pointer" // Tambahkan cursor-pointer
            >
              <div
                className="relative overflow-hidden "
                onClick={() => handlePreviewClick(game)}>
                <Image
                  removeWrapper
                  alt={game.title}
                  className="z-0  w-full  transition-transform duration-500 group-hover:scale-110 "
                  src={game.thumbnail}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                
              </div>

              <CardFooter className="flex flex-col items-stretch p-4 gap-3 bg-black ">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col text-left">
                    <p className="text-xl font-bold truncate text-white">
                      {game.title
                        ? game.title.length > 15
                          ? game.title.substring(0, 15) + "..."
                          : game.title
                        : "Judul Tidak Diketahui"}
                    </p>
                    <p className="text-tiny text-white/60">
                      Publisher: {game.publisher || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 w-full mt-3">
                  <Button
                    startContent={<InformationCircleIcon className="w-5 h-5" />}
                    onPress={() => handlePreviewClick(game)}
                    className="flex-1 text-white bg-blue-700 hover:bg-blue-800 shadow-md hover:shadow-blue-500/50 transition-all duration-200"
                    color="primary"
                    radius="lg"
                    size="md">
                    Preview
                  </Button>
                  <Button
                    startContent={<PlayCircleIcon className="w-5 h-5" />}
                    onPress={() => router.push(`/DetailGames/${game.id}`)}
                    className="flex-1 text-white bg-green-600 hover:bg-green-700 shadow-md hover:shadow-green-500/50 transition-all duration-200"
                    color="success"
                    radius="lg"
                    size="md">
                    Detail
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <ModalCards
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        game={selectedGame}
      />
    </main>
  );
}
