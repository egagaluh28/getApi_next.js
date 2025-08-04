"use client";

import { useEffect, useState } from "react";
import Cards from "./Cards";
import { Spinner, Button } from "@heroui/react";
import { getAllGames } from "../../lib/apiClient";

export default function GameListContainer() {
  const [games, setGames] = useState([]);
  
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedGenres, setSelectedGenres] = useState(["All"]);
  const [query, setQuery] = useState("");
  const [filteredCount, setFilteredCount] = useState(0);

  async function fetchData() {
    const data = await getAllGames();
    setGames(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    setShowAll(false);
  }, [selectedGenres, query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Cards
        games={games}
        showAll={showAll}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        query={query}
        setQuery={setQuery}
        onFilteredCountChange={setFilteredCount}
      />
      {!showAll && filteredCount > 9 && (
        <div className="text-center mt-8">
          <Button
            onPress={() => setShowAll(true)}
            className="text-tiny text-white bg-[#1B2430]"
            variant="solid">
            Lihat Semua
          </Button>
        </div>
      )}
    </>
  );
}
