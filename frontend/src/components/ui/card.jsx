import { cn } from "@/utils/cn";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-slate-950/50 p-5 shadow-lg shadow-black/30 backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
