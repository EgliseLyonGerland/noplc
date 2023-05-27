import clsx from "clsx";
import { motion } from "framer-motion";

import Header from "../../components/Header";
import { colorsByPoints } from "../../libs/config";
import useAppState from "../../libs/useAppState";
import useData from "../../libs/useData";
import { getCategory, getChallengesByCategory } from "../../libs/utils";

export default function ChallengesMonitor() {
  const { categories, challenges } = useData();
  const state = useAppState();
  const { view, demoModeEnabled } = state;

  if (view.id !== "categories" || view.selectedCategoryId === null) {
    return null;
  }

  const category = getCategory(categories, view.selectedCategoryId);

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4">
      <Header bgColor={colorsByPoints[category.point][0]}>
        <div className="flex-center flex-col gap-2">
          <div
            className={clsx(
              "badge badge-lg border-0",
              colorsByPoints[category.point][1]
            )}
          >
            {category?.point} pts
          </div>
          <h3 className="text-4xl uppercase">{category.name}</h3>
        </div>
      </Header>

      <div className="flex-center flex-1">
        <div className="grid grid-cols-1 gap-8">
          {getChallengesByCategory(
            challenges,
            category.id,
            demoModeEnabled
          ).map((challenge, index) => (
            <motion.div
              animate={
                view.selectedChallengeId !== null
                  ? view.selectedChallengeId === challenge.id
                    ? "selected"
                    : "disabled"
                  : "shown"
              }
              className="min-w-[60vw] rounded-full border border-primary p-6 px-12 text-center text-4xl font-bold uppercase"
              initial="hidden"
              key={challenge.id}
              transition={{ delay: index * 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                shown: { opacity: 1, y: 0 },
                selected: { opacity: 1, y: 0, scale: 1.05 },
                disabled: { opacity: 0.3, y: 0 },
              }}
            >
              {challenge.title}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
