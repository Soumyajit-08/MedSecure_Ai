import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 text-slate-100">
      <section className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">404</p>
        <h1 className="mt-4 text-3xl font-bold text-white">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          The page you are looking for does not exist or has moved.
        </p>
        <Link href="/">
          <Button className="mt-6">Go home</Button>
        </Link>
      </section>
    </main>
  );
}
