import { z } from "zod";

export const pointSchema = z.number().multipleOf(10).finite().gte(10).lte(50);
export const roundStatusSchema = z.enum(["success", "fail"]);
export const challengeStatusSchema = z.enum([
  "idle",
  "locked",
  "success",
  "fail",
]);

export const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  emoji: z.string(),
});

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  point: pointSchema,
});

export const challengeSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  title: z.string(),
  lyrics: z.array(z.string()),
});

export const roundSchema = z.object({
  teamId: z.number(),
  challengeId: z.number(),
  status: roundStatusSchema,
});

export const teamsViewSchema = z.object({
  id: z.literal("teams").default("teams"),
});

export const categoriesViewSchema = z.object({
  id: z.literal("categories").default("categories"),
  selectedCategoryId: z.number().nullable().default(null),
  selectedChallengeId: z.number().nullable().default(null),
  challengesShown: z.boolean().default(false),
  resultsShown: z.boolean().default(false),
});

export const challengeViewSchema = z.object({
  id: z.literal("challenge").default("challenge"),
  challengeId: z.number(),
  lyricsIndex: z.number().min(-1).int().default(-1),
  answer: z.string().default(""),
  status: challengeStatusSchema.default("idle"),
});

export const viewSchema = z.union([
  teamsViewSchema,
  categoriesViewSchema,
  challengeViewSchema,
]);

export const stateSchema = z.object({
  teams: z.array(teamSchema).default([]),
  rounds: z.array(roundSchema).default([]),
  view: viewSchema.default({ id: "teams" }),
});
