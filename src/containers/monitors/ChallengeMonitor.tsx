import clsx from "clsx";
import { motion } from "framer-motion";

import Header from "../../components/Header";
import Lyrics from "../../components/Lyrics";
import { colorsByPoints } from "../../libs/config";
import useAppState from "../../libs/useAppState";
import useData from "../../libs/useData";
import { getCategory, getChallenge } from "../../libs/utils";

const MotionLyrics = motion(Lyrics);

export default function ChallengeMonitor() {
  const { categories, challenges } = useData();
  const state = useAppState();
  const { view } = state;

  if (view.id !== "challenge") {
    return null;
  }

  const { challengeId, lyricsIndex, answer, status } = view;

  const challenge = getChallenge(challenges, challengeId);
  const category = getCategory(categories, challenge.categoryId);

  const { lyrics, mysteryIndex } = challenge;

  let lyricsItem = "";
  if (lyricsIndex > -1) {
    lyricsItem = lyrics[lyricsIndex];
  }

  const isLast = lyricsIndex === lyrics.length - 1;

  const startIndex = lyricsIndex - 2;
  const endIndex = lyricsIndex + 2;

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <Header bgColor={colorsByPoints[category.point][0]}>
        <div className="flex-center flex-col gap-2">
          <div className="flex gap-2">
            <div
              className={clsx(
                "badge badge-lg border-0",
                colorsByPoints[category.point][1]
              )}
            >
              {category.name}
            </div>
            <div
              className={clsx(
                "badge badge-lg border-0",
                colorsByPoints[category.point][1]
              )}
            >
              {category.point} pts
            </div>
          </div>

          <h3 className="text-4xl uppercase">{challenge.title}</h3>
        </div>
      </Header>

      <div className="flex flex-1 flex-col justify-evenly pt-20">
        <div className="flex-center relative w-full">
          {lyrics.map((item, index) => {
            if (index < startIndex || index > endIndex) {
              return;
            }

            const isMystery = index === mysteryIndex;

            return (
              <MotionLyrics
                animate={
                  index === startIndex
                    ? "leave"
                    : index === startIndex + 1
                    ? "prev"
                    : index === endIndex - 1
                    ? "next"
                    : index === endIndex
                    ? "enter"
                    : "current"
                }
                className={clsx(
                  index !== lyricsIndex && "absolute",
                  isMystery && status === "fail" && "line-through"
                )}
                hidden={isMystery && !answer}
                initial={false}
                key={item}
                status={isMystery ? status : "idle"}
                text={
                  isMystery && answer.length > 0 && status !== "success"
                    ? answer
                    : item
                }
                transition={{ ease: "easeOut" }}
                variants={{
                  leave: { y: "-300%", opacity: 0 },
                  prev: { y: "-150%", opacity: isLast ? 0.8 : 0.3 },
                  current: { y: 0, opacity: 1 },
                  next: { y: "150%", opacity: 0 },
                  enter: { y: "300%", opacity: 0 },
                }}
              />
            );
          })}
        </div>

        <MotionLyrics
          animate={
            lyricsIndex === mysteryIndex && status === "fail"
              ? "shown"
              : "hidden"
          }
          initial={false}
          text={lyricsItem}
          variants={{
            shown: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: "-10%" },
          }}
        />
      </div>
    </div>
  );
}
