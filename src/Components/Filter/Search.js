"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/react";
import { Image } from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const router = useRouter();
  const [allGames, setAllGames] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredGames([]);
      setShowDropdown(false);
      return;
    }

    const filtered = allGames.filter((game) =>
      game.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredGames(filtered.slice(0, 5));
    setShowDropdown(true);
  };

  const handleSelectGame = (id) => {
    setQuery("");
    setShowDropdown(false);
    router.push(`/DetailGames/${id}`);
  };

  return (
    <div className="relative w-64">
      <Input
        value={query}
        onChange={handleInputChange}
        placeholder="Cari game..."
        radius="lg"
        startContent={<MagnifyingGlassIcon className="w-5 h-5 text-gray-900" />}
        classNames={{
          inputWrapper: "bg-black border-2 border-gray-600 text-white",
        }}
      />
      {showDropdown && filteredGames.length > 0 && (
        <ul className="absolute mt-5 w-full bg-gray-800 text-white rounded shadow-lg z-50 max-h-64 overflow-auto">
          {filteredGames.map((game) => (
            <li
              key={game.id}
              onClick={() => handleSelectGame(game.id)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-900 cursor-pointer border-b">
              <Image
                src={game.thumbnail}
                alt={game.title}
                className="w-10 h-10 object-cover rounded"
              />
              <span>{game.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
