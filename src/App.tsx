import Grid from "./Grid";
import Setup from "./Setup";
import useGame from "./libs/useGame";

function App() {
  const { game } = useGame();

  return (
    <div className="flex h-screen flex-col items-center gap-12 p-12">
      <h1 className="text-3xl font-bold uppercase">
        N'oubliez pas les cantiques
      </h1>
      <div className="w-full flex-1">{game.started ? <Grid /> : <Setup />}</div>
    </div>
  );
}

export default App;
