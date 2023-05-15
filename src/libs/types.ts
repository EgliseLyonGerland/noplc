import { z } from "zod";

import {
  categorySchema,
  challengeSchema,
  challengeStatusSchema,
  pointSchema,
  roundSchema,
  roundStatusSchema,
  stateSchema,
  teamSchema,
  viewSchema,
} from "./schemas";

export type Point = z.infer<typeof pointSchema>;
export type RoundStatus = z.infer<typeof roundStatusSchema>;
export type ChallengeStatus = z.infer<typeof challengeStatusSchema>;
export type Team = z.infer<typeof teamSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Challenge = z.infer<typeof challengeSchema>;
export type Round = z.infer<typeof roundSchema>;
export type State = z.infer<typeof stateSchema>;
export type View = z.infer<typeof viewSchema>;
export type ViewId = View["id"];
