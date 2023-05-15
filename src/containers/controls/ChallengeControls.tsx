import useAppState from "../../libs/useAppState";
import useData from "../../libs/useData";
import { getCurrentTeam } from "../../libs/utils";
import { getChallenge } from "../../libs/utils";

export default function ChallengeControls() {
  const { challenges } = useData();
  const state = useAppState();
  const { view, dispatch } = state;

  if (view.id !== "challenge") {
    return null;
  }

  const { challengeId, lyricsIndex, answer, status } = view;

  const challenge = getChallenge(challenges, challengeId);
  const team = getCurrentTeam(state);

  const quit = () => {
    dispatch({ type: "challenge.stop" });
  };

  const changeLyrics = (step: 1 | -1) => {
    dispatch({
      type: "challengeView.setLyricsIndex",
      index: Math.max(
        -1,
        Math.min(lyricsIndex + step, challenge.lyrics.length - 1)
      ),
    });
  };

  const isLast = lyricsIndex === challenge.lyrics.length - 1;

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
          dispatch({
            type: "challengeView.setAnswer",
            answer: formData.get("name") as string,
          });
        }}
      >
        <input
          className="input-bordered input-primary input w-full max-w-xs"
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
