"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 text-slate-100">
      <section className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-bold text-white">We could not load this screen.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Please try again. If the problem continues, restart the frontend dev server.
        </p>
        <Button className="mt-6" onClick={reset}>
          Try again
        </Button>
      </section>
    </main>
  );
}
