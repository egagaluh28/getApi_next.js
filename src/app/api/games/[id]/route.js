import { NextResponse } from "next/server";
import { getGameByIdRapid } from "../../../../lib/apiServer";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const data = await getGameByIdRapid(id);
    return NextResponse.json(data);
  } catch (err) {
    console.error(
      `Terjadi kesalahan saat mengambil data game dengan ID ${params.id}:`,
      err
    );
    return NextResponse.json(
      { error: "Gagal mengambil detail game" },
      { status: 500 }
    );
  }
}
