"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/services/api";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmoothLoader } from "@/components/ui/smooth-loader";
import Link from "next/link";
import { motion } from "framer-motion";
import { HealthPredictiveChart } from "@/components/dashboard/health-predictive-chart";
import { HealthStreaks } from "@/components/dashboard/health-streaks";
import { Activity, Brain, FileText, ShieldCheck, Lock, Eye, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => dashboardApi.getStats(),
    enabled: !!user
  });

  if (authLoading || dashboardLoading) {
    return <SmoothLoader fullPage text="Loading your health profile..." />;
  }

  const stats = dashboardData?.data?.data?.stats || { totalDiagnoses: 0, totalReports: 0, activeMeds: 0 };
  const medications = dashboardData?.data?.data?.activeMedications || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />
      
      <main className="flex-grow px-4 py-8 md:px-12 lg:py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="mx-auto max-w-7xl relative z-10">
          {/* Welcome Header */}
          <section className="mb-12 animate-fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-lime-400 mb-2">{t('dashboard.intelligence')}</p>
                <h1 className="text-4xl font-black text-white md:text-6xl tracking-tight">
                  {t('dashboard.welcome')}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{user?.fullName?.split(" ")[0]}</span>
                </h1>
                <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
                  {t('dashboard.portal_desc')}
                </p>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
            <TabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")} label="Overview" />
            <TabButton active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} label="Health Analytics" />
            <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")} label="Security & Privacy" />
          </div>

          {activeTab === "overview" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label={t('dashboard.stats.prescriptions')} value={stats.activeMeds} icon={<Activity className="h-5 w-5" />} color="lime" />
                <StatCard label={t('dashboard.stats.ai_insights')} value={stats.totalDiagnoses} icon={<Brain className="h-5 w-5" />} color="emerald" />
                <StatCard label={t('dashboard.stats.reports')} value={stats.totalReports} icon={<FileText className="h-5 w-5" />} color="cyan" />
                <StatCard label={t('dashboard.stats.security')} value="HIPAA" icon={<ShieldCheck className="h-5 w-5" />} color="indigo" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-6">
                      <span className="h-1.5 w-6 bg-lime-500 rounded-full" />
                      {t('dashboard.charts.predictive_health')}
                    </h2>
                    <HealthPredictiveChart />
                  </section>

                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-black text-white flex items-center gap-3">
                        <span className="h-1.5 w-6 bg-emerald-500 rounded-full" />
                        {t('dashboard.medications.title')}
                      </h2>
                      <Button variant="ghost" className="text-xs text-slate-500 hover:text-white uppercase tracking-widest font-bold">
                        {t('dashboard.medications.history')}
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      {medications.length > 0 ? (
                        medications.map((med, idx) => <MedicationCard key={idx} med={med} />)
                      ) : (
                        <EmptyState 
                          title={t('dashboard.medications.empty')}
                          description={t('dashboard.medications.empty_desc')}
                          actionText={t('dashboard.medications.start_scan')}
                          actionLink="/medical-vision"
                        />
                      )}
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-black text-white mb-6">Engagement</h2>
                    <HealthStreaks />
                  </section>
                  <section>
                    <h2 className="text-2xl font-black text-white mb-6">Quick Intelligence</h2>
                    <div className="grid gap-4">
                      <ActionCard title={t('dashboard.actions.consultation')} desc={t('dashboard.actions.consultation_desc')} link="/chatbot" icon="🧠" gradient="from-lime-600 to-emerald-600" />
                      <ActionCard title={t('dashboard.actions.analyzer')} desc={t('dashboard.actions.analyzer_desc')} link="/prescription-analyzer" icon="📄" gradient="from-blue-600 to-indigo-600" />
                      <ActionCard title={t('dashboard.actions.vision')} desc={t('dashboard.actions.vision_desc')} link="/medical-vision" icon="👁️" gradient="from-emerald-600 to-teal-600" />
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <h2 className="text-3xl font-black text-white">Advanced Health Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6 glass-card border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Vitals Tracking</h3>
                  <div className="h-64 bg-white/5 rounded-2xl flex items-center justify-center italic text-slate-500">
                    Detailed vitals visualization coming soon
                  </div>
                </Card>
                <Card className="p-6 glass-card border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Risk Assessment</h3>
                  <div className="h-64 bg-white/5 rounded-2xl flex items-center justify-center italic text-slate-500">
                    AI-driven risk assessment model visualization
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <h2 className="text-3xl font-black text-white mb-8">Security & Privacy Controls</h2>
              <div className="grid gap-6">
                <SecurityOption icon={<Lock className="h-6 w-6 text-indigo-400" />} title="Encryption Standards" desc="Your data is encrypted using AES-256 at rest and TLS 1.3 in transit." status="Active" />
                <SecurityOption icon={<ShieldCheck className="h-6 w-6 text-lime-400" />} title="HIPAA Compliance" desc="MedSecure AI adheres to rigorous HIPAA standards for health data privacy." status="Verified" />
                <SecurityOption icon={<Eye className="h-6 w-6 text-cyan-400" />} title="Access Logs" desc="Monitor when and where your health records were accessed." button="View Logs" />
                <SecurityOption icon={<Globe className="h-6 w-6 text-emerald-400" />} title="Data Residency" desc="Your health data is stored in secure regional data centers." status="Global" />
              </div>

              <div className="mt-12 p-8 rounded-[32px] bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20">
                <div className="flex items-start gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Privacy First Policy</h4>
                    <p className="text-slate-400 leading-relaxed">
                      We never sell your health data. MedSecure AI is built on the principle of data sovereignty — you own your data and control who can see it.
                    </p>
                    <Button className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl">Download Privacy Report</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

function TabButton({ active, onClick, label }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-sm font-black transition-all whitespace-nowrap ${
        active ? "bg-lime-500 text-black shadow-lg shadow-lime-500/20" : "text-slate-500 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function SecurityOption({ icon, title, desc, status, button }) {
  return (
    <Card className="p-6 glass-card border-white/10 flex items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">{icon}</div>
        <div>
          <h4 className="text-lg font-bold text-white">{title}</h4>
          <p className="text-sm text-slate-500 mt-1">{desc}</p>
        </div>
      </div>
      {status && (
        <span className="px-4 py-1.5 rounded-full bg-lime-500/10 text-lime-400 text-xs font-black uppercase tracking-widest border border-lime-500/20">
          {status}
        </span>
      )}
      {button && (
        <Button variant="outline" className="border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-300">
          {button}
        </Button>
      )}
    </Card>
  );
}

function StatCard({ label, value, icon, color }) {
  const colors = {
    lime: "text-lime-400 border-lime-500/20",
    emerald: "text-emerald-400 border-emerald-500/20",
    cyan: "text-cyan-400 border-cyan-500/20",
    indigo: "text-indigo-400 border-indigo-500/20",
  };
  return (
    <Card className={`p-6 glass-card-premium border ${colors[color]} group relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110">{icon}</div>
        <div className="h-2 w-2 rounded-full bg-current animate-pulse shadow-[0_0_8px_currentColor]" />
      </div>
      <p className="text-3xl font-black text-white mb-1 relative z-10">{value}</p>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 relative z-10">{label}</p>
      <div className={`absolute -bottom-4 -right-4 h-20 w-20 rounded-full blur-[40px] opacity-20 ${color === 'lime' ? 'bg-lime-500' : color === 'emerald' ? 'bg-emerald-500' : color === 'cyan' ? 'bg-cyan-500' : 'bg-indigo-500'}`} />
    </Card>
  );
}

function MedicationCard({ med }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.05] hover:border-lime-500/30 glass-card-premium">
      <div className="flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-lime-500/10 flex items-center justify-center text-lime-400 text-2xl border border-lime-500/10 group-hover:scale-110 transition-transform">💊</div>
          <div>
            <h4 className="text-lg font-black text-white group-hover:text-lime-400 transition-colors">{med.name}</h4>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-xs font-medium text-slate-400">{med.dosage}</span>
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span className="text-xs text-lime-400 font-black uppercase tracking-widest">{med.frequency}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1.5">Next Interval</p>
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white inline-block">8:00 AM</div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-lime-500/50 group-hover:w-full transition-all duration-700" />
    </div>
  );
}

function ActionCard({ title, desc, link, icon, gradient }) {
  return (
    <Link href={link}>
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 p-1 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity blur-xl`} />
        <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl p-6 rounded-[22px] flex items-center gap-5 border border-white/5">
          <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">{icon}</div>
          <div className="flex-grow">
            <h4 className="text-lg font-black text-white group-hover:text-lime-400 transition-colors leading-tight">{title}</h4>
            <p className="text-xs text-slate-500 font-medium mt-1">{desc}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-lime-500 group-hover:text-black transition-all">
            <svg className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ title, description, actionText, actionLink }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-white/10 rounded-[40px] bg-white/[0.01] group hover:bg-white/[0.02] transition-all">
      <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Activity className="h-10 w-10 text-slate-600" />
      </div>
      <p className="text-xl font-black text-white mb-3 tracking-tight">{title}</p>
      <p className="text-sm text-slate-500 mb-8 max-w-xs leading-relaxed font-medium">{description}</p>
      <Link href={actionLink}>
        <Button className="h-12 px-8 rounded-2xl bg-white text-black font-black hover:bg-lime-400 transition-colors uppercase tracking-widest text-[10px]">
          {actionText}
        </Button>
      </Link>
    </div>
  );
}
