import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useState } from "react";

import { categoriesByPoint, quizzes } from "./libs/config";
import useGame from "./libs/useGame";
import Logo from "./Logo";
import { Point } from "./types";

const colors: Record<Point, string> = {
  10: clsx("bg-sky-600/80 text-white"),
  20: clsx("bg-teal-600/80 text-white"),
  30: clsx("bg-lime-600/80 text-white"),
  40: clsx("bg-orange-600/80 text-white"),
  50: clsx("bg-rose-600/80 text-white"),
};

function Grid() {
  const { startQuiz, isCategoryPlayed, getCurrentTeam } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<number>();

  const currentTeam = getCurrentTeam();

  return (
    <>
      <div className="flex-center h-full flex-col gap-8">
        <div className="grid h-full flex-1 grid-cols-3 grid-rows-2 gap-2">
          {Object.entries(categoriesByPoint).map(
            ([point, categories], index) => (
              <Fragment key={point}>
                <div className="grid grid-cols-2 grid-rows-3 gap-2">
                  {categories.map(({ id, name, point }) => (
                    <div className="relative flex" key={id}>
                      <button
                        className={clsx(
                          "btn flex-center h-full w-full flex-col gap-2 rounded-lg border-0 p-2",
                          colors[point]
                        )}
                        disabled={isCategoryPlayed(id)}
                        key={id}
                        onClick={() => setSelectedCategory(id)}
                      >
                        <span className="badge badge-sm badge-outline text-xs normal-case opacity-30">
                          {point} pts
                        </span>
                        <span className="flex-center flex-1 text-center text-[2.4vh] uppercase leading-tight">
                          {name}
                        </span>
                      </button>
                      {isCategoryPlayed(id) && (
                        <div className="flex-center absolute h-full w-full">
                          <CheckIcon className="text-success h-[10vh]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {index === 0 && (
                  <div className="flex flex-col items-center justify-between">
                    <Logo className="fill-neutral-content h-[15vh]" />

                    <div className="flex-center flex-1">
                      <h3 className="badge badge-primary badge-outline badge-lg px-4 py-6 text-2xl">
                        Équipe{" "}
                        <span className="ml-2 font-bold uppercase">
                          {currentTeam.name}
                        </span>
                      </h3>
                    </div>
                  </div>
                )}
              </Fragment>
            )
          )}
        </div>
      </div>

      <input
        checked={Boolean(selectedCategory)}
        className="modal-toggle"
        id="selectQuizModal"
        onChange={() => setSelectedCategory(undefined)}
        type="checkbox"
      />
      <label
        className={clsx(
          "modal cursor-pointer",
          selectedCategory && "modal-open"
        )}
        htmlFor="selectQuizModal"
      >
        <label className="modal-box relative" htmlFor="">
          <label
            className="btn btn-sm btn-circle absolute right-2 top-2"
            htmlFor="selectQuizModal"
          >
            <XMarkIcon />
          </label>
          <h3 className="mb-8 text-2xl font-bold">Sélectionnez le cantique</h3>
          <div className="flex flex-col gap-2">
            {selectedCategory &&
              quizzes
                .filter((quiz) => quiz.categoryId === selectedCategory)
                .map((quiz) => (
                  <button
                    className="btn btn-primary btn-xl text-xl"
                    key={quiz.id}
                    onClick={() => startQuiz(quiz.id)}
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
