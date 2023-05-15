import { Category, Challenge, State } from "./types";

function getChallengesByCategory(
  challenges: Challenge[],
  categoryId: Category["id"]
) {
  return challenges.filter((challenge) => challenge.categoryId === categoryId);
}

export function isCategoryDone(
  challenges: Challenge[],
  { rounds }: State,
  categoryId: Category["id"]
) {
  return getChallengesByCategory(challenges, categoryId).some((challenge) =>
    rounds.some((round) => challenge.id === round.challengeId)
  );
}

export function isGameDone(categories: Category[], { rounds }: State) {
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

export function getCategory(
  categories: Category[],
  categoryId: Category["id"]
) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return categories.find((category) => category.id === categoryId)!;
}

export function getChallenge(
  challenges: Challenge[],
  challengeId: Challenge["id"]
) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return challenges.find((challenge) => challenge.id === challengeId)!;
}
