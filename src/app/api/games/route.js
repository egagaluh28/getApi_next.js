import { NextResponse } from "next/server";
import { getAllGames } from "../../../lib/apiClient";

export async function GET() {
  try {
    const data = await getAllGames();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching all games:", err);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
