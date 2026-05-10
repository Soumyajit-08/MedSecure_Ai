"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { visionApi } from "@/services/api";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, User, Activity, Pill, UserPlus, Info, CircleAlert } from "lucide-react";
import { ProtectedRoute } from "@/components/ui/protected-route";

import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "react-i18next";
export default function PrescriptionAnalyzerPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const analyzeMutation = useMutation({
    mutationFn: (formData) => visionApi.analyzePrescription(formData),
    onSuccess: () => {
      const firstName = user?.fullName?.split(" ")[0] || "Patient";
      toast.success(`${firstName}, prescription analysis finalized. Clinical data has been extracted.`);
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to analyze document");
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
    setDragActive(e.type === "dragenter" || e.type === "dragover");
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
    <ProtectedRoute message="Accessing the Prescription Analyzer requires an active patient session.">
      <div className="min-h-screen flex flex-col bg-[#0a0a0a]">

      <Header />
      
      <main className="flex-grow px-4 py-12 md:px-12 relative overflow-x-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-lime-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <section className="mb-12 text-center animate-fade-up">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-lime-400 mb-4">{t("analyzer.badge")}</p>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              {t("analyzer.title").split(" ")[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">{t("analyzer.title").split(" ").slice(1).join(" ") || "Analyzer"}</span>
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-400 font-medium leading-relaxed">
              {t("analyzer.desc")}
            </p>
          </section>

          <div className="grid gap-12 lg:grid-cols-5 items-start">
            {/* Input Side */}
            <div className="lg:col-span-2 space-y-8">
              <Card 
                className={`glass-card-premium border-dashed border-2 p-2 relative overflow-hidden transition-all duration-700 h-[450px] flex items-center justify-center ${dragActive ? "border-lime-500 bg-lime-500/10 scale-105" : "border-white/10"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {!preview ? (
                  <div className="flex flex-col items-center justify-center text-center p-8">
                    <div className="h-24 w-24 rounded-3xl bg-lime-500/10 flex items-center justify-center mb-8 border border-lime-500/20 group-hover:rotate-6 transition-transform">
                      <Upload className="h-10 w-10 text-lime-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{t("analyzer.drop")}</h3>
                    <p className="text-slate-500 font-medium">{t("analyzer.formats")}</p>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                    <img src={preview} alt="Medical Document" className="w-full h-full object-contain bg-black/40 p-4" />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-6 backdrop-blur-sm">
                       <Button 
                        variant="destructive" 
                        className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-xs" 
                        onClick={() => { setFile(null); setPreview(null); }}
                       >
                         {t("analyzer.remove")}
                       </Button>
                       <div className="relative">
                         <Button className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-xs bg-white text-black">{t("analyzer.change")}</Button>
                         <input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={handleFileChange}
                          accept="image/*,.pdf"
                        />
                       </div>
                    </div>
                    {/* Scanning Line */}
                    {analyzeMutation.isPending && (
                      <motion.div 
                        className="absolute top-0 left-0 w-full h-1 bg-lime-400 z-10 shadow-[0_0_20px_rgba(137,233,0,1)]"
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
                className="w-full h-20 text-xl font-black uppercase tracking-[0.2em] bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 shadow-2xl shadow-lime-900/40 rounded-3xl border-none transition-all active:scale-[0.98]"
              >
                {analyzeMutation.isPending ? t("analyzer.scanning") : t("analyzer.analyze")}
              </Button>
            </div>

            {/* Results Side */}
            <div className="lg:col-span-3 min-h-[500px]">
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex flex-col items-center justify-center text-center p-16 glass-card-premium border-white/5 bg-white/[0.01]"
                  >
                    <div className="h-20 w-20 rounded-full border-4 border-slate-900 border-t-lime-500 animate-spin mb-10" />
                    <h3 className="text-2xl font-black text-slate-400 italic tracking-tight">{t("analyzer.ready")}</h3>
                    <p className="mt-4 text-slate-500 font-medium">{t("analyzer.ready_desc")}</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-8"
                  >
                    {/* 1. Patient Details */}
                    <Card className="glass-card-premium p-8 overflow-hidden relative group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <User className="h-20 w-20 text-white" />
                      </div>
                      <h2 className="text-sm font-black text-lime-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                        <User className="h-4 w-4" /> {t("analyzer.patient")}
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t("analyzer.name")}</p>
                          <p className="text-white font-bold">{result.patient_details?.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t("analyzer.age")}</p>
                          <p className="text-white font-bold">{result.patient_details?.age}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t("analyzer.gender")}</p>
                          <p className="text-white font-bold">{result.patient_details?.gender}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t("analyzer.metadata")}</p>
                          <p className="text-white font-bold">{result.patient_details?.other}</p>
                        </div>
                      </div>
                    </Card>

                    {/* 2. Total Summary */}
                    <Card className="glass-card-premium p-8 border-cyan-500/20 bg-cyan-500/[0.02]">
                      <h2 className="text-sm font-black text-cyan-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                        <Info className="h-4 w-4" /> {t("analyzer.summary")}
                      </h2>
                      <p className="text-xl text-slate-200 leading-relaxed font-medium">
                        {result.summary}
                      </p>
                    </Card>

                    {/* 3. The Problem */}
                    <Card className="glass-card-premium p-10 border-red-500/20 bg-gradient-to-br from-red-500/[0.05] to-transparent">
                      <h2 className="text-sm font-black text-red-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                        <Activity className="h-5 w-5" /> {t("analyzer.diagnosis")}
                      </h2>
                      <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="h-24 w-24 rounded-[32px] bg-red-500/10 flex items-center justify-center text-red-500 shadow-2xl shadow-red-900/20 border border-red-500/20">
                          <Activity className="h-10 w-10 animate-pulse" />
                        </div>
                        <div className="text-center md:text-left">
                          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-3">{result.problem}</h3>
                          <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-widest border border-red-500/20">{t("analyzer.finding")}</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-widest border border-white/10">{t("analyzer.extract")}</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* 4. Medicines & Why */}
                    <div className="space-y-4">
                      <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] pl-2 flex items-center gap-2">
                        <Pill className="h-4 w-4" /> {t("analyzer.pharmacology")}
                      </h2>
                      <div className="grid gap-4">
                        {Array.isArray(result.medicines) && result.medicines.map((med, idx) => (
                          <div key={idx} className="glass-card-premium p-6 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col md:flex-row gap-6 md:items-center">
                            <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-white shrink-0">
                              <Pill className="h-7 w-7" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-xl font-black text-white">{med.name}</h4>
                                <span className="text-[10px] font-black px-3 py-1 rounded-full bg-lime-500/10 text-lime-400 border border-lime-500/20 uppercase tracking-widest">
                                  {t("analyzer.prescribed")}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t("analyzer.instruction")}</p>
                                  <p className="text-sm text-slate-300 font-medium">{med.usage}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t("analyzer.rationale")}</p>
                                  <p className="text-sm text-lime-400/80 font-medium italic">"{med.purpose}"</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {result.referral && typeof result.referral === "object" && result.referral.specialist && result.referral.specialist !== "None" && (
                      <Card className="glass-card-premium p-8 border-emerald-500/20 bg-emerald-500/[0.02]">
                        <h2 className="text-sm font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                          <UserPlus className="h-4 w-4" /> {t("analyzer.referral")}
                        </h2>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-emerald-500/30 flex-grow w-full md:w-auto">
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{t("analyzer.recommended_specialist")}</p>
                            <p className="text-2xl font-black text-white">{result.referral.specialist}</p>
                            <p className="text-slate-400 font-medium text-sm mt-3 leading-relaxed">
                              {result.referral.reason}
                            </p>
                          </div>
                          <Button className="h-16 px-10 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-black uppercase tracking-widest text-xs w-full md:w-auto">
                            {t("analyzer.find_near_me")}
                          </Button>
                        </div>
                      </Card>
                    )}

                    {/* Metrics/Findings */}
                    {Array.isArray(result.key_metrics) && result.key_metrics.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {result.key_metrics.map((metric, idx) => (
                          <div key={idx} className="glass-card-premium p-4 border-white/5 text-center">
                            <p className="text-xs font-bold text-slate-300">{metric}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20 flex gap-4">
                      <CircleAlert className="h-6 w-6 text-amber-500 shrink-0" />
                      <p className="text-xs text-amber-200/60 font-medium leading-relaxed">
                        {t("analyzer.disclaimer")}
                      </p>
                    </div>
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

