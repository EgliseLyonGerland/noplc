import { XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Suspense, lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAppState from "../../libs/useAppState";
import useData from "../../libs/useData";

const EmojiPicker = lazy(() => import("../../components/EmojiPicker"));

const teamSchema = z.object({
  name: z.string().min(1),
  emoji: z.string().min(1),
});

export default function TeamsControls() {
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);
  const { sync } = useData();
  const { teams, dispatch } = useAppState();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
    reset,
    getValues,
  } = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="rounded-lg bg-neutral p-2 px-4 text-xl text-neutral-content">
        Équipes
      </h2>

      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Emoji</th>
              <th className="w-full">Nom</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                <th>{team.id}</th>
                <td align="center" className="text-2xl">
                  {team.emoji}
                </td>
                <td>{team.name}</td>
                <td>
                  <button
                    className="btn-ghost btn-sm btn-circle btn"
                    onClick={() =>
                      dispatch({ type: "team.delete", id: team.id })
                    }
                  >
                    <XMarkIcon className="h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        className="flex gap-4"
        onSubmit={handleSubmit((data) => {
          if (teams.find((team) => team.emoji === data.emoji)) {
            return;
          }
          dispatch({
            type: "team.add",
            name: data.name,
            emoji: data.emoji,
          });
          reset();
        })}
      >
        <input
          {...register("name")}
          className="input-bordered input-primary input w-full max-w-xs"
          placeholder="Nom de l'équipe"
        />
        <input {...register("emoji")} type="hidden" />

        <DropdownMenu.Root
          onOpenChange={setEmojiPickerOpened}
          open={emojiPickerOpened}
        >
          <DropdownMenu.Trigger asChild>
            <button className="btn-circle btn text-2xl">
              {getValues("emoji") || "﹖"}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="data-[side=bottom] data-[align=end]"
              sideOffset={16}
            >
              <Suspense>
                <EmojiPicker
                  onEmojiClick={(data) => {
                    setValue("emoji", data.emoji, { shouldValidate: true });
                    setEmojiPickerOpened(false);
                  }}
                />
              </Suspense>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <button className="btn" disabled={!isValid} type="submit">
          Ajouter
        </button>
      </form>
      <div className="divider"></div>
      <div className="flex gap-4">
        <button
          className="btn-primary btn"
          onClick={() => dispatch({ type: "game.start" })}
        >
          Démarrer le jeu
        </button>
        <button className="btn ml-auto" onClick={sync}>
          Synchroniser
        </button>
      </div>
    </div>
  );
}
