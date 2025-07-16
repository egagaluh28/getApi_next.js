"use client";
import { Card, Image, CardFooter, Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../Filter/Search";
import axios from "axios";

export default function Cards() {
  const router = useRouter();
  const [allGames, setAllGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiHost = process.env.NEXT_PUBLIC_API_HOST;

        const { data } = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/games",
          {
            headers: {
              "x-rapidapi-key": apiKey,
              "x-rapidapi-host": apiHost,
            },
          }
        );
        setAllGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = allGames.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen justify-center items-center">
      <div className="container mx-auto py-6">
        <h2 className="text-xl font-bold text-white text-start">
          Game Terbaru
        </h2>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredGames.map((post) => (
          <Card
            key={post.id}
            className="max-w-xs bg-black border-1 border-white/50 transition-all hover:border-white hover:scale-101"
            radius="sm">
            <Image
              removeWrapper
              alt={post.title}
              className="z-0 object-cover"
              style={{
                borderTopLeftRadius: "0.25rem",
                borderTopRightRadius: "0.25rem",
              }}
              src={post.thumbnail}
            />
            <CardFooter className="bottom-0 z-10 border-t-1 border-default-600/20">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <p className="text-md text-white font-bold">{post.title}</p>
                  <p className="text-tiny text-white/60">
                    {post.release_date || "Rilis Tidak Diketahui"}
                  </p>
                  <p className="font-bold text-tiny text-white/60">
                    {post.genre || "Genre Tidak Diketahui"}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => router.push(`/DetailGames/${post.id}`)}
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
