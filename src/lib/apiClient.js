import axios from "axios";

export async function getAllGames() {
  const res = await axios.get("/api/games");
  return res.data;
}

export async function getGameById(id) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/games/${id}`,
    {
      cache: "force-cache",
    }
  );
  return res.data;
}
