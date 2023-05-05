export type Point = 10 | 20 | 30 | 40 | 50;

export interface Team {
  id: string;
  name: string;
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
  currentQuizId: number | null;
  results: {
    teamId: string;
    categoryId: number;
    success: boolean;
  }[];
}
