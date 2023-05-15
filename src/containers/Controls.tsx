import { Cog8ToothIcon } from "@heroicons/react/24/outline";

import CategoriesControls from "./controls/CategoriesControls";
import ChallengeControls from "./controls/ChallengeControls";
import TeamsControls from "./controls/TeamsControls";
import Logo from "../components/Logo";
import useAppState from "../libs/useAppState";

export default function Controls() {
  const { view, dispatch } = useAppState();

  return (
    <div className="flex flex-col">
      <style>{`
        :root {
          --base-font-size: 18px;
          --base-font-family: sans-serif;
        }
      `}</style>

      <div className="flex w-full items-center gap-8 border-b border-neutral p-2 px-4">
        <Logo className="h-8 fill-neutral-content" />
        Centre de contrôle
        <div className="dropdown-end dropdown ml-auto">
          <label className="btn-ghost btn-circle btn m-1" tabIndex={0}>
            <Cog8ToothIcon className="h-6" />
          </label>
          <ul
            className="drpo dropdown-content menu rounded-box w-52 bg-base-200 p-2 text-sm shadow"
            tabIndex={0}
          >
            <li>
              <button onClick={() => dispatch({ type: "game.stop" })}>
                Arrêter le jeu
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        {view.id === "teams" ? (
          <TeamsControls />
        ) : view.id === "categories" ? (
          <CategoriesControls />
        ) : (
          <ChallengeControls />
        )}
      </div>
    </div>
  );
}
