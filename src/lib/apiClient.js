import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
  },
});

export async function getAllGames() {
  try {
    const response = await api.get('/games');
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil semua game:", error);
    throw error;
  }
}


export async function getGameById(id) {
  try {
    const response = await api.get('/game', {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error(`Gagal mengambil game dengan ID ${id}:`, error);
    throw error;
  }
}