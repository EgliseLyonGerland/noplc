import useGame from "../../libs/useGame";
import useQuiz from "../../libs/useQuiz";

export default function QuizControls() {
  const { addResult } = useGame();
  const { quiz, update, lyricsIndex, answer, status, stopQuiz } = useQuiz();

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
          defaultValue={answer}
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
          onClick={() =>
            update({ status: status === "idle" ? "locked" : "idle" })
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
          onClick={() => update({ status: "success" })}
        >
          Bonne réponse
        </button>
        <button
          className="btn"
          disabled={status === "idle" || status === "fail"}
          onClick={() => update({ status: "fail" })}
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
            addResult(quiz.categoryId, status === "success");
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
