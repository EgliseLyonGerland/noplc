import clsx from "clsx";
import { Fragment } from "react";

import { categoriesByPoint, quizzes } from "./libs/config";
import useGame from "./libs/useGame";
import Logo from "./Logo";
import Results from "./Results";
import { Point } from "./types";

const colors: Record<Point, string> = {
  10: clsx("bg-sky-600"),
  20: clsx("bg-teal-600"),
  30: clsx("bg-lime-600"),
  40: clsx("bg-orange-600"),
  50: clsx("bg-rose-600"),
};

function Grid() {
  const { game, isCategoryPlayed, getCurrentTeam } = useGame();

  const currentTeam = getCurrentTeam();

  return (
    <>
      <div className="flex-center h-full flex-col gap-8">
        <div className="grid h-full flex-1 grid-cols-3 grid-rows-2 gap-3">
          {Object.entries(categoriesByPoint).map(
            ([point, categories], index) => (
              <Fragment key={point}>
                <div className="grid grid-cols-2 grid-rows-3 gap-3">
                  {categories.map(({ id, name, point }) => (
                    <div className="relative flex" key={id}>
                      <div
                        className={clsx(
                          "flex-center h-full w-full flex-col gap-2 rounded-lg border-0 p-2 text-white",
                          game.currentCategory === id && "outline outline-4",
                          isCategoryPlayed(id)
                            ? "bg-neutral opacity-30"
                            : colors[point]
                        )}
                      >
                        <span className="badge badge-sm badge-outline text-xs normal-case opacity-30">
                          {point} pts
                        </span>
                        <span className="flex-center flex-1 text-center text-[2.4vh] uppercase leading-tight">
                          {name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {index === 0 && (
                  <div className="flex flex-col items-center justify-between">
                    <Logo className="fill-neutral-content h-[15vh]" />

                    {!game.ended && (
                      <div className="flex-center flex-1">
                        <h3 className="badge badge-primary badge-outline badge-lg px-4 py-6 text-2xl">
                          Équipe
                          <span className="ml-2 font-bold uppercase">
                            {currentTeam.name}
                          </span>
                        </h3>
                      </div>
                    )}
                  </div>
                )}
              </Fragment>
            )
          )}
        </div>
      </div>

      {game.resultsShown && (
        <div className="bg-base-100 fixed left-0 top-0 h-screen w-screen">
          <Results />
        </div>
      )}

      <label
        className={clsx(
          "modal cursor-pointer",
          game.currentCategory && "modal-open"
        )}
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="mb-8 text-2xl font-bold">Sélectionnez le cantique</h3>
          <div className="flex flex-col gap-2">
            {game.currentCategory &&
              quizzes
                .filter((quiz) => quiz.categoryId === game.currentCategory)
                .map((quiz) => (
                  <button
                    className="btn btn-primary btn-xl text-xl"
                    key={quiz.id}
                  >
                    {quiz.title}
                  </button>
                ))}
          </div>
        </label>
      </label>
    </>
  );
}

export default Grid;
