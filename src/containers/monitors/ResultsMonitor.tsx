import { motion } from "framer-motion";
import { reverse, sortBy } from "lodash-es";
import { useMemo, useState } from "react";

import Header from "../../components/Header";
import useAppState from "../../libs/useAppState";
import useData from "../../libs/useData";
import { getCategory, getChallenge } from "../../libs/utils";

function Bar({
  score,
  highScore,
  delay,
}: {
  score: number;
  highScore: number;
  delay: number;
}) {
  const [scoreShown, setScoreShown] = useState(false);

  return (
    <motion.div
      animate={{ height: `${(score * 90) / highScore + 10}%` }}
      className="w-16 rounded-t-sm bg-red-500 py-2 text-center text-xl text-white"
      initial={{ height: "0%" }}
      onAnimationComplete={() => setScoreShown(true)}
      transition={{
        duration: 5,
        ease: "circIn",
        delay: delay,
      }}
    >
      <motion.span
        animate={{ opacity: Number(scoreShown) }}
        initial={{ opacity: 0 }}
      >
        {score || 0}
      </motion.span>
    </motion.div>
  );
}

export default function ResultsMonitor() {
  const { challenges, categories, pointByCategory } = useData();
  const state = useAppState();
  const { teams, rounds, view } = state;

  const scoreByTeam = useMemo(() => {
    return rounds.reduce<Record<number, number>>((acc, curr) => {
      acc[curr.teamId] = acc[curr.teamId] || 0;

      if (curr.status === "success") {
        const challenge = getChallenge(challenges, curr.challengeId);
        const category = getCategory(categories, challenge.categoryId);

        acc[curr.teamId] += pointByCategory[category.id];
      }

      return acc;
    }, {});
  }, [categories, challenges, pointByCategory, rounds]);

  const highScore = useMemo(() => {
    return Object.values(scoreByTeam).reduce(
      (acc, curr) => Math.max(acc, curr),
      0
    );
  }, [scoreByTeam]);

  if (view.id !== "categories") {
    return null;
  }

  return (
    <div className="flex h-full flex-col items-center gap-12 p-12 pt-6">
      <Header>Resultats</Header>

      {view.rankingsShown ? (
        <div className="container grid max-w-xl grid-cols-1 gap-4 gap-x-12">
          {reverse(sortBy(teams, (team) => scoreByTeam[team.id])).map(
            (team, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex max-h-16 flex-1 items-center gap-4"
                initial={{ opacity: 0, y: "20%" }}
                key={team.id}
                transition={{ delay: index * 0.1 }}
              >
                <motion.span
                  className="leading-none"
                  style={{ fontSize: `${50 / teams.length}vh` }}
                >
                  {team.emoji}
                </motion.span>
                <div
                  className="flex h-full flex-1 items-center justify-between gap-4 rounded-full border border-primary px-8 uppercase"
                  style={{ fontSize: `${20 / teams.length}vh` }}
                >
                  <span className="w-1/2">{team.name}</span>
                  <motion.span
                    animate={{
                      width: `${(scoreByTeam[team.id] * 99) / highScore + 1}%`,
                    }}
                    className="ml-auto h-2 bg-primary"
                    initial={{ width: 0 }}
                    transition={{
                      delay: index * 0.2,
                    }}
                  ></motion.span>
                  <span>{scoreByTeam[team.id] || 0}</span>
                </div>
              </motion.div>
            )
          )}
        </div>
      ) : (
        <div className="flex h-full w-full flex-1 flex-col">
          <div className="flex flex-1 justify-end">
            {teams.map((team) => (
              <div
                className="flex flex-1 items-end justify-center border-b"
                key={team.id}
              >
                <Bar
                  delay={teams.length * 0.1}
                  highScore={highScore}
                  score={scoreByTeam[team.id] || 0}
                />
              </div>
            ))}
          </div>
          <div className="flex w-full py-4">
            {teams.map((team, index) => (
              <motion.div
                animate={{ opacity: 1, scale: 0.9 }}
                className="flex-center flex-1 shrink-0 flex-col gap-2"
                initial={{ opacity: 0, scale: 1 }}
                key={team.id}
                transition={{ delay: index * 0.1 }}
              >
                <motion.span
                  className="leading-none"
                  style={{ fontSize: `${50 / teams.length}vw` }}
                >
                  {team.emoji}
                </motion.span>
                <div className="badge-outline badge badge-lg whitespace-nowrap p-2">
                  {team.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
