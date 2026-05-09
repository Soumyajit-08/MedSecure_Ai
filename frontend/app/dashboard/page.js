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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();

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
  const diagnoses = dashboardData?.data?.data?.recentDiagnoses || [];
  const reports = dashboardData?.data?.data?.recentReports || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />
      
      <main className="flex-grow px-4 py-8 md:px-12 lg:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Header */}
          <section className="mb-12 animate-fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">Patient Health Overview</p>
                <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
                  Good to have you back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">{user?.fullName?.split(" ")[0]}</span>
                </h1>
                <p className="mt-4 text-slate-400 max-w-xl">
                  Your centralised health overview. Monitor active prescriptions, review AI consultation history, and manage your medical records securely.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard label="Active Prescriptions" value={stats.activeMeds} icon="💊" color="lime" />
            <StatCard label="AI Consultations" value={stats.totalDiagnoses} icon="🧠" color="emerald" />
            <StatCard label="Medical Reports" value={stats.totalReports} icon="📄" color="blue" />
            <StatCard label="Data Security" value="Active" icon="🛡️" color="indigo" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Medications */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="h-8 w-1 bg-lime-500 rounded-full" />
                    Active Prescription Schedule
                  </h2>
                  <Button variant="outline" className="text-xs border-white/10 text-slate-400 hover:text-white">View All Medications</Button>
                </div>
                
                <div className="grid gap-4">
                  {medications.length > 0 ? (
                    medications.map((med, idx) => (
                      <MedicationCard key={idx} med={med} />
                    ))
                  ) : (
                    <EmptyState 
                      title="No active prescriptions on record" 
                      description="Use Medical Vision to scan your prescription and automatically add medications to your profile." 
                      actionText="Scan Prescription"
                      actionLink="/medical-vision"
                    />
                  )}
                </div>
              </section>

              {/* Health Trends Chart */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="h-8 w-1 bg-blue-500 rounded-full" />
                    Health Activity Trends
                  </h2>
                </div>
                <Card className="glass-card p-6 border-white/5 bg-white/[0.01] h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { name: 'Mon', value: 400 },
                        { name: 'Tue', value: 300 },
                        { name: 'Wed', value: 600 },
                        { name: 'Thu', value: 800 },
                        { name: 'Fri', value: 500 },
                        { name: 'Sat', value: 900 },
                        { name: 'Sun', value: 700 },
                      ]}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '12px' }}
                        itemStyle={{ color: '#84cc16' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#84cc16" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </section>

              {/* Recent Diagnoses Timeline */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="h-8 w-1 bg-emerald-500 rounded-full" />
                    AI Consultation History
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {diagnoses.length > 0 ? (
                    diagnoses.map((diag, idx) => (
                      <DiagnosisTimelineItem key={idx} diagnosis={diag} />
                    ))
                  ) : (
                    <EmptyState 
                      title="No consultation records found" 
                      description="Begin a consultation with our AI Clinical Assistant to generate your first medical analysis and build your health history." 
                      actionText="Start Consultation"
                      actionLink="/chatbot"
                    />
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar / Quick Actions */}
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-white mb-6">Quick Access</h2>
                <div className="grid gap-4">
                  <ActionCard 
                    title="AI Clinical Consultation" 
                    desc="Describe symptoms and receive structured guidance" 
                    link="/chatbot" 
                    icon="💬"
                    gradient="from-lime-600 to-emerald-600"
                  />
                  <ActionCard 
                    title="Medical Report Analysis" 
                    desc="Upload and interpret X-rays, labs & imaging" 
                    link="/medical-vision" 
                    icon="📸"
                    gradient="from-emerald-600 to-teal-600"
                  />
                  <ActionCard 
                    title="Specialist Appointment" 
                    desc="Connect with qualified medical specialists" 
                    link="/appointments" 
                    icon="📅"
                    gradient="from-teal-600 to-cyan-600"
                  />
                </div>
              </section>

              {/* Security Health */}
              <Card className="glass-card p-6 border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">HIPAA-Compliant Security</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">End-to-End Encryption Active</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All medical data is encrypted at rest and in transit, adhering to MedSecure AI privacy and data protection standards. Your full consultation history is accessible only to you.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  const colors = {
    lime: "border-lime-500/20 bg-lime-500/5 text-lime-400",
    emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
    blue: "border-blue-500/20 bg-blue-500/5 text-blue-400",
    indigo: "border-indigo-500/20 bg-indigo-500/5 text-indigo-400",
  };

  return (
    <Card className={`p-6 border ${colors[color]} glass-card`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <div className="h-2 w-2 rounded-full bg-current animate-pulse opacity-50" />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{label}</p>
    </Card>
  );
}

function MedicationCard({ med }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.04] hover:border-lime-500/20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-lime-500/10 flex items-center justify-center text-lime-400 text-xl border border-lime-500/10">
            💊
          </div>
          <div>
            <h4 className="font-bold text-white">{med.name}</h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-slate-400">{med.dosage}</span>
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span className="text-xs text-lime-400 font-medium">{med.frequency}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Next Dose</p>
          <p className="text-sm font-medium text-white">8:00 AM</p>
        </div>
      </div>
    </div>
  );
}

function DiagnosisTimelineItem({ diagnosis }) {
  return (
    <div className="relative pl-8 pb-8 border-l border-white/10 last:pb-0">
      <div className="absolute left-[-5px] top-0 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
      <div className="text-xs text-slate-500 mb-2">
        {new Date(diagnosis.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
      <Card className="glass-card p-4 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-white">{diagnosis.predictedDisease}</h4>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {Math.round(diagnosis.confidence * 100)}% Confidence
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {diagnosis.symptoms.slice(0, 3).map((s, idx) => (
            <span key={idx} className="text-[10px] text-slate-400 px-2 py-1 rounded-md bg-white/5 border border-white/10">
              {s}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ActionCard({ title, desc, link, icon, gradient }) {
  return (
    <Link href={link}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 p-1 transition-all hover:scale-[1.02] active:scale-[0.98]">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
        <div className="relative bg-[#111] p-5 rounded-[14px] flex items-center gap-4">
          <div className="text-2xl">{icon}</div>
          <div>
            <h4 className="font-bold text-white group-hover:text-lime-400 transition-colors">{title}</h4>
            <p className="text-xs text-slate-500">{desc}</p>
          </div>
          <svg className="h-5 w-5 ml-auto text-slate-700 group-hover:text-white transition-all transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ title, description, actionText, actionLink }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
      <p className="text-lg font-bold text-white mb-2">{title}</p>
      <p className="text-sm text-slate-500 mb-6 max-w-xs">{description}</p>
      <Link href={actionLink}>
        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
          {actionText}
        </Button>
      </Link>
    </div>
  );
}
