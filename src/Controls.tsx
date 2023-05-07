import { Cog8ToothIcon } from "@heroicons/react/24/outline";

import GridPanel from "./Controls/GridPanel";
import TeamsPanel from "./Controls/TeamsPanel";
import useGame from "./libs/useGame";
import useQuiz from "./libs/useQuiz";
import Logo from "./Logo";

export default function Controls() {
  const { game, stopGame } = useGame();
  const { quiz } = useQuiz();

  let panel = "teams";

  if (game.started) {
    if (quiz) {
      panel = "quiz";
    } else {
      panel = "grid";
    }
  }

  return (
    <div className="flex flex-col">
      <style>{`
        :root {
          --base-font-size: 18px;
          --base-font-family: sans-serif;
        }
      `}</style>

      <div className="border-neutral flex w-full items-center gap-8 border-b p-2 px-4">
        <Logo className="fill-neutral-content h-8" />
        Centre de contrôle
        <div className="dropdown dropdown-end ml-auto">
          <label className="btn btn-ghost btn-circle m-1" tabIndex={0}>
            <Cog8ToothIcon className="h-6" />
          </label>
          <ul
            className="dropdown-content drpo menu bg-base-200 rounded-box w-52 p-2 text-sm shadow"
            tabIndex={0}
          >
            <li>
              <button onClick={stopGame}>Arrêter le jeu</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        {panel === "teams" ? (
          <TeamsPanel />
        ) : panel === "grid" ? (
          <GridPanel />
        ) : null}
      </div>
    </div>
  );
}
