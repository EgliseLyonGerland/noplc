import { Cog8ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";

import useGame from "./libs/useGame";
import Logo from "./Logo";

export default function Controls() {
  const { game, startGame, stopGame, addTeam, removeTeam } = useGame();

  let panel = "teams";

  if (game.started) {
    panel = "grid";
  }

  return (
    <div className="flex flex-col">
      <style>{`
        :root {
          --base-font-size: 18px;
          --base-font-family: sans-serif;
        }
      `}</style>

      <div className="border-neutral flex w-full items-center gap-8 border-b p-2 px-4">
        <Logo className="fill-neutral-content h-8" />
        Centre de contrôle
        <div className="dropdown dropdown-end ml-auto">
          <label className="btn btn-ghost btn-circle m-1" tabIndex={0}>
            <Cog8ToothIcon className="h-6" />
          </label>
          <ul
            className="dropdown-content drpo menu bg-base-200 rounded-box w-52 p-2 text-sm shadow"
            tabIndex={0}
          >
            <li>
              <button onClick={stopGame}>Arrêter le jeu</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        {panel === "teams" && (
          <div className="flex flex-col gap-8">
            <div className="overflow-x-auto">
              <table className="table-zebra table w-full">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th className="w-full">Nom</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {game.teams.map((team) => (
                    <tr key={team.id}>
                      <th>{team.id}</th>
                      <td>{team.name}</td>
                      <td>
                        <button
                          className="btn btn-circle btn-ghost btn-sm"
                          onClick={() => removeTeam(team.id)}
                        >
                          <XMarkIcon className="h-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();

                const formData = new FormData(event.currentTarget);
                addTeam(formData.get("name") as string);
                event.currentTarget.reset();
              }}
            >
              <input
                className="input input-bordered input-primary w-full max-w-xs"
                name="name"
                placeholder="Nom de l'équipe"
                type="text"
              />
            </form>
            <div className="divider"></div>
            <div>
              <button className="btn btn-primary" onClick={startGame}>
                Démarrer le jeu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
