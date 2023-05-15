import clsx from "clsx";
import { Fragment } from "react";

import ResultsMonitor from "./ResultsMonitor";
import Header from "../../components/Header";
import { categoriesByPoint, colorsByPoints } from "../../libs/config";
import useAppState from "../../libs/useAppState";
import { getCurrentTeam, isCategoryDone, isGameDone } from "../../libs/utils";

export default function CategoriesMonitor() {
  const state = useAppState();
  const { view } = state;

  if (view.id !== "categories") {
    return null;
  }

  const gameDone = isGameDone(state);
  const currentTeam = getCurrentTeam(state);

  return (
    <>
      <div className="flex-center h-full flex-col gap-8">
        <div className="grid h-full flex-1 grid-cols-3 grid-rows-2 gap-3">
          {Object.entries(categoriesByPoint).map(
            ([point, categories], index) => (
              <Fragment key={point}>
                {index === 0 && (
                  <Header vertical>
                    {!gameDone && (
                      <div className="flex-center flex-1 flex-col gap-2">
                        <span className="text-[10vh] leading-none">
                          {currentTeam.emoji}
                        </span>
                        <div className="whitespace-nowrap p-2 px-6 text-center text-4xl uppercase leading-none">
                          {currentTeam.name}
                        </div>
                      </div>
                    )}
                  </Header>
                )}
                <div className="grid grid-cols-2 grid-rows-3 gap-3">
                  {categories.map(({ id, name, point }) => (
                    <div
                      className={clsx(
                        "flex-center bg-base-200 h-full w-full flex-col gap-2 rounded-lg p-2 text-white transition-[opacity,transform] ease-in-out",
                        view.selectedCategoryId === id &&
                          "scale-105 outline outline-2",
                        view.selectedCategoryId &&
                          view.selectedCategoryId !== id &&
                          "opacity-20",
                        isCategoryDone(state, id)
                          ? "bg-neutral opacity-30"
                          : colorsByPoints[point][0]
                      )}
                      key={id}
                    >
                      <span
                        className={clsx(
                          "rounded-full px-2 text-[1.8vh] normal-case opacity-70",
                          isCategoryDone(state, id)
                            ? "bg-base-200"
                            : colorsByPoints[point][1]
                        )}
                      >
                        {point} pts
                      </span>
                      <span className="flex-center flex-1 text-center text-[min(2.7vh,2vw)] uppercase leading-tight">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </Fragment>
            )
          )}
        </div>
      </div>

      {view.resultsShown && (
        <div className="bg-base-100 fixed left-0 top-0 h-screen w-screen">
          <ResultsMonitor />
        </div>
      )}
    </>
  );
}
