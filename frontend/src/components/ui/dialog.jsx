import { cn } from "@/utils/cn";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-all" 
        onClick={() => onOpenChange?.(false)} 
      />
      <div className="z-50 grid w-full max-w-lg gap-4 rounded-2xl border border-white/10 bg-[#181818] p-6 shadow-2xl animate-in fade-in zoom-in-95 sm:rounded-2xl md:w-full">
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />;
}

export function DialogTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)} {...props} />;
}

export function DialogDescription({ className, ...props }) {
  return <p className={cn("text-sm text-slate-400", className)} {...props} />;
}
