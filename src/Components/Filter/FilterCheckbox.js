"use client";

import { CheckboxGroup, Checkbox } from "@heroui/react";
import { useEffect, useState } from "react";
import { getAllGames } from "../../lib/apiClient";

export default function FilterCheckbox({ selectedGenres, onChangeGenres }) {
  const [internalSelected, setInternalSelected] = useState(["All"]);
  const [genres, setGenres] = useState(["All"]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const games = await getAllGames();
        const genreSet = new Set();
        games.forEach((game) => {
          if (game.genre) genreSet.add(game.genre);
        });
        setGenres(["All", ...Array.from(genreSet)]);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    onChangeGenres(internalSelected);
  }, [internalSelected, onChangeGenres]);

  const handleChange = (values) => {
    if (values.includes("All") && values.length > 1) {
      values = values.filter((v) => v !== "All");
    }
    if (values.length === 0) {
      values = ["All"];
    }
    setInternalSelected(values);
  };

  return (
    <CheckboxGroup
      value={internalSelected}
      onChange={handleChange}
      className="text-white">
      <h3 className="text-2xl font-bold mb-5 text-white">Filter Genre</h3>
      <div className="flex flex-col gap-y-3">
        {genres.map((genre) => (
          <Checkbox
            key={genre}
            value={genre}
            className="!text-white !fill-white text-lg cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
            style={{ color: "white" }}>
            <span className="text-white">{genre}</span>
          </Checkbox>
        ))}
      </div>
    </CheckboxGroup>
  );
}
