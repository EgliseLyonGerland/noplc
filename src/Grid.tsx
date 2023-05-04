import clsx from "clsx";
import { categories } from "./libs/config";

const colors = [
  clsx("bg-sky-600/80"),
  clsx("bg-teal-600/80"),
  clsx("bg-lime-600/80"),
  clsx("bg-rose-600/80"),
  clsx("bg-orange-600/80"),
];

function Grid() {
  return (
    <div className="grid h-full flex-1 grid-cols-6 grid-rows-5 gap-2">
      {Object.entries(categories).map(([point, songs], rowIndex) =>
        songs.map((song) => (
          <div
            key={`${song}-${point}`}
            className={clsx(
              "flex-center rounded-lg p-2 text-center text-[2.6vh] uppercase leading-tight",
              colors[rowIndex]
            )}
          >
            {song}
          </div>
        ))
      )}
    </div>
  );
}

export default Grid;
