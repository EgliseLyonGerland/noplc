import { shuffle } from "lodash-es";
import useLocalStorageState from "use-local-storage-state";

import {
  categoriesViewSchema,
  challengeViewSchema,
  stateSchema,
  teamsViewSchema,
} from "./schemas";
import {
  Category,
  Challenge,
  ChallengeStatus,
  RoundStatus,
  State,
  Team,
} from "./types";

type Action =
  | {
      type: "teams.add";
      name: Team["name"];
      emoji: Team["emoji"];
    }
  | {
      type: "teams.delete";
      id: Team["id"];
    }
  | {
      type: "teams.shuffle";
    }
  | {
      type: "game.start";
    }
  | {
      type: "game.stop";
    }
  | {
      type: "challenge.start";
      challengeId: Challenge["id"];
    }
  | {
      type: "challenge.stop";
    }
  | {
      type: "challenge.save";
      challengeId: number;
      teamId: number;
      status: RoundStatus;
    }
  | {
      type: "categoriesView.selectCategory";
      categoryId: Category["id"] | null;
    }
  | {
      type: "categoriesView.selectChallenge";
      challengeId: Challenge["id"] | null;
    }
  | {
      type: "categoriesView.showChallenges";
      isShown: boolean;
    }
  | {
      type: "categoriesView.showResults";
      isShown: boolean;
    }
  | {
      type: "categoriesView.showRankings";
      isShown: boolean;
    }
  | {
      type: "challengeView.setLyricsIndex";
      index: number;
    }
  | {
      type: "challengeView.setAnswer";
      answer: string;
    }
  | {
      type: "challengeView.setStatus";
      status: ChallengeStatus;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "teams.add":
      return {
        ...state,
        teams: state.teams.concat({
          id: state.teams.length + 1,
          name: action.name,
          emoji: action.emoji,
        }),
      };
    case "teams.delete":
      return {
        ...state,
        teams: state.teams.filter((team) => team.id !== action.id),
      };
    case "teams.shuffle":
      return {
        ...state,
        teams: shuffle(state.teams),
      };

    case "game.start":
      return state.teams.length >= 2
        ? {
            ...state,
            view: categoriesViewSchema.parse({}),
          }
        : state;

    case "game.stop":
      return {
        ...state,
        rounds: [],
        view: teamsViewSchema.parse({}),
      };

    case "challenge.start":
      return {
        ...state,
        view: challengeViewSchema.parse({
          challengeId: action.challengeId,
        }),
      };

    case "challenge.stop":
      return {
        ...state,
        view: categoriesViewSchema.parse({}),
      };

    case "challenge.save":
      return {
        ...state,
        rounds: state.rounds.concat({
          challengeId: action.challengeId,
          teamId: action.teamId,
          status: action.status,
        }),
      };

    case "categoriesView.selectCategory":
      return {
        ...state,
        view: categoriesViewSchema.parse({
          ...state.view,
          selectedCategoryId: action.categoryId,
        }),
      };
    case "categoriesView.selectChallenge":
      return {
        ...state,
        view: categoriesViewSchema.parse({
          ...state.view,
          selectedChallengeId: action.challengeId,
        }),
      };
    case "categoriesView.showChallenges":
      return {
        ...state,
        view: categoriesViewSchema.parse({
          ...state.view,
          challengesShown: action.isShown,
          selectedChallengeId: null,
        }),
      };
    case "categoriesView.showResults":
      return {
        ...state,
        view: categoriesViewSchema.parse({
          ...state.view,
          resultsShown: action.isShown,
          rankingsShown: false,
          challengesShown: false,
        }),
      };
    case "categoriesView.showRankings":
      return {
        ...state,
        view: categoriesViewSchema.parse({
          ...state.view,
          rankingsShown: action.isShown,
        }),
      };

    case "challengeView.setLyricsIndex":
      return {
        ...state,
        view: challengeViewSchema.parse({
          ...state.view,
          lyricsIndex: action.index,
        }),
      };

    case "challengeView.setAnswer":
      return {
        ...state,
        view: challengeViewSchema.parse({
          ...state.view,
          answer: action.answer,
        }),
      };

    case "challengeView.setStatus":
      return {
        ...state,
        view: challengeViewSchema.parse({
          ...state.view,
          status: action.status,
        }),
      };

    default:
      return state;
  }
}

export default function useAppState() {
  const [state, setState] = useLocalStorageState<State>("state", {
    defaultValue: stateSchema.parse({}),
  });

  function dispatch(action: Action) {
    setState((prevState) => reducer(prevState, action));
  }

  return { ...state, dispatch };
}
