import { cn } from "@/utils/cn";

export function Table({ className, ...props }) {
  return (
    <div className="w-full overflow-auto rounded-xl border border-white/10 bg-black/20">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn("[&_tr]:border-b border-white/10", className)} {...props} />;
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn("border-b border-white/10 transition-colors hover:bg-white/5", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }) {
  return (
    <th
      className={cn("h-12 px-4 text-left align-middle font-medium text-slate-400", className)}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }) {
  return <td className={cn("p-4 align-middle text-slate-200", className)} {...props} />;
}
