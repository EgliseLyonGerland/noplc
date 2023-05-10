import Header from "../../components/Header";
import Team from "../../components/Team";
import useGame from "../../libs/useGame";

export default function TeamsMonitor() {
  const { game } = useGame();

  return (
    <div className="flex h-full w-full flex-col items-center gap-8">
      <Header>Équipes</Header>

      <div className="flex-center flex-1">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {game.teams.map((team) => (
            <Team key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}
