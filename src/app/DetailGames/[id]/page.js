import GameDetailUI from "../../../Components/ListGames/GameDetailUI";
import { getGameById } from "../../../lib/apiClient";

export default async function DetailPage({ params }) {
  const { id } = await params;
  const game = await getGameById(id);
  return <GameDetailUI game={game} />;
}
