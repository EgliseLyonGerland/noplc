import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

import useGame from "./libs/useGame";

function Setup() {
  const { game, start, addTeam, renameTeam, removeTeam, reset } = useGame();

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid w-80 grid-flow-row-dense grid-cols-5 gap-2">
        {game.teams.concat({ id: "", name: "" }).map((team, index) => (
          <Fragment key={`row-${index}`}>
            <input
              className="input input-bordered input-primary col-span-4 w-full"
              key={`input-${index}`}
              onChange={(event) => {
                if (team.id) {
                  renameTeam(team.id, event.target.value);
                } else {
                  addTeam(event.target.value);
                }
              }}
              placeholder="Ajouter une équipe"
              type="text"
              value={team.name}
            />
            <button
              className="btn btn-ghost btn-circle"
              disabled={!team.id}
              onClick={() => {
                removeTeam(team.id);
              }}
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
          </Fragment>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="btn btn-ghost" onClick={reset}>
          Reset
        </button>
        <button
          className="btn btn-primary"
          disabled={game.teams.length < 2}
          onClick={start}
        >
          Démarrer le jeu
        </button>
      </div>
    </div>
  );
}

export default Setup;
