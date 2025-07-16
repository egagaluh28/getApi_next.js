"use client";

import GameListContainer from "../../Components/ListGames/GameListContainer";
import SearchBar from "../../Components/Filter/Search";

export default function TesPage() {
  // 2. Tidak ada lagi state atau useEffect di sini
  return (
    <main className="bg-[#1d1b33]">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Free-to-Play Games
        </h1>
        {/* 3. Cukup panggil komponen yang sudah berisi logika */}
        <GameListContainer />
      </div>
      <SearchBar />
    </main>
  );
}
