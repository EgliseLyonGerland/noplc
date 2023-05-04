import Grid from "./Grid";
import useGame from "./libs/useGame";
import Quiz from "./Quiz";
import Setup from "./Setup";

function App() {
  const { game } = useGame();

  let Content = Setup;
  if (game.started) {
    if (game.currentQuizId) {
      Content = Quiz;
    } else {
      Content = Grid;
    }
  }

  return (
    <div className="flex h-screen flex-col items-center gap-12 p-12">
      <h1 className="text-3xl font-bold uppercase">
        N'oubliez pas les cantiques
      </h1>
      <div className="w-full flex-1">
        <Content />
      </div>
    </div>
  );
}

export default App;
