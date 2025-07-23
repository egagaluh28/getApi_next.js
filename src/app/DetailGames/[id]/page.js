import GameDetailUI from "../../../Components/ListGames/GameDetailUI";
import { getGameById } from "../../../lib/apiClient";

export default async function DetailPage({ params }) {
  const game = await getGameById(params.id);

  return <GameDetailUI game={game} />;
}
