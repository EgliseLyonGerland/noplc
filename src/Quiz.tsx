import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import useGame from "./libs/useGame";
import useQuiz from "./libs/useQuiz";

function Quiz() {
  const { getCategory, addResult } = useGame();
  const { quiz, update, lyricsIndex, locked, answer, result, stopQuiz } =
    useQuiz();
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys(
    "space",
    () => {
      if (!quiz) {
        return;
      }
      if (lyricsIndex >= quiz.lyrics.length - 1) {
        inputRef.current?.focus();
        return;
      }

      update({ lyricsIndex: lyricsIndex + 1 });
    },
    [quiz, lyricsIndex]
  );

  useHotkeys(
    "y",
    () => {
      if (locked) {
        update({ result: "success" });
      }
    },
    [locked]
  );
  useHotkeys(
    "n",
    () => {
      if (locked) {
        update({ result: "fail" });
      }
    },
    [locked]
  );
  useHotkeys(
    "enter",
    () => {
      if (quiz && locked && result) {
        addResult(quiz.categoryId, result === "success");
        stopQuiz();
      }
    },
    [quiz, locked, result]
  );

  useEffect(() => {
    if (quiz && lyricsIndex >= quiz.lyrics.length - 1) {
      inputRef.current?.focus();
    }
  }, [lyricsIndex, quiz]);

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
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 opacity-10 hover:opacity-50"
          onClick={stopQuiz}
        >
          <XMarkIcon className="h-8" />
        </button>
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

            {result === "success" && <CheckCircleIcon className="h-12" />}
            {result === "fail" && <XCircleIcon className="h-12" />}
          </div>
        )}
      </div>

      <form
        className="fixed -bottom-10"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          update({ locked: true });
        }}
      >
        <input
          disabled={locked}
          onChange={(event) => update({ answer: event.target.value })}
          ref={inputRef}
          type="text"
          value={answer}
        />
      </form>
    </div>
  );
}

export default Quiz;
