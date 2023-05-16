import { XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAppState from "../../libs/useAppState";
import useData from "../../libs/useData";
import { getCurrentTeam } from "../../libs/utils";
import { getChallenge } from "../../libs/utils";

const lyricsLineHeight = 1.7;

const formSchema = z.object({
  answer: z.string(),
});

export default function ChallengeControls() {
  const { challenges } = useData();
  const state = useAppState();
  const { view, dispatch } = state;

  const { register, handleSubmit, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: view.id === "challenge" ? view.answer : "",
    },
  });

  if (view.id !== "challenge") {
    return null;
  }

  const { challengeId, lyricsIndex, answer, status } = view;

  const { lyrics } = getChallenge(challenges, challengeId);
  const team = getCurrentTeam(state);

  const quit = () => {
    dispatch({ type: "challenge.stop" });
  };

  const changeLyrics = (step: 1 | -1) => {
    dispatch({
      type: "challengeView.setLyricsIndex",
      index: Math.max(-1, Math.min(lyricsIndex + step, lyrics.length - 1)),
    });
  };

  const isLast = lyricsIndex === lyrics.length - 1;

  let startIndex: number;
  let endIndex: number;

  if (lyricsIndex < lyrics.length - 3) {
    startIndex = Math.max(0, lyricsIndex - 3);
    endIndex = Math.min(startIndex + 6, lyrics.length - 1);
  } else {
    endIndex = Math.min(lyricsIndex + 3, lyrics.length - 1);
    startIndex = Math.max(0, endIndex - 6);
  }

  return (
    <div>
      <div className="mb-4 p-4 ring-1">
        <div
          className="relative overflow-hidden"
          style={{ height: `${lyricsLineHeight * 7}em` }}
        >
          {lyrics.map((line, index) => {
            if (index < startIndex - 1 || index > endIndex + 1) {
              return;
            }

            return (
              <motion.div
                animate={
                  index === startIndex - 1
                    ? "previous"
                    : index === endIndex + 1
                    ? "next"
                    : "shown"
                }
                className={clsx(
                  "absolute uppercase transition-opacity",
                  lyrics.length === index + 1 && "text-primary"
                )}
                initial={false}
                key={index}
                transition={{
                  ease: "easeInOut",
                }}
                variants={{
                  shown: {
                    y: `${(index - startIndex) * lyricsLineHeight}em`,
                    opacity: index === lyricsIndex ? 1 : 0.3,
                  },
                  previous: { y: `${-lyricsLineHeight}em`, opacity: 0 },
                  next: { y: `${7 * lyricsLineHeight}em`, opacity: 0 },
                }}
              >
                {line}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="btn"
          disabled={answer.length > 0 || status !== "idle" || lyricsIndex < 0}
          onClick={() => changeLyrics(-1)}
        >
          Paroles précédentes
        </button>
        <button
          className="btn"
          disabled={answer.length > 0 || status !== "idle" || isLast}
          onClick={() => changeLyrics(+1)}
        >
          Paroles suivantes
        </button>
        <span className="text-xl">
          {lyricsIndex + 1}
          {" / "}
          {lyrics.length}
        </span>
      </div>
      <div className="divider"></div>
      <form
        className="flex items-center gap-4"
        onSubmit={handleSubmit((data) => {
          dispatch({
            type: "challengeView.setAnswer",
            answer: data.answer,
          });
        })}
      >
        <div className="relative flex max-w-xl flex-1 items-center">
          <input hidden type="submit" />

          <input
            {...register("answer")}
            className="input-bordered input-primary input w-full pr-12"
            disabled={!isLast}
            placeholder="Résponse"
          />

          <button
            className="btn-ghost btn-sm btn-circle btn absolute right-2"
            onClick={() => setValue("answer", "")}
          >
            <XMarkIcon />
          </button>
        </div>

        <button className="btn" type="submit">
          OK
        </button>
      </form>
      <div className="divider"></div>
      <div className="flex gap-4">
        <button
          className="btn"
          disabled={!isLast || !answer}
          onClick={() =>
            dispatch({
              type: "challengeView.setStatus",
              status: status === "idle" ? "locked" : "idle",
            })
          }
        >
          {status !== "idle"
            ? "Déverrouiller les paroles"
            : "Verrouiller les paroles"}
        </button>
      </div>
      <div className="divider"></div>
      <div className="flex gap-4">
        <button
          className="btn"
          disabled={status === "idle" || status === "success"}
          onClick={() =>
            dispatch({
              type: "challengeView.setStatus",
              status: "success",
            })
          }
        >
          Bonne réponse
        </button>
        <button
          className="btn"
          disabled={status === "idle" || status === "fail"}
          onClick={() =>
            dispatch({
              type: "challengeView.setStatus",
              status: "fail",
            })
          }
        >
          Mauvaise réponse
        </button>
      </div>
      <div className="divider"></div>
      <div className="flex gap-4">
        <button
          className="btn"
          disabled={status === "idle" || status === "locked"}
          onClick={() => {
            dispatch({
              type: "challenge.save",
              challengeId,
              teamId: team.id,
              status: status === "success" ? "success" : "fail",
            });
            dispatch({ type: "challenge.stop" });
          }}
        >
          Enregistrer et quitter
        </button>
        <button className="btn-error btn" onClick={quit}>
          Quitter
        </button>
      </div>
    </div>
  );
}
