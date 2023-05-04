import useLocalStorage from "use-local-storage";
import { v4 as uuid } from "uuid";

import { Game } from "../types";

const defaultGame: Game = {
  teams: [],
  grid: [],
  started: false,
  ended: false,
  currentQuizId: null,
};

export default function useGame() {
  const [data, setData] = useLocalStorage<Game>("game", defaultGame, {
    serializer: (entry) => {
      return JSON.stringify(entry);
    },
    parser: (entry) => {
      let game = {};

      try {
        game = JSON.parse(entry);
      } catch (e) {
        // nothing
      }

      return { ...defaultGame, ...game };
    },
    logger: console.log,
  });

  function start() {
    if (data.teams.length < 2) {
      return;
    }

    setData({ ...data, started: true });
  }

  function stop() {
    setData({ ...data, started: false });
  }

  function addTeam(name: string) {
    setData({ ...data, teams: data.teams.concat({ id: uuid(), name }) });
  }

  function renameTeam(id: string, name: string) {
    setData({
      ...data,
      teams: data.teams.map((team) => {
        if (team.id === id) {
          team.name = name;
        }

        return team;
      }),
    });
  }

  function removeTeam(id: string) {
    setData({
      ...data,
      teams: data.teams.filter((team) => team.id !== id),
    });
  }

  function reset() {
    setData(defaultGame);
  }

  function startQuiz(id: number) {
    setData({
      ...data,
      currentQuizId: id,
    });
  }

  return {
    game: data,
    reset,
    start,
    stop,
    addTeam,
    renameTeam,
    removeTeam,
    startQuiz,
  };
}
