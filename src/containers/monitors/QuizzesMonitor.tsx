import clsx from "clsx";

import Header from "../../components/Header";
import { colorsByPoints, quizzes } from "../../libs/config";
import useGame from "../../libs/useGame";

export default function QuizzesMonitor() {
  const { getCurrentCategory } = useGame();

  const category = getCurrentCategory();

  if (!category) {
    return null;
  }

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
          {quizzes
            .filter((quiz) => quiz.categoryId === category.id)
            .map((quiz) => (
              <div
                className="bg-base-300 text-base-content min-w-[60vw] rounded-xl border p-6 px-12 text-center text-4xl font-bold uppercase"
                key={quiz.id}
              >
                {quiz.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
