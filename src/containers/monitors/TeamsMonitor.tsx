import Logo from "../../components/Logo";
import Team from "../../components/Team";
import useGame from "../../libs/useGame";

function TeamsMonitor() {
  const { game } = useGame();

  return (
    <div className="flex h-full flex-col items-center gap-8">
      <div>
        <Logo className="fill-neutral-content h-[15vh]" />
      </div>

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

export default TeamsMonitor;
