import { XMarkIcon } from "@heroicons/react/24/outline";

import useGame from "../libs/useGame";

export default function TeamsPanel() {
  const { game, startGame, addTeam, removeTeam } = useGame();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="bg-neutral text-neutral-content rounded-lg p-2 px-4 text-xl">
        Équipes
      </h2>

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
  );
}
