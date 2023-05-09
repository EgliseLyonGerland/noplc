import Controls from "./containers/Controls";
import Monitor from "./containers/Monitor";

function App() {
  if (window.location.hash === "#controls") {
    return <Controls />;
  }

  return <Monitor />;
}

export default App;
