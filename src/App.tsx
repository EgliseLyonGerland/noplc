import { FC } from "react";

import Grid from "./Grid";
import useGame from "./libs/useGame";
import Logo from "./Logo";
import Quiz from "./Quiz";
import Setup from "./Setup";

function App() {
  const { game } = useGame();

  let Content: FC = Setup;
  if (game.started) {
    if (game.currentQuizId) {
      Content = Quiz;
    } else {
      Content = Grid;
    }
  }

  return (
    <div className="flex h-screen flex-col items-center gap-10 p-6">
      <Logo className="fill-neutral-content h-[15vh]" />
      <div className="w-full flex-1">
        <Content />
      </div>
    </div>
  );
}

export default App;
