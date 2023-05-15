import { useMemo } from "react";

import Header from "../../components/Header";
import { pointByCategory } from "../../libs/config";
import useAppState from "../../libs/useAppState";
import { getCategory, getChallenge, isGameDone } from "../../libs/utils";

export default function ResultsMonitor() {
  const state = useAppState();
  const { teams, rounds } = state;

  const pointByTeam = useMemo(() => {
    return rounds.reduce<Record<number, number>>((acc, curr) => {
      acc[curr.teamId] = acc[curr.teamId] || 0;

      if (curr.status === "success") {
        const challenge = getChallenge(curr.challengeId);
        const category = getCategory(challenge.categoryId);

        acc[curr.teamId] += pointByCategory[category.id];
      }

      return acc;
    }, {});
  }, [rounds]);

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
          teams.find((team) => team.id === Number(teamId))?.name || "???"
      );
  }, [teams, max, pointByTeam]);

  return (
    <div className="flex h-full flex-col items-center gap-12 p-12 pt-6">
      <Header>Resultats</Header>

      <div className="flex h-full w-full flex-1 flex-col">
        <div className="flex flex-1 justify-end">
          {teams.map((team) => (
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
          {teams.map((team) => (
            <div className="flex-center flex-1" key={team.id}>
              <div className="badge badge-lg badge-outline p-4 text-xl">
                <span className="mr-2 text-2xl">{team.emoji}</span>
                {team.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {winners.length > 0 && isGameDone(state) && (
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
