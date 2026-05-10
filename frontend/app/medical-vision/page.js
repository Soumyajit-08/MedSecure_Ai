"use client";

import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { visionApi } from "@/services/api";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { ProtectedRoute } from "@/components/ui/protected-route";

export default function MedicalVisionPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const analyzeMutation = useMutation({
    mutationFn: (formData) => visionApi.analyze(formData),
    onSuccess: (data) => {
      toast.success("Analysis complete!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to analyze image");
    }
  });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const onAnalyze = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    analyzeMutation.mutate(formData);
  };

  const result = analyzeMutation.data?.data?.data;

  return (
    <ProtectedRoute message="Clinical vision scanning requires authentication to protect your health data.">
      <div className="min-h-screen flex flex-col bg-[#181818]">

      <Header />
      <main className="flex-grow px-4 py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <section className="mb-12 text-center animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">Advanced Diagnostics</p>
            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Medical Vision <span className="text-lime-400">AI</span>
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-400">
              Upload X-rays, prescriptions, or medical reports for a structured patient-friendly review. 
              The app summarizes findings, explains medicine notes, and suggests the right specialist.
            </p>
          </section>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Upload Section */}
            <div className="space-y-6">
              <Card 
                className={`glass-card border-dashed border-2 p-1 relative overflow-hidden transition-all duration-500 ${dragActive ? "border-lime-500 bg-lime-500/5" : "border-white/10"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {!preview ? (
                  <div className="py-24 flex flex-col items-center justify-center text-center px-6">
                    <div className="h-20 w-20 rounded-full bg-lime-500/10 flex items-center justify-center mb-6 border border-lime-500/20">
                      <svg className="h-10 w-10 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Drop medical image here</h3>
                    <p className="mt-2 text-slate-400">X-rays, Scans, or Prescriptions (PNG, JPG)</p>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>
                ) : (
                  <div className="relative group rounded-xl overflow-hidden">
                    <img src={preview} alt="Medical Preview" className="w-full h-[400px] object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <Button variant="outline" className="border-white/20 text-white" onClick={() => { setFile(null); setPreview(null); }}>
                         Remove
                       </Button>
                       <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                    {/* Scanning Animation */}
                    {analyzeMutation.isPending && (
                      <motion.div 
                        className="absolute top-0 left-0 w-full h-1 bg-lime-400 z-10 shadow-[0_0_15px_rgba(137,233,0,1)]"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </div>
                )}
              </Card>

              <Button 
                disabled={!file || analyzeMutation.isPending}
                onClick={onAnalyze}
                className="w-full py-8 text-xl font-bold bg-lime-600 hover:bg-lime-500 shadow-xl shadow-lime-900/20 rounded-2xl border-none transition-all active:scale-[0.98]"
              >
                {analyzeMutation.isPending ? "Analyzing Deep Medical Layers..." : "Start AI Vision Scan"}
              </Button>
            </div>

            {/* Results Section */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12 border border-white/5 rounded-3xl bg-white/[0.01]"
                  >
                    <div className="h-12 w-12 rounded-full border-2 border-slate-700 border-t-lime-500 animate-spin mb-6" />
                    <h3 className="text-xl font-medium text-slate-400 italic">Waiting for medical scan...</h3>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Simplified Patient View */}
                    <Card className="glass-card p-6 border-lime-500/20 bg-lime-500/[0.02]">
                      <div className="flex items-center justify-between mb-6">
                        <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest ${
                          result.urgency_level === "High" ? "bg-red-500/10 border-red-500/20 text-red-400" :
                          result.urgency_level === "Medium" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                          "bg-lime-500/10 border-lime-500/20 text-lime-400"
                        }`}>
                          Urgency: {result.urgency_level}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-white mb-4">Patient-Friendly Summary</h2>
                      <p className="text-lg text-slate-200 leading-relaxed bg-[#181818] p-5 rounded-2xl border border-white/5 shadow-inner">
                        {result.simple_explanation}
                      </p>
                    </Card>

                    {/* Key Findings List */}
                    <div className="grid gap-4">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">Key Observations</h3>
                      {result.key_findings.map((finding, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <div className="h-2 w-2 rounded-full bg-lime-500" />
                          <p className="text-sm text-slate-300">{finding}</p>
                        </div>
                      ))}
                    </div>

                    {/* Prescribed Medicines */}
                    {result.medicines && result.medicines.length > 0 && (
                      <Card className="glass-card p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          Medicine Breakdown
                        </h3>
                        <div className="grid gap-3">
                          {result.medicines.map((med, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                              <p className="font-bold text-lime-400">{med.name}</p>
                              <p className="text-sm text-slate-300 mt-1">{med.purpose}</p>
                              {med.caution && <p className="text-[10px] text-amber-400 mt-2 italic font-medium">Caution: {med.caution}</p>}
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}

                    {/* Specialist & Map Action */}
                    <Card className="glass-card p-6 border-emerald-500/20 bg-emerald-500/[0.02]">
                       <h3 className="text-lg font-bold text-white mb-4">Professional Recommendation</h3>
                       <div className="flex flex-col gap-4">
                         <div className="p-4 rounded-xl bg-[#222222] border-l-4 border-emerald-500">
                           <p className="text-xs font-bold text-emerald-400 uppercase mb-1">Target Specialist</p>
                           <p className="text-white font-medium text-lg">{result.specialist_type}</p>
                           <p className="text-slate-400 text-xs mt-1">{result.doctor_role}</p>
                         </div>
                         
                         <a href={result.maps_search_link} target="_blank" rel="noopener noreferrer">
                           <Button className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-900/20 border-none flex items-center justify-center gap-2">
                             <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                             </svg>
                             Find {result.specialist_type} Specialists Near Me
                           </Button>
                         </a>
                       </div>
                    </Card>

                    <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest mt-8">
                      Disclaimer: AI-generated analysis. Please verify with a qualified medical professional.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}

