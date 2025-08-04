"use client";

import { CheckboxGroup, Checkbox } from "@heroui/react";
import { useEffect, useState, useMemo } from "react";

export default function FilterCheckbox({
  selectedGenres,
  onChangeGenres,
  allGames = [],
}) {
  const [internalSelected, setInternalSelected] = useState(
    selectedGenres || []
  );

  useEffect(() => {
    setInternalSelected(selectedGenres || []);
  }, [selectedGenres]);

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

  const genres = useMemo(() => {
    const genreSet = new Set(allGames.map((g) => g.genre).filter(Boolean));
    return ["All", ...Array.from(genreSet)];
  }, [allGames]);

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
