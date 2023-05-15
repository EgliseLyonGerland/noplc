import { Suspense, lazy } from "react";

const Controls = lazy(() => import("./containers/Controls"));
const Monitor = lazy(() => import("./containers/Monitor"));

export default function App() {
  return (
    <Suspense>
      {window.location.hash === "#controls" ? <Controls /> : <Monitor />}
    </Suspense>
  );
}
