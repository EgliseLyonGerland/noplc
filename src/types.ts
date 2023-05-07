export type Point = 10 | 20 | 30 | 40 | 50;

export interface Team {
  id: number;
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
  currentCategory: number | null;
  resultsShown: boolean;
  results: {
    teamId: number;
    categoryId: number;
    success: boolean;
  }[];
}
