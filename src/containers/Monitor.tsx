import { FC } from "react";

import CategoriesMonitor from "./monitors/CategoriesMonitor";
import ChallengeMonitor from "./monitors/ChallengeMonitor";
import ChallengesMonitor from "./monitors/ChallengesMonitor";
import TeamsMonitor from "./monitors/TeamsMonitor";
import useAppState from "../libs/useAppState";

function NoContent() {
  return <div>NO CONTENT...</div>;
}

export default function Monitor() {
  const { view } = useAppState();

  let Content: FC = NoContent;
  switch (view.id) {
    case "teams":
      Content = TeamsMonitor;
      break;
    case "categories":
      Content = view.challengesShown ? ChallengesMonitor : CategoriesMonitor;
      break;
    case "challenge":
      Content = ChallengeMonitor;
  }

  return (
    <div className="flex h-screen flex-col items-center gap-6 p-6">
      <Content />
    </div>
  );
}
