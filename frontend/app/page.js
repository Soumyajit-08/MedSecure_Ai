"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { MotionCard, FloatingElement } from "@/components/ui/motion-card";
import { useTranslation } from "react-i18next";

const patientTools = [
  {
    title: "Symptom Triage",
    label: "Begin Assessment",
    status: "Available Now",
    href: "#search",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    text: "Describe your symptoms in plain language and receive an instant, structured risk assessment with clear, evidence-based next steps."
  },
  {
    title: "AI Clinical Assistant",
    label: "Guided Consultation",
    status: "Powered by Gemini",
    href: "/chatbot",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    text: "Receive structured guidance covering symptom analysis, key clinical findings, recommended care pathways, and urgent warning signs."
  },
  {
    title: "Specialist Matching",
    label: "Within 20 km",
    status: "Location-Enabled",
    href: "/chatbot",
    icon: "M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 10s7-4.438 7-11a7 7 0 10-14 0c0 6.562 7 11 7 11z",
    text: "Based on your consultation, receive tailored specialist recommendations and locate qualified healthcare providers in your area."
  },
  {
    title: "Medical Report Analysis",
    label: "Upload & Analyse",
    status: "Vision-Enabled",
    href: "/medical-vision",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z",
    text: "Upload lab results, X-rays, or medical imaging and receive clear, patient-friendly interpretations alongside specialist referral guidance."
  },
  {
    title: "Medication Safety",
    label: "Guidance Only",
    status: "No Self-Prescribing",
    href: "/chatbot",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    text: "Receive general medication awareness and safety guidance. Final prescriptions, dosages, and treatment decisions remain exclusively with your physician."
  }
];

const patientFlow = [
  "Describe your symptoms using everyday language.",
  "Receive an immediate, structured risk preview with actionable next steps.",
  "Continue to the AI Clinical Assistant for an in-depth, step-by-step analysis.",
  "Grant location access to identify qualified specialists within your vicinity.",
  "Bring your consultation summary, report findings, and prepared questions to your appointment."
];

const patientMetrics = [
  { value: "20 km", label: "Specialist search radius" },
  { value: "7", label: "Structured response sections" },
  { value: "24/7", label: "Continuous health support" }
];

