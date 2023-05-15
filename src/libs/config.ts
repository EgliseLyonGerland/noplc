import clsx from "clsx";

import { Category, Challenge, Point } from "./types";

export const categories: Category[] = [
  { id: 1, point: 10, name: "Psaumes" },
  { id: 2, point: 10, name: "Pour faire plaisir à Léa et Mathilde" },
  { id: 3, point: 10, name: "En tapant des mains" },
  { id: 4, point: 10, name: "Écritures" },
  { id: 5, point: 10, name: "Exo" },
  { id: 6, point: 10, name: "Getty" },
  { id: 7, point: 20, name: "On ne les présente plus" },
  { id: 8, point: 20, name: "O Jésus mon Sauveur" },
  { id: 9, point: 20, name: "Vous pouvez répéter la question ?" },
  { id: 10, point: 20, name: "Miroir miroir" },
  { id: 11, point: 20, name: "En canon" },
  { id: 12, point: 20, name: "Avec des répétitions" },
  { id: 13, point: 30, name: "Avec le mot « exalté »" },
  { id: 14, point: 30, name: "Voyage voyage" },
  { id: 15, point: 30, name: "Chants de Noël" },
  { id: 16, point: 30, name: "Made in Gerland" },
  { id: 17, point: 30, name: "Aux armes !" },
  { id: 18, point: 30, name: "Attributs du Père" },
  { id: 19, point: 40, name: "Pour Pâques" },
  { id: 20, point: 40, name: "Getty" },
  { id: 21, point: 40, name: "Station balnéaire" },
  { id: 22, point: 40, name: "Psaumes" },
  { id: 23, point: 40, name: "On ne les présente plus" },
  { id: 24, point: 40, name: "Eschatologie" },
  { id: 25, point: 50, name: "Onomatopée ou interjection" },
  { id: 26, point: 50, name: "Écritures" },
  { id: 27, point: 50, name: "Sur du classique" },
  { id: 28, point: 50, name: "Christologie" },
  { id: 29, point: 50, name: "Proverbes 1.7" },
  { id: 30, point: 50, name: "Pour se repentir" },
];

