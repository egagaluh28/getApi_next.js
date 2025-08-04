import axios from "axios";

const api = axios.create({
  baseURL: process.env.RAPIDAPI_URL,
  headers: {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    "x-rapidapi-host": process.env.RAPIDAPI_HOST,
  },
});


export async function getAllGamesRapid() {
  try {
    const response = await api.get("/games");
    return response.data;
  } catch (err) {
    throw new Error("Gagal fetch daftar game dari RapidAPI: " + err.message);
  }
}

export async function getGameByIdRapid(id) {
  try {
    const response = await api.get("/game", {
      params: { id },
    });
    return response.data;
  } catch (err) {
    throw new Error("Gagal fetch detail game: " + err.message);
  }
}
