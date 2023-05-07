import useGame from "../libs/useGame";
import useQuiz from "../libs/useQuiz";

export default function QuizPanel() {
  const { addResult } = useGame();
  const { quiz, update, lyricsIndex, locked, answer, result, stopQuiz } =
    useQuiz();

  if (!quiz) {
    return null;
  }

  const changeLyrics = (step: 1 | -1) => {
    update({
      lyricsIndex: Math.max(
        -1,
        Math.min(lyricsIndex + step, quiz?.lyrics.length - 1)
      ),
    });
  };

  const isLast = lyricsIndex === quiz.lyrics.length - 1;

  return (
    <div>
      <div className="flex gap-4">
        <button
          className="btn"
          disabled={lyricsIndex < 0}
          onClick={() => changeLyrics(-1)}
        >
          Paroles précédentes
        </button>
        <button
          className="btn"
          disabled={isLast}
          onClick={() => changeLyrics(+1)}
        >
          Paroles suivantes
        </button>
      </div>
      <div className="divider"></div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          update({ answer: formData.get("name") as string });
        }}
      >
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          disabled={!isLast}
          name="name"
          placeholder="Résponse"
          type="text"
        />
      </form>
      <div className="divider"></div>
      <div className="flex gap-4">
        <button
          className="btn"
          disabled={!isLast || !answer}
          onClick={() => update({ locked: !locked, result: "idle" })}
        >
          {locked ? "Déverrouiller les paroles" : "Verrouiller les paroles"}
        </button>
      </div>
      <div className="divider"></div>
      <div className="flex gap-4">
        <button
          className="btn"
          disabled={!isLast || !answer || !locked}
          onClick={() => update({ result: "success" })}
        >
          Bonne réponse
        </button>
        <button
          className="btn"
          disabled={!isLast || !answer || !locked}
          onClick={() => update({ result: "fail" })}
        >
          Mauvaise réponse
        </button>
      </div>
      <div className="divider"></div>
      <div className="flex gap-4">
        <button
          className="btn"
          disabled={result === "idle"}
          onClick={() => {
            addResult(quiz.categoryId, result === "success");
            stopQuiz();
          }}
        >
          Enregistrer et quitter
        </button>
        <button className="btn btn-error" onClick={() => stopQuiz()}>
          Quitter
        </button>
      </div>
    </div>
  );
}
