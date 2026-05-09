import { cn } from "@/utils/cn";

export function DropdownMenu({ open, children }) {
  if (!open) return null;
  return (
    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-white/10 bg-[#181818] p-1 shadow-2xl animate-in fade-in slide-in-from-top-2 z-50">
      {children}
    </div>
  );
}

export function DropdownMenuItem({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "flex w-full items-center rounded-lg px-2 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white outline-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuLabel({ className, children, ...props }) {
  return (
    <div className={cn("px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider", className)} {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className, ...props }) {
  return <div className={cn("-mx-1 my-1 h-px bg-white/10", className)} {...props} />;
}
