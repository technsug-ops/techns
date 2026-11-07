import type { AccentHeading } from "@/content/site";

/** Rendert „vorher *Akzent* nachher“ mit kursivem Serifen-Akzent. */
export function Accent({ before, accent, after }: AccentHeading) {
  const spaceBefore = before.endsWith("-") ? "" : " ";
  const spaceAfter = after && !/^[.,!?:;]/.test(after) ? " " : "";
  return (
    <>
      {before}{spaceBefore}<em className="s">{accent}</em>
      {after ? spaceAfter + after : null}
    </>
  );
}
