import clsx from "clsx";

type Point = 10 | 20 | 30 | 40 | 50;

const categories: Record<
  Point,
  [string, string, string, string, string, string]
> = {
  10: [
    "Psaumes",
    "Pour faire plaisir à Léa et Mathilde",
    "En tapant des mains",
    "Écritures",
    "Exo",
    "Getty",
  ],
  20: [
    "On ne les présente plus",
    "O Jésus mon Sauveur",
    "Vous pouvez répéter la question ?",
    "Miroir miroir",
    "En canon",
    "Avec des répétitions",
  ],
  30: [
    "Avec le mot « exalté »",
    "Voyage voyage",
    "Chants de Noël",
    "Made in Gerland",
    "Aux armes !",
    "Attributs du Père",
  ],
  40: [
    "Pour Pâques",
    "Getty",
    "Station balnéaire",
    "Psaumes",
    "On ne les présente plus (retraduit à Gerland)",
    "Eschatologie",
  ],
  50: [
    "Onomatopée ou interjection",
    "Écritures",
    "Sur du classique",
    "Christologie",
    "Proverbes 1.7",
    "Pour se repentir",
  ],
};

const colors = [
  clsx("bg-sky-600/80"),
  clsx("bg-teal-600/80"),
  clsx("bg-lime-600/80"),
  clsx("bg-rose-600/80"),
  clsx("bg-orange-600/80"),
];

function App() {
  return (
    <div className="flex h-screen flex-col items-center gap-12 p-12">
      <h1 className="text-3xl font-bold uppercase">
        N'oubliez pas les cantiques
      </h1>
      <div className="grid flex-1 grid-cols-6 grid-rows-5 gap-4">
        {Object.entries(categories).map(([point, songs], rowIndex) =>
          songs.map((song) => (
            <div
              key={`${song}-${point}`}
              className={clsx(
                "flex-center rounded-lg p-2 text-center text-[2.6vh] uppercase leading-tight",
                colors[rowIndex]
              )}
            >
              {song} ({point})
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
