export type Point = 10 | 20 | 30 | 40 | 50;

export interface Team {
  id: string;
  name: string;
}

export interface Quiz {
  id: number;
  title: string;
  categoryId: number;
}

export interface Game {
  teams: Team[];
  started: boolean;
  ended: boolean;
  currentQuizId: number | null;
  grid: {
    teamId: string;
    point: Point;
    success: boolean;
  }[][];
}
