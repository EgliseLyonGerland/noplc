import clsx from "clsx";

import { categories, quizzes } from "../libs/config";
import useGame from "../libs/useGame";
import useQuiz from "../libs/useQuiz";

export default function GridPanel() {
  const { game, set, isCategoryPlayed } = useGame();
  const { startQuiz } = useQuiz();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="bg-neutral text-neutral-content rounded-lg p-2 px-4 text-xl">
        Catégories
      </h2>

      <div className="grid grid-cols-4 gap-2 lg:grid-cols-6">
        {categories.map((category) => (
          <button
            className={clsx(
              "btn h-auto font-normal normal-case leading-normal",
              game.currentCategory === category.id &&
                "btn-active outline outline-1"
            )}
            disabled={isCategoryPlayed(category.id)}
            key={category.id}
            onClick={() => {
              set({
                resultsShown: false,
                currentCategory:
                  game.currentCategory === category.id ? null : category.id,
              });
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {game.currentCategory && (
        <>
          <div className="divider"></div>
          <h2 className="bg-neutral text-neutral-content rounded-lg p-2 px-4 text-xl">
            Cantiques
          </h2>
          <div className="flex gap-4">
            {quizzes
              .filter((quiz) => quiz.categoryId === game.currentCategory)
              .map((quiz) => (
                <button
                  className="btn"
                  key={quiz.id}
                  onClick={() => {
                    set({ currentCategory: null });
                    startQuiz(quiz.id);
                  }}
                >
                  {quiz.title}
                </button>
              ))}
          </div>
        </>
      )}

      <div className="divider"></div>
      <div className="flex gap-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            set({ currentCategory: null, resultsShown: !game.resultsShown });
          }}
        >
          {game.resultsShown
            ? "Masquer les résultats"
            : "Afficher les résultats"}
        </button>
      </div>
    </div>
  );
}
