"use client";

import { useEffect, useState } from "react";
import Cards from "../../Components/ListGames/Cards";
import { Spinner } from "@heroui/react"; // 1. Impor Spinner

export default function TesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "5831ceba48mshbb759bb9ab4da82p1add27jsn6b3f38ad958f",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setGames(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // 2. Tampilkan Spinner saat loading dan pusatkan di tengah
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="bg-[#1d1b33]">
      <div className="container mx-auto p-6">
        <Cards posts={games} />
      </div>
    </main>
  );
}
