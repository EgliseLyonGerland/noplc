import useLocalStorageState from "use-local-storage-state";

import { quizzes } from "./config";

interface QuizState {
  quizId: number | null;
  lyricsIndex: number;
  locked: boolean;
  answer: string;
  result: "success" | "fail" | "idle";
}

const defaultState: QuizState = {
  quizId: null,
  lyricsIndex: -1,
  locked: false,
  answer: "",
  result: "idle",
};

export default function useQuiz() {
  const [state, setState] = useLocalStorageState<QuizState>("currentQuiz", {
    defaultValue: defaultState,
  });

  const quiz = quizzes.find((quiz) => quiz.id === state?.quizId);

  const startQuiz = (id: number) => {
    setState({
      quizId: id,
      lyricsIndex: -1,
      locked: false,
      answer: "",
      result: "idle",
    });
  };

  const stopQuiz = () => {
    setState(defaultState);
  };

  const update = (data: Partial<QuizState>) => {
    setState({ ...state, ...data });
  };

  return {
    ...state,
    update,
    quiz,
    startQuiz,
    stopQuiz,
  };
}
