"use client";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { Spinner, Button } from "@heroui/react";
import { getAllGames } from "../../lib/apiClient";

export default function GameListContainer() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getAllGames();
    setGames(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayedGames = showAll ? games : games.slice(0, 9);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Cards games={displayedGames} />
      {!showAll && games.length > 9 && (
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
