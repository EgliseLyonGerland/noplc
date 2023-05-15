import { categories, challenges } from "./config";
import { Category, Challenge, State } from "./types";

function getChallengesByCategory(categoryId: Category["id"]) {
  return challenges.filter((challenge) => challenge.categoryId === categoryId);
}

export function isCategoryDone({ rounds }: State, categoryId: Category["id"]) {
  const challenges = getChallengesByCategory(categoryId);

  return Boolean(
    rounds.find((round) =>
      challenges.find((challenge) => challenge.id === round.challengeId)
    )
  );
}

export function isGameDone({ rounds }: State) {
  return rounds.length === categories.length;
}

export function getCurrentTeam({ rounds, teams }: State) {
  const lastTeamId = rounds[rounds.length - 1]?.teamId;
  let index = teams.findIndex((team) => team.id === lastTeamId) + 1;

  if (index === teams.length) {
    index = 0;
  }

  return teams[index];
}

export function getCategory(categoryId: Category["id"]) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return categories.find((category) => category.id === categoryId)!;
}

export function getChallenge(challengeId: Challenge["id"]) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return challenges.find((challenge) => challenge.id === challengeId)!;
}
