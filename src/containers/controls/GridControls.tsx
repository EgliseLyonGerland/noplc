import clsx from "clsx";

import { categoriesByPoint, colorsByPoints, quizzes } from "../../libs/config";
import useGame from "../../libs/useGame";
import useQuiz from "../../libs/useQuiz";

export default function GridControls() {
  const { game, set, isCategoryPlayed } = useGame();
  const { startQuiz } = useQuiz();

  return (
    <div>
      <div className="flex flex-1 gap-4">
        <div className="@container flex w-[60%] flex-col gap-2">
          <h2 className="bg-neutral text-neutral-content mb-2 rounded-lg p-2 px-4 text-xl">
            Catégories
          </h2>
          <div className="flex flex-1 flex-col gap-2">
            {Object.values(categoriesByPoint).map((categories) => (
              <div className="@xl:grid-cols-3 grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    className={clsx(
                      "btn h-auto font-normal leading-normal",
                      game.currentCategory === category.id &&
                        "btn-active outline outline-2",
                      colorsByPoints[category.point][0]
                    )}
                    disabled={
                      isCategoryPlayed(category.id) || game.quizzesShown
                    }
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
              <div className="flex flex-1 flex-col gap-4">
                <h2 className="bg-neutral text-neutral-content rounded-lg p-2 px-4 text-xl">
                  Cantiques
                </h2>
                <button
                  className="btn btn-primary"
                  disabled={!game.currentCategory}
                  onClick={() => set({ quizzesShown: !game.quizzesShown })}
                >
                  {game.quizzesShown
                    ? "Masquer les cantiques"
                    : "Afficher les cantiques"}
                </button>
                {game.currentCategory && (
                  <div className="flex flex-1 flex-col gap-2">
                    {quizzes
                      .filter(
                        (quiz) => quiz.categoryId === game.currentCategory
                      )
                      .map((quiz) => (
                        <button
                          className="btn"
                          disabled={!game.quizzesShown}
                          key={quiz.id}
                          onClick={() => startQuiz(quiz.id)}
                        >
                          <span className="line-clamp-1">{quiz.title}</span>
                        </button>
                      ))}
                  </div>
                )}
              </div>
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
