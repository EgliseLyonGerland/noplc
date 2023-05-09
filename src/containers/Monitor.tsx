import { FC } from "react";

import GridMonitor from "./monitors/GridMonitor";
import QuizMonitor from "./monitors/QuizMonitor";
import TeamsMonitor from "./monitors/TeamsMonitor";
import useGame from "../libs/useGame";
import useQuiz from "../libs/useQuiz";

export default function Monitor() {
  const { game } = useGame();
  const { quiz } = useQuiz();

  let Content: FC = TeamsMonitor;
  if (game.started) {
    if (quiz) {
      Content = QuizMonitor;
    } else {
      Content = GridMonitor;
    }
  }

  return (
    <div className="flex h-screen flex-col items-center gap-6 p-6">
      <Content />
    </div>
  );
}
