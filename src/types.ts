export type Point = 10 | 20 | 30 | 40 | 50;

export interface Team {
  id: string;
  name: string;
}

export interface Game {
  teams: Team[];
  started: boolean;
}
