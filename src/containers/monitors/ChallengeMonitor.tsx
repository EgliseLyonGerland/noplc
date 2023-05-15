import clsx from "clsx";

import Header from "../../components/Header";
import Lyrics from "../../components/Lyrics";
import { colorsByPoints } from "../../libs/config";
import useAppState from "../../libs/useAppState";
import useData from "../../libs/useData";
import { getCategory, getChallenge } from "../../libs/utils";

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

  let lyricsItem = "";
  if (lyricsIndex > -1) {
    lyricsItem = challenge.lyrics[lyricsIndex];
  }

  const isLast = lyricsIndex === challenge.lyrics.length - 1;

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
      <div className="flex-center flex-1 flex-col gap-12">
        {lyricsItem && (
          <Lyrics
            hidden={isLast && !answer}
            status={status}
            text={status === "success" ? lyricsItem : answer || lyricsItem}
          />
        )}
        {isLast && status === "fail" && (
          <Lyrics className="scale-[80%] opacity-80" text={lyricsItem} />
        )}
      </div>
    </div>
  );
}
