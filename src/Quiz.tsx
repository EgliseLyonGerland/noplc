import Lyrics from "./components/Lyrics";
import useGame from "./libs/useGame";
import useQuiz from "./libs/useQuiz";

function Quiz() {
  const { getCategory } = useGame();
  const { quiz, lyricsIndex, answer, status } = useQuiz();

  if (!quiz) {
    return null;
  }

  const category = getCategory(quiz.categoryId);

  let lyricsItem = "";
  if (lyricsIndex > -1) {
    lyricsItem = quiz.lyrics[lyricsIndex];
  }

  const isLast = lyricsIndex === quiz.lyrics.length - 1;

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

export default Quiz;