export const challenges: Challenge[] = [
  {
    id: 1,
    categoryId: 1,
    title: "Psaume 1",
    lyrics: [
      "Heureux celui qui ne marche jamais",
      "Selon le conseil des hommes mauvais,",
      "Qui, sur la voie des pécheurs, ne s'arrête,",
      "Ni sur le banc des moqueurs ne veut être,",
      "Mais qui la loi de l'Éternel chérit,",
      "Et qui veut la méditer jour et nuit !",
      "Celui-là est comme un arbre fruitier",
      "Près d'un courant d'eau fermement planté,",
      "Dont ne se flétrit jamais le feuillage ;",
    ],
  },
  {
    id: 2,
    categoryId: 1,
    title: "Psaume 47",
    lyrics: [
      "Frappez dans vos mains, vous, tous les humains !",
      "À cris redoublés, peuples assemblés,",
      "Exultez de joie car voici le Roi.",
      "Redoutable et doux, Dieu veille sur vous ;",
      "Son bras souverain, sa puissante main,",
      "Etend à jamais son règne de paix.",
      "Si Dieu a choisi Israël pour fils,",
      "S'il l'a secouru, s'il l'a maintenu,",
      "C'est pour proclamer par son bien-aimé :",
    ],
  },
  {
    id: 3,
    categoryId: 2,
    title: "C’est ton roi qui t’appelle",
    lyrics: [],
  },
  {
    id: 4,
    categoryId: 2,
    title: "Chantons !",
    lyrics: [
      "Chantons, car Dieu est là,",
      "Poussons des cris de joie,",
      "Dressons-lui un trône de reconnaissance,",
      "Un palais de louange !",
    ],
  },
  {
    id: 5,
    categoryId: 3,
    title: "Grandes et merveilleuses",
    lyrics: [],
  },
  {
    id: 6,
    categoryId: 3,
    title: "Venez le célébrer",
    lyrics: [],
  },
  {
    id: 7,
    categoryId: 4,
    title: "Héritiers",
    lyrics: [],
  },
  {
    id: 8,
    categoryId: 4,
    title: "Ta Parole",
    lyrics: [],
  },
  {
    id: 9,
    categoryId: 5,
    title: "Règne en moi",
    lyrics: [],
  },
  {
    id: 10,
    categoryId: 5,
    title: "Digne es-tu",
    lyrics: [],
  },
  {
    id: 11,
    categoryId: 6,
    title: "Tiens toi debout Église du grand Roi",
    lyrics: [],
  },
  {
    id: 12,
    categoryId: 6,
    title: "C’est par la foi",
    lyrics: [],
  },
  {
    id: 13,
    categoryId: 7,
    title: "À toi la gloire",
    lyrics: [],
  },
  {
    id: 14,
    categoryId: 7,
    title: "Quel ami fidèle et tendre",
    lyrics: [],
  },
  {
    id: 15,
    categoryId: 8,
    title: "Sauveur du monde",
    lyrics: [],
  },
  {
    id: 16,
    categoryId: 8,
    title: "O mystère infini",
    lyrics: [],
  },
  {
    id: 17,
    categoryId: 9,
    title: "Qui donc dans le ciel",
    lyrics: [],
  },
  {
    id: 18,
    categoryId: 9,
    title: "Qui est Dieu comme toi ?",
    lyrics: [],
  },
  {
    id: 19,
    categoryId: 10,
    title: "Oh Viens Jésus (Noël)",
    lyrics: [],
  },
  {
    id: 20,
    categoryId: 10,
    title: "Oh viens Jésus (Écritures)",
    lyrics: [],
  },
  {
    id: 21,
    categoryId: 11,
    title: "Mon seul abri",
    lyrics: [],
  },
  {
    id: 22,
    categoryId: 11,
    title: "quand j’invoque le Seigneur",
    lyrics: [],
  },
  {
    id: 23,
    categoryId: 12,
    title: "Gloire, gloire, gloire",
    lyrics: [],
  },
  {
    id: 24,
    categoryId: 12,
    title: "Saint, saint, saint !",
    lyrics: [],
  },
  {
    id: 25,
    categoryId: 13,
    title: "Il est exalte",
    lyrics: [],
  },
  {
    id: 26,
    categoryId: 13,
    title: "Exalte avec moi",
    lyrics: [],
  },
  {
    id: 27,
    categoryId: 14,
    title: "Quand les montagnes",
    lyrics: [],
  },
  {
    id: 28,
    categoryId: 14,
    title: "Les anges dans nos campagnes",
    lyrics: [],
  },
  {
    id: 29,
    categoryId: 15,
    title: "Voici Noël",
    lyrics: [],
  },
  {
    id: 30,
    categoryId: 15,
    title: "Peuple Fidèle",
    lyrics: [],
  },
  {
    id: 31,
    categoryId: 16,
    title: "Environné d’un éclat.",
    lyrics: [],
  },
  {
    id: 32,
    categoryId: 16,
    title: "Ta grâce au Dieu",
    lyrics: [],
  },
  {
    id: 33,
    categoryId: 17,
    title: "Avant les trônes",
    lyrics: [],
  },
  {
    id: 34,
    categoryId: 17,
    title: "Bénis soit le nom",
    lyrics: [],
  },
  {
    id: 35,
    categoryId: 18,
    title: "Dieu créateur",
    lyrics: [],
  },
  {
    id: 36,
    categoryId: 18,
    title: "Dieu tout puissant",
    lyrics: [],
  },
  {
    id: 37,
    categoryId: 19,
    title: "Alléluia Jésus vit",
    lyrics: [],
  },
  {
    id: 38,
    categoryId: 19,
    title: "C’est aujourd’hui la victoire",
    lyrics: [],
  },
  {
    id: 39,
    categoryId: 20,
    title: "O l’ampleur de la tâche",
    lyrics: [],
  },
  {
    id: 40,
    categoryId: 20,
    title: "Viens peuple du Seigneur vivant",
    lyrics: [],
  },
  {
    id: 41,
    categoryId: 21,
    title: "Comme un phare",
    lyrics: [],
  },
  {
    id: 42,
    categoryId: 21,
    title: "Mon ancre et ma voile",
    lyrics: [],
  },
  {
    id: 43,
    categoryId: 22,
    title: "Psaume 42",
    lyrics: [],
  },
  {
    id: 44,
    categoryId: 22,
    title: "Psaume 92",
    lyrics: [],
  },
  {
    id: 45,
    categoryId: 23,
    title: "Avant les trônes",
    lyrics: [],
  },
  {
    id: 46,
    categoryId: 23,
    title: "Bénis soit le nom",
    lyrics: [],
  },
  {
    id: 47,
    categoryId: 24,
    title: "A la fin des temps",
    lyrics: [],
  },
  {
    id: 48,
    categoryId: 24,
    title: "Il est un jour",
    lyrics: [],
  },
  {
    id: 49,
    categoryId: 25,
    title: "Ô merveilleuse histoire",
    lyrics: [],
  },
  {
    id: 50,
    categoryId: 25,
    title: "Ô Jésus mon Roi mon Maitre",
    lyrics: [],
  },
  {
    id: 51,
    categoryId: 26,
    title: "Notre Dieu",
    lyrics: [],
  },
  {
    id: 52,
    categoryId: 26,
    title: "Dieu sublime",
    lyrics: [],
  },
  {
    id: 53,
    categoryId: 27,
    title: "Les cieux et la terre",
    lyrics: [],
  },
  {
    id: 54,
    categoryId: 27,
    title: "Entonnons un saint cantique",
    lyrics: [],
  },
  {
    id: 55,
    categoryId: 28,
    title: "Mon espérance est en Jésus",
    lyrics: [],
  },
  {
    id: 56,
    categoryId: 28,
    title: "Jésus est mon divin berger",
    lyrics: [],
  },
  {
    id: 57,
    categoryId: 29,
    title: "Craignons l’Éternel",
    lyrics: [],
  },
  {
    id: 58,
    categoryId: 29,
    title: "Psaume 6",
    lyrics: [],
  },
  {
    id: 59,
    categoryId: 30,
    title: "Seigneur tu vois mon coeur",
    lyrics: [],
  },
  {
    id: 60,
    categoryId: 30,
    title: "Pardon, Seigneur pardon",
    lyrics: [],
  },
];

export const categoriesByPoint = categories.reduce<Record<Point, Category[]>>(
  (acc, curr) => {
    acc[curr.point].push(curr);
    return acc;
  },
  { 10: [], 20: [], 30: [], 40: [], 50: [] }
);

export const pointByCategory = categories.reduce<Record<number, Point>>(
  (acc, curr) => {
    acc[curr.id] = curr.point;
    return acc;
  },
  {}
);

export const colorsByPoints: Record<Point, [string, string]> = {
  10: [clsx("bg-sky-600/80"), clsx("bg-sky-400/50")],
  20: [clsx("bg-teal-600/80"), clsx("bg-teal-400/50")],
  30: [clsx("bg-lime-600/80"), clsx("bg-lime-400/50")],
  40: [clsx("bg-orange-600/80"), clsx("bg-orange-400/50")],
  50: [clsx("bg-rose-600/80"), clsx("bg-rose-400/50")],
};