export default function HomePage() {
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".mobile-stagger");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-slate-100 pb-20 md:pb-0">
      <Header />

      {/* Hero Section */}
      <section id="home" className="hero-glow relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <FloatingElement className="absolute top-[15%] left-[5%] w-32 h-32 bg-lime-500/10 rounded-full blur-3xl" duration={6} />
          <FloatingElement className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-lime-500/10 rounded-full blur-3xl" duration={8} delay={1} />
        </div>

        <div className="relative mx-auto grid min-h-[84vh] max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1fr_0.92fr] md:px-8">
          <div className="animate-fade-up flex flex-col justify-center mobile-stagger">
            <p className="mb-4 w-fit rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1 text-sm font-medium tracking-wide text-lime-100">
              {t("home.badge")}
            </p>
            <h1 className="max-w-4xl bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-4xl font-extrabold leading-[1.1] tracking-tight text-transparent md:text-5xl lg:text-6xl pb-4">
              {t("home.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
              {t("home.desc")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 backdrop-blur-md uppercase tracking-wider">
                <svg className="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                {/* AWS Cloud Infrastructure */}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-lime-500/20 bg-lime-500/10 px-3 py-1.5 text-xs font-bold text-lime-400 backdrop-blur-md uppercase tracking-wider">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                HIPAA Compliant
              </span>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-5">
              <a href="#search" className="w-full sm:w-auto">
                <Button className="btn-premium w-full px-10 py-8 text-xl bg-lime-600 hover:bg-lime-500 shadow-2xl shadow-lime-900/30 border-none rounded-[20px]">{t("home.assess")}</Button>
              </a>
              <a href="#chatbot" className="w-full sm:w-auto">
                <Button className="btn-premium w-full px-10 py-8 text-xl bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 backdrop-blur-xl rounded-[20px]">
                  {t("home.consult")}
                </Button>
              </a>
            </div>
          </div>

          <div className="animate-float-soft hidden md:flex items-center">
            <MotionCard className="w-full">
              <div className="glass-card w-full overflow-hidden shadow-2xl shadow-slate-900/10">
                <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="text-sm font-semibold text-white">Patient Journey Preview</p>
                  <p className="mt-1 text-xs text-slate-400">Search, understand, continue care</p>
                </div>
                <div className="space-y-4 p-5">
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase text-slate-400">Patient search</p>
                    <p className="mt-2 text-sm leading-6 text-slate-100">
                      fever, cough, throat pain, chest discomfort
                    </p>
                  </div>
                  <div className="rounded-lg border border-lime-300/25 bg-lime-300/10 p-4">
                    <p className="text-xs uppercase text-lime-100">Local NLP response</p>
                    <p className="mt-2 text-sm leading-6 text-slate-100">
                      Local symptom data shows a respiratory pattern. Track temperature,
                      breathing, and duration.
                    </p>
                  </div>
                </div>
              </div>
            </MotionCard>
          </div>
        </div>
      </section>

      {/* AI Chatbot Section */}
      <section id="chatbot" className="border-b border-white/10 bg-[#222222] px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] mobile-stagger">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">AI Clinical Assistant</p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Structured guidance, available immediately.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Our AI Clinical Assistant enables patients to understand symptom severity, review clinical findings, and prepare comprehensive notes prior to their medical appointment.
            </p>
            <Link href="/chatbot" className="mt-6 inline-block w-full sm:w-auto">
              <Button className="w-full px-8 py-6 text-lg bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 shadow-xl shadow-lime-900/20 border-none">
                Begin Consultation
              </Button>
            </Link>
          </div>
          <div className="glass-card p-5 animate-float-mobile">
            <div className="space-y-4">
              <div className="max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Patient</p>
                <p className="text-sm leading-6 text-slate-100">How long should a fever last?</p>
              </div>
              <div className="ml-auto max-w-[85%] rounded-2xl border border-lime-300/20 bg-lime-400/10 p-4">
                <p className="text-[10px] uppercase tracking-wider text-lime-500 mb-1 text-right">MedSecure AI Bot</p>
                <p className="text-sm leading-6 text-slate-100">Typical viral fevers last 3-5 days. Monitor temperature and hydration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Toolset Section */}
      <section id="tools" className="border-b border-white/10 bg-[#181818] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl mobile-stagger">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">Clinical Toolset</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
                  Purpose-built for patient care.
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-300">
                  A curated suite of clinical tools designed to support symptom comprehension, diagnostic report review, specialist identification, and evidence-based consultation preparation.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {patientMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-2xl font-bold text-lime-300">{metric.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-lime-400/15 bg-lime-400/[0.04] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">Standard Patient Workflow</p>
                <div className="mt-5 space-y-4">
                  {patientFlow.map((step, index) => (
                    <div key={step} className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lime-400/25 bg-lime-400/10 text-xs font-bold text-lime-200">
                        {index + 1}
                      </div>
                      <p className="pt-1 text-sm leading-6 text-slate-300">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {patientTools.map((tool) => (
                <MotionCard key={tool.title} className="h-full">
                  <Link href={tool.href} className="group block h-full">
                    <div className="h-full rounded-3xl border border-white/10 bg-[#121212]/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-lime-400/40 hover:bg-[#181818] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/10">
                          <svg className="h-5 w-5 text-lime-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={tool.icon} />
                          </svg>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          {tool.status}
                        </span>
                      </div>

                      <div className="mt-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">{tool.label}</p>
                        <h3 className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-lime-200">
                          {tool.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{tool.text}</p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="text-xs font-semibold text-slate-400">Open tool</span>
                        <svg className="h-5 w-5 text-lime-300 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </MotionCard>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-[#222222] p-6 md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-300">Pre-Consultation Preparation</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">Arrive informed. Consult with confidence.</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                    MedSecure AI structures your health data — symptoms, report values, medication history, and specialist requirements — so every clinical consultation is more productive and informed.
                  </p>
                </div>
                <Link href="/chatbot" className="shrink-0">
                  <Button className="w-full rounded-2xl bg-lime-600 px-6 py-6 text-base font-bold hover:bg-lime-500">
                    Start Consultation
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Clinical Disclaimer</p>
              <p className="mt-3 text-sm leading-6 text-amber-50/80">
                All medication information provided by MedSecure AI is strictly for educational awareness. Definitive prescriptions, therapeutic dosages, and treatment protocols must be determined exclusively by a licensed medical professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="bg-transparent px-5 py-20 md:px-8 mb-10">
        <div className="glass-card mx-auto max-w-5xl p-8 md:p-12 relative overflow-hidden mobile-stagger">
          <div className="absolute top-0 left-0 w-1 h-full bg-lime-500" />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">Patient Safety &amp; Compliance</p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Clinical Guidelines &amp; Reliability Standards
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-400 italic">
            &quot;MedSecure AI is designed to support patient awareness and facilitate preliminary health assessment. It does not constitute, nor should it be interpreted as, a professional clinical diagnosis. For urgent or emergency symptoms, please seek immediate medical attention from a qualified healthcare provider.&quot;
          </p>
        </div>
      </section>
    </main>
  );
}
