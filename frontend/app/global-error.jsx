"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-slate-100">
        <main className="flex min-h-screen items-center justify-center px-5">
          <section className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">Application error</p>
            <h1 className="mt-4 text-3xl font-bold text-white">MedSecure could not start.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {error?.message || "An unexpected error occurred while loading the app."}
            </p>
            <button
              className="mt-6 rounded-xl bg-lime-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-lime-500"
              onClick={reset}
              type="button"
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
