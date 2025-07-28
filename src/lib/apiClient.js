import axios from "axios";
const api = axios.create({
  baseURL: process.env.RAPIDAPI_URL,
  headers: {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    "x-rapidapi-host": process.env.RAPIDAPI_HOST,
  },
});

export async function getAllGames() {
  const resp = await api.get("/games");
  return resp.data;
}

export async function getGameById(id) {
  const resp = await api.get("/game", { params: { id } });
  return resp.data;
}
