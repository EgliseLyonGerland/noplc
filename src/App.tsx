import { FC } from "react";

import Controls from "./Controls";
import Grid from "./Grid";
import useGame from "./libs/useGame";
import useQuiz from "./libs/useQuiz";
import Quiz from "./Quiz";
import Teams from "./Teams";

function App() {
  const { game } = useGame();
  const { quiz } = useQuiz();

  if (window.location.href.includes("/controls")) {
    return <Controls />;
  }

  let Content: FC = Teams;
  if (game.started) {
    if (quiz) {
      Content = Quiz;
    } else {
      Content = Grid;
    }
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center gap-6 p-6">
        <Content />
      </div>
    </>
  );
}

export default App;
