import Controls from "./containers/Controls";
import Monitor from "./containers/Monitor";

export default function App() {
  if (window.location.hash === "#controls") {
    return <Controls />;
  }

  return <Monitor />;
}
