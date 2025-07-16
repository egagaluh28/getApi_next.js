import GameDetailUI from "../../../Components/ListGames/GameDetailUI";

export default async function DetailPage({ params }) {
  const res = await fetch(`https://www.freetogame.com/api/game?id=${params.id}`);
  if (!res.ok) throw new Error("Gagal mengambil detail game");
  const game = await res.json();
  return <GameDetailUI game={game} />;
}
