import {
  CheckCircleIcon,
  LockClosedIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

import useGame from "./libs/useGame";
import useQuiz from "./libs/useQuiz";

function Quiz() {
  const { getCategory } = useGame();
  const { quiz, lyricsIndex, locked, answer, result } = useQuiz();

  if (!quiz) {
    return null;
  }

  const category = getCategory(quiz.categoryId);

  let lyricsItem: string | null = null;
  if (lyricsIndex > -1) {
    lyricsItem = quiz.lyrics[lyricsIndex];
  }

  const isLast = lyricsIndex === quiz.lyrics.length - 1;

  if (isLast) {
    lyricsItem = answer.trim()
      ? answer
      : lyricsItem
          ?.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\w+/g, "＿＿") || null;
  }

  return (
    <div className="flex h-full w-full max-w-4xl flex-col justify-center gap-4">
      <div className="flex-center bg-base-200 relative w-full flex-col gap-8 rounded-2xl p-6 pb-10">
        <div className="flex gap-2">
          <div className="badge badge-secondary badge-outline badge-lg">
            {category?.name}
          </div>
          <div className="badge badge-outline badge-lg">
            {category?.point} pts
          </div>
        </div>
        <h3 className="text-4xl">{quiz.title}</h3>
      </div>
      <div className="flex-center flex-1">
        {lyricsItem && (
          <div
            className={clsx(
              "flex-center gap-4",
              result === "success"
                ? "border-green-500 text-green-500"
                : result === "fail"
                ? "border-red-500 text-red-500"
                : locked
                ? "border-yellow-300 text-yellow-300"
                : "text-neutral-content border-neutral-content"
            )}
          >
            <div
              className={clsx(
                "rounded-lg border border-inherit px-4 py-2 text-3xl uppercase tracking-wide"
              )}
            >
              {lyricsItem}
            </div>

            {result === "success" ? (
              <CheckCircleIcon className="h-12" />
            ) : result === "fail" ? (
              <XCircleIcon className="h-12" />
            ) : locked ? (
              <LockClosedIcon className="h-12" />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
