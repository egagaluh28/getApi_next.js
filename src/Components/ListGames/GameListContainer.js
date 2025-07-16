"use client";

import { useEffect, useState } from "react";
import Cards from "./Cards";
import { Spinner, Button } from "@heroui/react";

export default function GameListContainer() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const apiHost = process.env.NEXT_PUBLIC_API_HOST;

      const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": apiHost,
        },
      };

      // const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
      // const options = {
      //   method: "GET",
      //   headers: {
      //     "x-rapidapi-key": "5831ceba48mshbb759bb9ab4da82p1add27jsn6b3f38ad958f",
      //     "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      //   },
      // };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setGames(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);
  
  const handleShowAll = showAll ? games : games.slice(0, 12);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <>
      <Cards posts={handleShowAll} />
      {!showAll && games.length > 12 && (
        <div className="text-center mt-8">
          <Button
            onClick={() => setShowAll(true)}
            className="text-tiny text-white bg-[#1B2430]"
            variant="solid"
          >
            Lihat Semua
          </Button>
        </div>
      )}
    </>
  );
}