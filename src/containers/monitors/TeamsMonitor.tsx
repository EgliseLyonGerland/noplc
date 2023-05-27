import { motion } from "framer-motion";

import Header from "../../components/Header";
import useAppState from "../../libs/useAppState";

export default function TeamsMonitor() {
  const { teams } = useAppState();

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <Header>Équipes</Header>

      <div className="flex-center flex-1">
        <div className="text-center">
          {teams.map((team) => (
            <motion.div
              className="inline-flex"
              key={`${team.name}${team.id}`}
              layout
            >
              <motion.div
                animate={{ opacity: 1, scale: 0.9 }}
                className="m-1"
                initial={{ opacity: 0, scale: 1 }}
              >
                <div
                  className="mb-2 text-center leading-none"
                  style={{ fontSize: Math.min(300 / (teams.length / 4), 200) }}
                >
                  {team.emoji}
                </div>
                <div
                  className="whitespace-nowrap rounded-full border border-primary px-4"
                  style={{ fontSize: Math.min(70 / (teams.length / 4), 40) }}
                >
                  {team.name}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
