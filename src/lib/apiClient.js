import axios from "axios";

export async function getAllGames() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiHost = process.env.NEXT_PUBLIC_API_HOST;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const options = {
    method: "GET",
    url: apiUrl,
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}

export async function getGameById(id) {
  try {
    const response = await axios.get(
      `https://www.freetogame.com/api/game?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    throw error;
  }
}
