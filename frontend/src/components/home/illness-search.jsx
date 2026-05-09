"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { illnessApi } from "@/services/api";

export function IllnessSearch() {
  const [query, setQuery] = useState("fever cough throat pain");
  const fallbackResult = useMemo(
    () => ({
      illness: "Local NLP preview",
      riskLevel: "Ready",
      matched: false,
      response:
        "Type symptoms and click Analyze to get a response from the backend local illness dataset.",
      nextSteps: ["Search symptoms", "Ask the bot", "Save details for prediction"]
    }),
    []
  );
  const search = useMutation({
    mutationFn: (payload) => illnessApi.search(payload)
  });
  const result = search.data?.data?.data;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] mobile-stagger">
      <div className="glass-card flex flex-col justify-center p-8 lg:p-10">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white">Symptom Analyzer</h3>
          <p className="mt-2 text-slate-400">
            Describe your symptoms in detail for an AI-powered local analysis.
          </p>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400 group-focus-within:text-lime-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Input
            id="illness-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="E.g. persistent cough, high fever, chest pain..."
            className="pl-12 py-7 text-lg bg-white/[0.03] border-white/10 focus:border-lime-400/50 focus:ring-lime-400/20 rounded-2xl transition-all"
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            className="w-full sm:flex-1 py-8 text-lg font-bold bg-lime-600 hover:bg-lime-500 shadow-xl shadow-lime-950/40 border-none"
            onClick={() => search.mutate({ query })}
            disabled={search.isPending}
          >
            {search.isPending ? "Analyzing..." : "Run Deep Analysis"}
          </Button>
          <Link href={`/chatbot?message=${encodeURIComponent(query)}`} className="w-full sm:flex-1">
            <Button 
              type="button" 
              className="w-full py-8 text-lg font-bold bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 shadow-xl shadow-lime-950/40 border-none"
            >
              Ask AI Bot
            </Button>
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
          <span className={`flex h-2 w-2 rounded-full ${search.isPending ? 'bg-amber-500 animate-pulse' : 'bg-lime-500 animate-pulse'}`} />
          {search.isPending ? 'Processing Natural Language...' : 'Local NLP Engine Active'}
        </div>
      </div>

      <div className="rounded-3xl border border-lime-400/10 bg-white/[0.02] p-8 lg:p-10 backdrop-blur-md relative overflow-hidden flex flex-col items-center justify-center text-center">
        {!result && !search.isPending ? (
          <div className="space-y-4 animate-fade-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-lime-400/10 flex items-center justify-center border border-lime-400/20">
              <svg className="h-8 w-8 text-lime-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-slate-300">Ready for Analysis</h4>
            <p className="text-sm text-slate-500 max-w-[240px] mx-auto">
              Your results will appear here after the engine completes the local data match.
            </p>
          </div>
        ) : search.isPending ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-4 w-32 bg-white/10 rounded mx-auto" />
            <div className="h-8 w-48 bg-white/10 rounded mx-auto" />
            <div className="h-24 w-full bg-white/10 rounded-2xl mt-8" />
            <div className="space-y-3 mt-8">
              <div className="h-10 w-full bg-white/10 rounded-xl" />
              <div className="h-10 w-full bg-white/10 rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="relative w-full text-left animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-lime-400">Analysis Result</p>
                <h3 className="text-2xl font-bold text-white">{result.illness}</h3>
              </div>
              <div className={`px-4 py-1.5 rounded-full border text-sm font-bold ${result.matched ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-lime-500/10 border-lime-500/30 text-lime-400'}`}>
                {result.matched ? `${result.riskLevel} Risk` : result.riskLevel}
              </div>
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <p className="leading-relaxed text-slate-300 italic">"{result.response}"</p>
            </div>

            {result.nextSteps?.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-lime-400/60">Action Plan</p>
                <div className="mt-4 grid gap-3">
                  {result.nextSteps.map((step) => (
                    <div key={step} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-lime-400/30 transition-colors">
                      <div className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(137,233,0,0.6)]" />
                      <span className="text-sm text-slate-200">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-xs leading-5 text-slate-500">
                <span className="text-amber-400/80 font-semibold">Disclaimer:</span> AI pattern match. Consult a professional.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
