"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Spinner, Button } from "@heroui/react";

export default function GameListContainer() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/games");
      setGames(res.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayedGames = showAll ? games : games.slice(0, 15);

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
      {!showAll && games.length > 15 && (
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
