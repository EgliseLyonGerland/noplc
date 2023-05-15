import { camelCase, kebabCase } from "lodash";
import { parse } from "papaparse";
import useFetch from "use-http";
import useLocalStorageState from "use-local-storage-state";

import { categoriesEnpoint, challengesEndpoint } from "./config";
import { Category, Challenge, Point } from "./types";

export default function useData() {
  const [categories, setCategories] = useLocalStorageState<Category[]>(
    "categories",
    {
      defaultValue: [],
      storageSync: false,
    }
  );
  const [challenges, setChallenges] = useLocalStorageState<Challenge[]>(
    "challenges",
    {
      defaultValue: [],
      storageSync: false,
    }
  );

  const { get: fetchCategories } = useFetch(categoriesEnpoint);
  const { get: fetchChallenges } = useFetch(challengesEndpoint);

  const categoriesByPoint = categories.reduce<Record<Point, Category[]>>(
    (acc, curr) => {
      acc[curr.point].push(curr);
      return acc;
    },
    { 10: [], 20: [], 30: [], 40: [], 50: [] }
  );

  const pointByCategory = categories.reduce<Record<Category["id"], Point>>(
    (acc, curr) => {
      acc[curr.id] = curr.point;
      return acc;
    },
    {}
  );

  async function syncCategories() {
    const res = await fetchCategories();

    const { data } = parse<{
      id: string;
      name: string;
      point: number;
    }>(res as string, {
      delimiter: ",",
      header: true,
      dynamicTyping: true,
      transformHeader(name) {
        return camelCase(name);
      },
    });

    setCategories(
      data.map(({ id, name, point }) => ({
        id: kebabCase(id),
        name,
        point,
      }))
    );
  }

  async function syncChallenges() {
    const res = await fetchChallenges();

    const { data } = parse<{
      titre: string;
      categorie: string;
      paroles: string;
    }>(res as string, {
      delimiter: ",",
      header: true,
      dynamicTyping: true,
      transformHeader(name) {
        return camelCase(name);
      },
    });

    setChallenges(
      data.map(({ titre, paroles, categorie }, id) => ({
        id: id + 1,
        categoryId: kebabCase(categorie),
        title: titre,
        lyrics: paroles.split("\n").filter((line) => line.trim()),
      }))
    );
  }

  async function sync() {
    return Promise.all([syncCategories(), syncChallenges()]);
  }

  return {
    categories,
    challenges,
    categoriesByPoint,
    pointByCategory,
    setCategories,
    setChallenges,
    sync,
  };
}
