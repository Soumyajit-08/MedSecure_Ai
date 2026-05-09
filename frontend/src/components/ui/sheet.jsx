import { cn } from "@/utils/cn";

export function Sheet({ open, onOpenChange, children, side = "right" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
        onClick={() => onOpenChange?.(false)} 
      />
      <div 
        className={cn(
          "z-50 w-full max-w-sm border-white/10 bg-[#181818] p-6 shadow-2xl animate-in",
          side === "right" ? "slide-in-from-right border-l" : "slide-in-from-left border-r"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
}

export function SheetTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold text-white", className)} {...props} />;
}

export function SheetDescription({ className, ...props }) {
  return <p className={cn("text-sm text-slate-400", className)} {...props} />;
}
