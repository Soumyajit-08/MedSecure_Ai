"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/header";
import { authApi } from "@/services/api";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, [email, router]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await authApi.verifyEmail({ email, otp: otpString });
      // On success, the API returns user data and tokens, and our API service likely handles storage.
      // We can redirect to chatbot or home.
      router.push("/chatbot?verified=true");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md animate-fade-up">
          <div className="glass-card p-10 border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
            
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Email Address Verification</h1>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                A 6-digit security code has been dispatched to<br />
                <span className="text-cyan-400 font-medium">{email}</span>
              </p>
            </div>

            <form className="space-y-8" onSubmit={onSubmit}>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 outline-none transition-all"
                    autoComplete="off"
                  />
                ))}
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-shake">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <Button 
                  className="w-full py-7 text-lg font-bold shadow-xl shadow-cyan-900/20 rounded-xl" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Verifying Identity..." : "Confirm & Activate Account"}
                </Button>
                
                <p className="text-center text-xs text-slate-500">
                  Did not receive the code?{" "}
                  <button type="button" className="text-cyan-400 font-bold hover:underline underline-offset-4">
                    Resend Verification Email
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
