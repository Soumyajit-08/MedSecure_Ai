import { cn } from "@/utils/cn";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-white/15 bg-slate-950/50 px-3 py-2.5 text-sm text-slate-100 shadow-inner shadow-black/30 outline-none placeholder:text-slate-400 transition duration-200 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/25",
        className
      )}
      {...props}
    />
  );
}
