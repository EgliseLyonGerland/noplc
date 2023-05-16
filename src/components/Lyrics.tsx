import {
  CheckCircleIcon,
  LockClosedIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { deburr } from "lodash-es";
import { forwardRef } from "react";

import { ChallengeStatus } from "../libs/types";

function getHiddenText(text: string) {
  return deburr(text)
    .replace(/[^\w ]/g, "")
    .replace(/\w+/g, "＿＿");
}

interface Props {
  text: string;
  status?: ChallengeStatus;
  hidden?: boolean;
  className?: string;
}

const Lyrics = forwardRef<HTMLDivElement, Props>(function Lyrics(
  { text, status = "idle", hidden = false, className },
  ref
) {
  return (
    <div
      className={clsx(
        "flex-center gap-4",
        !className?.includes("absolute") && "relative",
        status === "success"
          ? "border-green-500 text-green-500"
          : status === "fail"
          ? "border-red-500 text-red-500"
          : status === "locked"
          ? "border-yellow-300 text-yellow-300"
          : "border-neutral-content text-neutral-content",
        className
      )}
      ref={ref}
    >
      <div
        className={clsx(
          "rounded-lg border border-inherit px-4 py-2 text-3xl uppercase tracking-wide"
        )}
      >
        {hidden ? getHiddenText(text) : text}
      </div>

      <div className="absolute right-0 translate-x-[120%]">
        {status === "success" ? (
          <CheckCircleIcon className="h-12" />
        ) : status === "fail" ? (
          <XCircleIcon className="h-12" />
        ) : status === "locked" ? (
          <LockClosedIcon className="h-12" />
        ) : null}
      </div>
    </div>
  );
});

export default Lyrics;
