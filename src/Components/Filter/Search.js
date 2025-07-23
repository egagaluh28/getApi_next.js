"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input, Image } from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getAllGames } from "../../lib/apiClient";

export default function SearchBar() {
  const router = useRouter();
  const [allGames, setAllGames] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  // const fetchGames = async () => {
  //   try {
  //     const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  //     const apiHost = process.env.NEXT_PUBLIC_API_HOST;

  //     const response = await fetch(
  //       "https://free-to-play-games-database.p.rapidapi.com/api/games",
  //       {
  //         method: "GET",
  //         headers: {
  //           "x-rapidapi-key": apiKey,
  //           "x-rapidapi-host": apiHost,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setAllGames(data);
  //   } catch (error) {
  //     console.error("Error fetching games:", error);
  //   }
  // };

  async function fetchData() {
    const data = await getAllGames();
    setAllGames(data);
  }

  function dropDown() {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

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

  useEffect(() => {
    dropDown();
    fetchData();
  }, []);

  return (
    <div className="relative w-62" ref={searchRef}>
      <Input
        value={query}
        onChange={handleInputChange}
        onFocus={() => query && setShowDropdown(true)}
        placeholder="Cari game favoritmu..."
        radius="full"
        startContent={
          <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
        }
        classNames={{
          inputWrapper:
            "bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-200 group-focus-within:border-teal-500 group-focus-within:ring-1 group-focus-within:ring-teal-500 transition-all duration-300",
          input: "placeholder:text-slate-500",
        }}
      />
      {showDropdown && filteredGames.length > 0 && (
        <ul className="absolute mt-2 w-full overflow-hidden rounded-xl bg-slate-800 border border-slate-700 text-slate-300 shadow-lg z-50 max-h-80 overflow-y-auto">
          {filteredGames.map((game) => (
            <li
              key={game.id}
              onClick={() => handleSelectGame(game.id)}
              className="flex items-center gap-4 px-4 py-3 hover:bg-teal-500/10 cursor-pointer transition-colors duration-200 border-b border-slate-700 last:border-b-0">
              <Image
                src={game.thumbnail}
                alt={game.title}
                className="w-16 h-10 object-cover rounded-md"
              />
              <span className="truncate font-medium">{game.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
