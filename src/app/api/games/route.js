import { NextResponse } from "next/server";
import { getAllGamesRapid } from "../../../lib/apiServer";

export async function GET(req) {
  try {
    const games = await getAllGamesRapid();
    // const limitedGames = games.slice(0, 40);
    return NextResponse.json(games);
  } catch (err) {
    console.error("Terjadi kesalahan saat mengambil daftar game:", err);
    return NextResponse.json(
      { error: "Gagal mengambil daftar game" },
      { status: 500 }
    );
  }
}
