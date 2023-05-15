import clsx from "clsx";

import Header from "../../components/Header";
import { colorsByPoints } from "../../libs/config";
import useAppState from "../../libs/useAppState";
import useData from "../../libs/useData";
import { getCategory } from "../../libs/utils";

export default function ChallengesMonitor() {
  const { categories, challenges } = useData();
  const state = useAppState();
  const { view } = state;

  if (view.id !== "categories" || view.selectedCategoryId === null) {
    return null;
  }

  const category = getCategory(categories, view.selectedCategoryId);

  return (
    <div className="flex w-full flex-1 flex-col gap-4">
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
          {challenges
            .filter((challenge) => challenge.categoryId === category.id)
            .map((challenge) => (
              <div
                className={clsx(
                  "min-w-[60vw] rounded-xl border bg-base-300 p-6 px-12 text-center text-4xl font-bold uppercase text-base-content transition",
                  view.selectedChallengeId !== null &&
                    (view.selectedChallengeId === challenge.id
                      ? "scale-105"
                      : "opacity-30")
                )}
                key={challenge.id}
              >
                {challenge.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
