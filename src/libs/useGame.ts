import useLocalStorageState from "use-local-storage-state";

import { categories } from "./config";
import { Game } from "../types";

const defaultGame: Game = {
  teams: [],
  results: [],
  started: false,
  ended: false,
  currentCategory: null,
  quizzesShown: false,
  resultsShown: false,
};

export default function useGame() {
  const [data, setData] = useLocalStorageState<Game>("game", {
    defaultValue: defaultGame,
  });

  function set(newData: Partial<Game>) {
    setData({ ...data, ...newData });
  }

  function startGame() {
    if (data.teams.length < 2) {
      return;
    }

    set({ started: true });
  }

  function stopGame() {
    set({ started: false, ended: false, results: [] });
  }

  function addTeam(name: string, emoji: string) {
    set({
      teams: data.teams.concat({ id: data.teams.length + 1, name, emoji }),
    });
  }

  function renameTeam(id: number, name: string) {
    set({
      teams: data.teams.map((team) => {
        if (team.id === id) {
          team.name = name;
        }

        return team;
      }),
    });
  }

  function removeTeam(id: number) {
    set({ teams: data.teams.filter((team) => team.id !== id) });
  }

  function resetGame() {
    setData(defaultGame);
  }

  function getCurrentTeam() {
    const lastTeamId = data.results[data.results.length - 1]?.teamId;
    let index = data.teams.findIndex((team) => team.id === lastTeamId) + 1;

    if (index === data.teams.length) {
      index = 0;
    }

    return data.teams[index];
  }

  function addResult(categoryId: number, success: boolean) {
    if (data.results.find((result) => result.categoryId === categoryId)) {
      return;
    }

    const teamId = getCurrentTeam().id;
    const results = data.results.concat({ teamId, categoryId, success });
    const ended = results.length === categories.length;

    set({ results, ended });
  }

  function getCategory(id: number) {
    return categories.find((category) => category.id === id);
  }

  function getCurrentCategory() {
    if (!data.currentCategory) {
      return;
    }

    return getCategory(data.currentCategory);
  }

  function isCategoryPlayed(id: number) {
    return Boolean(data.results.find((result) => result.categoryId === id));
  }

  return {
    game: data,

    set,

    resetGame,
    startGame,
    stopGame,

    addTeam,
    renameTeam,
    removeTeam,

    addResult,
    isCategoryPlayed,

    getCategory,
    getCurrentTeam,
    getCurrentCategory,
  };
}
