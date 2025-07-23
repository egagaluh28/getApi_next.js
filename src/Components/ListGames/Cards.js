"use client";
import { Card, Image, CardFooter, Button } from "@heroui/react";
import React from "react";
import { useRouter } from "next/navigation";

export default function Cards({ games = [] }) {
  const router = useRouter();

  return (
    <main className="min-h-scree justify-center items-center ">
      <div className="container mx-auto py-6 ">
        <h2 className="text-xl font-bold   text-white text-start">
          Game Terbaru
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="max-w-xs bg-black border-1 border-white/50 transition-all hover:border-white hover:scale-101"
            radius="sm">
            <Image
              removeWrapper
              alt={game.title}
              className="z-0 object-cover"
              style={{
                borderTopLeftRadius: "0.25rem",
                borderTopRightRadius: "0.25rem",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
              src={game.thumbnail}
            />
            <CardFooter className="bottom-0 z-10 border-t-1 border-default-600/20">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <p className="text-md text-white font-bold">
                    {game.title || "Judul Tidak Diketahui"}
                  </p>
                  <p className="text-tiny text-white/60">
                    {game.release_date || "Rilis Tidak Diketahui"}
                  </p>
                  <p className="font-bold text-tiny text-white/60">
                    {game.genre || "Genre Tidak Diketahui"}
                  </p>
                </div>
              </div>
              <Button
                as="a"
                onClick={() => router.push(`/DetailGames/${game.id}`)}
                rel="noopener noreferrer"
                className="text-tiny text-white bg-[#1B2430]"
                color="default"
                radius="sm"
                size="sm"
                variant="flat">
                Lihat
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
