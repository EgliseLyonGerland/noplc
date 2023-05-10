import clsx from "clsx";
import { ReactNode } from "react";

import Logo from "./Logo";

type Props = {
  children?: ReactNode;
  bgColor?: string;
  className?: string;
  vertical?: boolean;
};

export default function Header({
  children,
  bgColor,
  className,
  vertical = false,
}: Props) {
  return (
    <div
      className={clsx("flex w-full gap-4", vertical && "flex-col", className)}
    >
      <div className="flex-center rounded-xl border p-4 px-6 shadow-2xl">
        <Logo className="fill-neutral-content h-[10vh]" />
      </div>
      <div
        className={clsx(
          "flex-center flex-1 rounded-xl border p-4 shadow-2xl",
          bgColor
        )}
      >
        {typeof children === "string" ? (
          <span className="text-4xl uppercase">{children}</span>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
