import { NextResponse } from "next/server";
import { getGameById } from "../../../../lib/apiClient";

export async function GET(req, { params }) {
  try {
    const data = await getGameById(params.id);
    return NextResponse.json(data);
  } catch (err) {
    console.error(`Error fetching game ID ${params.id}:`, err);
    return NextResponse.json({ error: "Failed to fetch game detail" }, { status: 500 });
  }
}
