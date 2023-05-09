import { useMemo } from "react";

import Logo from "../../components/Logo";
import { pointByCategory } from "../../libs/config";
import useGame from "../../libs/useGame";

function ResultsMonitor() {
  const { game } = useGame();

  const pointByTeam = useMemo(() => {
    return game.results.reduce<Record<number, number>>((acc, curr) => {
      acc[curr.teamId] = acc[curr.teamId] || 0;

      if (curr.success) {
        acc[curr.teamId] += pointByCategory[curr.categoryId];
      }

      return acc;
    }, {});
  }, [game.results]);

  const max = useMemo(() => {
    return Object.values(pointByTeam).reduce(
      (acc, curr) => Math.max(acc, curr),
      0
    );
  }, [pointByTeam]);

  const winners = useMemo(() => {
    return Object.entries(pointByTeam)
      .filter(([, point]) => point === max)
      .map(
        ([teamId]) =>
          game.teams.find((team) => team.id === Number(teamId))?.name || "???"
      );
  }, [game.teams, max, pointByTeam]);

  return (
    <div className="flex h-full flex-col items-center gap-12 p-12 pt-6">
      <Logo className="fill-neutral-content h-[15vh]" />

      <div className="flex h-full w-full flex-1 flex-col">
        <div className="flex flex-1 justify-end">
          {game.teams.map((team) => (
            <div
              className="flex flex-1 items-end justify-center border-b"
              key={team.id}
            >
              <div
                className="w-16 bg-red-500 py-2 text-center text-xl text-white"
                style={{
                  minHeight: "2.2em",
                  height: `${(pointByTeam[team.id] * 100) / max}%`,
                }}
              >
                {pointByTeam[team.id] || 0}
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full py-4">
          {game.teams.map((team) => (
            <div className="flex-center flex-1" key={team.id}>
              <div className="badge badge-lg badge-outline p-4 text-xl">
                <span className="mr-2 text-2xl">{team.emoji}</span>
                {team.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {winners.length > 0 && game.ended && (
        <div className="border-neutral-content rounded-lg border p-4 px-6 text-3xl">
          {winners.length > 1 ? (
            <div>Les équipes {winners.join(", ")} gagnent ! 🎉</div>
          ) : (
            <div>L'équipe {winners[0]} gagne ! 🎉</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultsMonitor;
