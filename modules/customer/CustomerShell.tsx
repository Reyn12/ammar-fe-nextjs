import { CUSTOMER_MAX_WIDTH } from "@/shared/constants/layout";
import { cn } from "@/shared/lib/cn";

type CustomerShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function CustomerShell({ children, className }: CustomerShellProps) {
  return (
    <div className="flex min-h-dvh justify-center bg-zinc-100">
      <div
        className={cn(
          "flex w-full min-h-dvh flex-col bg-white shadow-xl",
          className,
        )}
        style={{ maxWidth: CUSTOMER_MAX_WIDTH }}
      >
        {children}
      </div>
    </div>
  );
}
