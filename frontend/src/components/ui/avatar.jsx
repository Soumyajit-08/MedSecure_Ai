import { cn } from "@/utils/cn";

export function Avatar({ className, ...props }) {
  return (
    <div
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/5", className)}
      {...props}
    />
  );
}

export function AvatarImage({ src, alt, className, ...props }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({ children, className, ...props }) {
  return (
    <div
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-slate-800 text-sm font-medium text-slate-300", className)}
      {...props}
    >
      {children}
    </div>
  );
}
