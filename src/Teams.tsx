import useGame from "./libs/useGame";
import Logo from "./Logo";

function Teams() {
  const { game } = useGame();

  return (
    <div className="flex h-full flex-col items-center gap-8">
      <Logo className="fill-neutral-content h-[15vh]" />

      <div className="flex-center flex-1">
        <div className="grid grid-cols-2 gap-4">
          {game.teams.map((team, index) => (
            <div
              className="border-primary min-w-[20vw] rounded-full border p-4 px-6 text-center text-2xl uppercase"
              key={`input-${index}`}
            >
              {team.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
