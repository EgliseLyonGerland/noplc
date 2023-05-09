import clsx from "clsx";

import {
  categoriesByPoint,
  colorsByCategories,
  quizzes,
} from "../../libs/config";
import useGame from "../../libs/useGame";
import useQuiz from "../../libs/useQuiz";

export default function GridControls() {
  const { game, set, isCategoryPlayed } = useGame();
  const { startQuiz } = useQuiz();

  return (
    <div>
      <div className="flex flex-1 gap-4">
        <div className="@container flex flex-1 flex-col gap-2">
          <h2 className="bg-neutral text-neutral-content mb-2 rounded-lg p-2 px-4 text-xl">
            Catégories
          </h2>
          <div className="flex flex-col gap-2">
            {Object.values(categoriesByPoint).map((categories) => (
              <div className="@xl:grid-cols-3 grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    className={clsx(
                      "btn h-auto font-normal leading-normal",
                      game.currentCategory === category.id &&
                        "btn-active outline outline-2",
                      colorsByCategories[category.point][0]
                    )}
                    disabled={isCategoryPlayed(category.id)}
                    key={category.id}
                    onClick={() => {
                      set({
                        resultsShown: false,
                        currentCategory:
                          game.currentCategory === category.id
                            ? null
                            : category.id,
                      });
                    }}
                  >
                    <span className="line-clamp-1">
                      {category.point} - {category.name}
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-lg flex-1">
          <div className="sticky top-4">
            <div className="flex gap-4">
              {game.currentCategory && (
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="bg-neutral text-neutral-content mb-2 rounded-lg p-2 px-4 text-xl">
                    Cantiques
                  </h2>
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
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>

      <button
        className="btn btn-primary"
        onClick={() => {
          set({ currentCategory: null, resultsShown: !game.resultsShown });
        }}
      >
        {game.resultsShown ? "Masquer les résultats" : "Afficher les résultats"}
      </button>
    </div>
  );
}
