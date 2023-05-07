import { Team } from "../types";

interface Props {
  team: Team;
}

export default function Team({ team }: Props) {
  return (
    <div className="flex-center flex-col gap-4">
      <span className="text-[6rem] leading-none">{team.emoji}</span>
      <div className="border-primary whitespace-nowrap rounded-full border p-2 px-6 text-center text-2xl uppercase">
        {team.name}
      </div>
    </div>
  );
}
