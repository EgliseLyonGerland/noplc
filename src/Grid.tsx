import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

import { categories, quizzes } from "./libs/config";
import useGame from "./libs/useGame";
import { Point } from "./types";

const colors: Record<Point, string> = {
  10: clsx("bg-sky-600/80"),
  20: clsx("bg-teal-600/80"),
  30: clsx("bg-lime-600/80"),
  40: clsx("bg-rose-600/80"),
  50: clsx("bg-orange-600/80"),
};

function Grid() {
  const { startQuiz } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<number>();

  return (
    <>
      <div className="grid h-full flex-1 grid-cols-6 grid-rows-5 gap-2">
        {categories.map(({ id, name, point }) => (
          <button
            className={clsx(
              "btn flex-center h-auto rounded-lg p-2 text-center text-[2.6vh] uppercase leading-tight",
              colors[point]
            )}
            key={id}
            onClick={() => setSelectedCategory(id)}
          >
            {name}
          </button>
        ))}
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
