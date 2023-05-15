import clsx from "clsx";

import { Point } from "./types";

export const categoriesEnpoint =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_gStV_bHgEdvIzyNht7tbpYSTQW8KXnaZEnHrfvVztl4pm9ZzLU_Y5WgDhxSKkk0ZgWBHpTp53j8w/pub?gid=0&single=true&output=csv";

export const challengesEndpoint =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_gStV_bHgEdvIzyNht7tbpYSTQW8KXnaZEnHrfvVztl4pm9ZzLU_Y5WgDhxSKkk0ZgWBHpTp53j8w/pub?gid=1737414298&single=true&output=csv";

export const colorsByPoints: Record<Point, [string, string]> = {
  10: [clsx("bg-sky-600/80"), clsx("bg-sky-400/50")],
  20: [clsx("bg-teal-600/80"), clsx("bg-teal-400/50")],
  30: [clsx("bg-lime-600/80"), clsx("bg-lime-400/50")],
  40: [clsx("bg-orange-600/80"), clsx("bg-orange-400/50")],
  50: [clsx("bg-rose-600/80"), clsx("bg-rose-400/50")],
};
