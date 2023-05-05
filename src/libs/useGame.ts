import useLocalStorage from "use-local-storage";
import { v4 as uuid } from "uuid";

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
    setData({ ...data, teams: data.teams.filter((team) => team.id !== id) });
  }

  function reset() {
    setData(defaultGame);
  }

  function startQuiz(id: number) {
    setData({ ...data, currentQuizId: id });
  }

  function getCurrentTeam() {
    const lastTeamId = data.results[data.results.length - 1]?.teamId;
    const index = Math.max(
      0,
      data.teams.findIndex((team) => team.id === lastTeamId)
    );

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
    reset,
    start,
    stop,
    addTeam,
    renameTeam,
    removeTeam,
    startQuiz,
    getCurrentQuiz,
    cancelCurrentQuiz,
    endCurrentQuiz,
    getCategory,
    isCategoryPlayed,
  };
}
