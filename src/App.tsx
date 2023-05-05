import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

import Grid from "./Grid";
import useGame from "./libs/useGame";
import useQuiz from "./libs/useQuiz";
import Quiz from "./Quiz";
import Setup from "./Setup";

function App() {
  const { game, stopGame } = useGame();
  const { quiz } = useQuiz();

  let Content: FC = Setup;
  if (game.started) {
    if (quiz) {
      Content = Quiz;
    } else {
      Content = Grid;
    }
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center gap-6 p-6 pb-16">
        <Content />
      </div>

      {game.started && (
        <div className="dropdown dropdown-top dropdown-end fixed bottom-2 right-2">
          <label
            className="btn btn-ghost btn-circle m-1 opacity-10 hover:opacity-60"
            tabIndex={0}
          >
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
      )}
    </>
  );
}

export default App;
