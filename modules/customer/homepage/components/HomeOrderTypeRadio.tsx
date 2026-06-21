import { cn } from "@/shared/lib/cn";

type HomeOrderTypeRadioProps = {
  isActive: boolean;
};

export function HomeOrderTypeRadio({ isActive }: HomeOrderTypeRadioProps) {
  return (
    <span
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        isActive ? "border-[#FA52A8]" : "border-zinc-300",
      )}
      aria-hidden
    >
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full bg-[#FA52A8] transition-transform duration-200",
          isActive ? "scale-100" : "scale-0",
        )}
      />
    </span>
  );
}
