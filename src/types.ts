export type Point = 10 | 20 | 30 | 40 | 50;

export interface Team {
  id: number;
  name: string;
  emoji: string;
}

export interface Category {
  id: number;
  name: string;
  point: Point;
}

export interface Quiz {
  id: number;
  categoryId: number;
  title: string;
  lyrics: string[];
}

export interface Game {
  teams: Team[];
  started: boolean;
  ended: boolean;
  currentCategory: number | null;
  quizzesShown: boolean;
  resultsShown: boolean;
  results: {
    teamId: number;
    categoryId: number;
    success: boolean;
  }[];
}

export type LyricsState = "idle" | "locked" | "success" | "fail";

export interface QuizState {
  quizId: number | null;
  lyricsIndex: number;
  answer: string;
  status: LyricsState;
}
