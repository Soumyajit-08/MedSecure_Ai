import { cn } from "@/utils/cn";

export function Button({ className, variant = "default", ...props }) {
  const variants = {
    default:
      "rounded-xl bg-gradient-to-r from-blue-800 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-950/30 transition duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-500 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
    ghost:
      "rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-white/10 hover:text-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
  };

  return <button className={cn(variants[variant], className)} {...props} />;
}
