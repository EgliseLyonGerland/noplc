import clsx from "clsx";

import {
  categoriesByPoint,
  colorsByPoints,
  challenges,
} from "../../libs/config";
import useAppState from "../../libs/useAppState";
import { isCategoryDone } from "../../libs/utils";

export default function CategoriesControls() {
  const state = useAppState();
  const { view, dispatch } = state;

  if (view.id !== "categories") {
    return null;
  }

  return (
    <div>
      <div className="flex flex-1 gap-4">
        <div className="@container flex w-[60%] flex-col gap-2">
          <h2 className="bg-neutral text-neutral-content mb-2 rounded-lg p-2 px-4 text-xl">
            Catégories
          </h2>
          <div className="flex flex-1 flex-col gap-2">
            {Object.entries(categoriesByPoint).map(([point, categories]) => (
              <div
                className="@xl:grid-cols-3 grid grid-cols-2 gap-2"
                key={point}
              >
                {categories.map((category) => (
                  <button
                    className={clsx(
                      "btn h-auto font-normal leading-normal",
                      view.selectedCategoryId === category.id &&
                        "btn-active outline outline-2",
                      colorsByPoints[category.point][0]
                    )}
                    disabled={
                      isCategoryDone(state, category.id) || view.challengesShown
                    }
                    key={category.id}
                    onClick={() =>
                      dispatch({
                        type: "categoriesView.selectCategory",
                        categoryId:
                          view.selectedCategoryId === category.id
                            ? null
                            : category.id,
                      })
                    }
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

                {view.selectedCategoryId && (
                  <div className="flex flex-1 flex-col gap-2">
                    {challenges
                      .filter(
                        (challenge) =>
                          challenge.categoryId === view.selectedCategoryId
                      )
                      .map((challenge) => (
                        <button
                          className={clsx(
                            "btn",
                            view.selectedChallengeId === challenge.id &&
                              "btn-active outline outline-2"
                          )}
                          disabled={
                            !view.challengesShown ||
                            (view.selectedChallengeId !== null &&
                              view.selectedChallengeId !== challenge.id)
                          }
                          key={challenge.id}
                          onClick={() => {
                            dispatch({
                              type: "categoriesView.selectChallenge",
                              challengeId:
                                view.selectedChallengeId === challenge.id
                                  ? null
                                  : challenge.id,
                            });
                          }}
                        >
                          <span className="line-clamp-1">
                            {challenge.title}
                          </span>
                        </button>
                      ))}
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-2">
                  <button
                    className="btn btn-primary"
                    disabled={!view.selectedCategoryId}
                    onClick={() =>
                      dispatch({
                        type: "categoriesView.showChallenges",
                        isShown: !view.challengesShown,
                      })
                    }
                  >
                    {view.challengesShown
                      ? "Masquer les cantiques"
                      : "Afficher les cantiques"}
                  </button>
                  <button
                    className="btn btn-primary"
                    disabled={!view.selectedChallengeId}
                    onClick={() => {
                      if (view.selectedChallengeId) {
                        dispatch({
                          type: "challenge.start",
                          challengeId: view.selectedChallengeId,
                        });
                      }
                    }}
                  >
                    Lancer le challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>

      <button
        className="btn btn-primary"
        onClick={() =>
          dispatch({
            type: "categoriesView.showResults",
            isShown: !view.resultsShown,
          })
        }
      >
        {view.resultsShown ? "Masquer les résultats" : "Afficher les résultats"}
      </button>
    </div>
  );
}
