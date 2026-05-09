import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#181818] py-12 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-xl font-bold text-white">MadSecure AI</h3>
            <p className="text-sm leading-6 text-slate-400 max-w-xs">
              A patient-first digital health platform providing AI-driven symptom assessment, medical report analysis, specialist guidance, and secure health record management.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-lime-400">Platform</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p>Symptom Assessment</p>
              <p>AI Clinical Consultation</p>
              <p>Medical Report Analysis</p>
              <p>Specialist Referral</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-lime-400">Safety</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p>No clinical diagnosis provided</p>
              <p>No self-prescribing guidance</p>
              <p>Urgent symptom alerts included</p>
              <p>Licensed physician consultation advised</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-lime-400">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <Link href="/#home" className="hover:text-white transition-colors w-fit">Home</Link>
              <Link href="/#search" className="hover:text-white transition-colors w-fit">Search Symptoms</Link>
              <Link href="/chatbot" className="hover:text-white transition-colors w-fit">AI Chatbot</Link>
              <Link href="/medical-vision" className="hover:text-white transition-colors w-fit">Medical Vision</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-lime-400">Developer</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-300">
              <p className="font-medium text-white">Soumyajit Nag</p>
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                8250597771
              </p>
              <a href="mailto:soumyajitnag2026@gmail.com" className="flex items-center gap-2 hover:text-lime-400 transition-colors">
                <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                soumyajitnag2026@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/soumyajit-nag" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-lime-400 transition-colors">
                <svg className="h-4 w-4 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} MadSecure AI. All rights reserved. For educational and informational purposes only.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <span className="hover:text-lime-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-lime-400 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
