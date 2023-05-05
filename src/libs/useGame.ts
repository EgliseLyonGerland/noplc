import useLocalStorageState from "use-local-storage-state";

import { categories, quizzes } from "./config";
import { Game } from "../types";

const defaultGame: Game = {
  teams: [],
  results: [],
  started: false,
  ended: false,
  currentQuizId: null,
};

export default function useGame() {
  const [data, setData] = useLocalStorageState<Game>("game", {
    defaultValue: defaultGame,
  });

  function startGame() {
    if (data.teams.length < 2) {
      return;
    }

    setData({ ...data, started: true });
  }

  function stopGame() {
    setData({
      ...data,
      started: false,
      ended: false,
      currentQuizId: null,
      results: [],
    });
  }

  function addTeam(name: string) {
    setData({
      ...data,
      teams: data.teams.concat({ id: data.teams.length + 1, name }),
    });
  }

  function renameTeam(id: number, name: string) {
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

  function removeTeam(id: number) {
    setData({ ...data, teams: data.teams.filter((team) => team.id !== id) });
  }

  function resetGame() {
    setData(defaultGame);
  }

  function startQuiz(id: number) {
    setData({ ...data, currentQuizId: id });
  }

  function getCurrentTeam() {
    const lastTeamId = data.results[data.results.length - 1]?.teamId;
    let index = data.teams.findIndex((team) => team.id === lastTeamId) + 1;

    if (index === data.teams.length) {
      index = 0;
    }

    return data.teams[index];
  }

  function getCurrentQuiz() {
    return quizzes.find((quiz) => quiz.id === data.currentQuizId);
  }

  function cancelCurrentQuiz() {
    setData({ ...data, currentQuizId: null });
  }

  function endCurrentQuiz(success: boolean) {
    const currentQuiz = getCurrentQuiz();

    if (!currentQuiz) {
      return;
    }

    setData({
      ...data,
      results: data.results.concat({
        teamId: getCurrentTeam().id,
        categoryId: currentQuiz.categoryId,
        success,
      }),
      currentQuizId: null,
    });
  }

  function getCategory(id: number) {
    return categories.find((category) => category.id === id);
  }

  function isCategoryPlayed(id: number) {
    return Boolean(data.results.find((result) => result.categoryId === id));
  }

  return {
    game: data,
    resetGame,
    startGame,
    stopGame,

    addTeam,
    renameTeam,
    removeTeam,
    getCurrentTeam,

    startQuiz,
    getCurrentQuiz,
    cancelCurrentQuiz,
    endCurrentQuiz,

    getCategory,
    isCategoryPlayed,
  };
}
