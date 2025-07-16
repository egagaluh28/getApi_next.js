"use client";

import GameListContainer from "../Components/ListGames/GameListContainer";
import { HeroSection } from "../Components/HeroSection/HeroSection";

export default function Home() {
  return (
    <main className="bg-black">
      <div className="container mx-auto p-6">
        <HeroSection />
        <GameListContainer />
      </div>
    </main>
  );
}
