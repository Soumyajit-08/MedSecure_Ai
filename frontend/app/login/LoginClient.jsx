"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/layout/header";
import { authApi } from "@/services/api";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Login, 2: OTP Verification
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back to MedSecure AI. Your session is now active.");
      router.push("/");
    } catch (err) {
      if (err?.response?.status === 403) {
        setError("Account verification is incomplete. Please proceed with OTP verification.");
        setStep(2);
      } else {
        const msg = err?.response?.data?.message || "Invalid credentials. Please try again.";
        setError(msg);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const onVerifySubmit = async (e) => {
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
      toast.success("Email verified successfully. You may now access the platform.");
      router.push("/?verified=true");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md animate-fade-up">
          {/* Tab Switcher */}
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl mb-4 backdrop-blur-xl">
            <button 
              onClick={() => { setStep(1); setError(""); }}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${step === 1 ? "bg-lime-600 text-white shadow-lg shadow-lime-900/20" : "text-slate-400 hover:text-white"}`}
            >
              1. Sign In
            </button>
            <button 
              onClick={() => { setStep(2); setError(""); }}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${step === 2 ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" : "text-slate-400 hover:text-white"}`}
            >
              2. Verify OTP
            </button>
          </div>

          <div className="glass-card p-10 border-white/10 shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-500 ${step === 1 ? "bg-lime-500" : "bg-emerald-500"}`} />
            
            {step === 1 ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
                  <p className="mt-2 text-slate-400">Enter your details to access your dashboard</p>
                </div>

                <form className="space-y-5" onSubmit={onLoginSubmit}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-lime-400 ml-1">Email Address</label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="bg-white/5 border-white/10 py-6 focus:border-lime-400/50 transition-all rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-lime-400">Password</label>
                      <Link href="#" className="text-xs text-slate-500 hover:text-lime-400 transition-colors">Forgot password?</Link>
                    </div>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="••••••••"
                      required
                      className="bg-white/5 border-white/10 py-6 focus:border-lime-400/50 transition-all rounded-xl"
                    />
                  </div>

                  {error && (
                    <div className={`p-4 rounded-xl text-sm ${error.includes("verified") ? "bg-amber-500/10 border border-amber-500/20 text-amber-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                      {error}
                    </div>
                  )}

                  <Button 
                    className="w-full py-7 text-lg font-bold bg-lime-600 hover:bg-lime-500 shadow-xl shadow-lime-900/20 rounded-xl mt-4 border-none" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Authenticating..." : "Access My Account"}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Two-Factor Verification</h1>
                  <p className="mt-2 text-sm text-slate-400">
                    A secure verification code has been sent to <span className="text-emerald-400 font-medium">{email || "your registered email"}</span>.
                  </p>
                </div>

                <form className="space-y-8" onSubmit={onVerifySubmit}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-emerald-400 ml-1">Registered Email</label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Confirm your registered email"
                      required
                      className="bg-white/5 border-white/10 py-6 focus:border-emerald-400/50 transition-all rounded-xl"
                    />
                  </div>

                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-400/50 outline-none transition-all"
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <Button 
                    className="w-full py-7 text-lg font-bold bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-900/20 rounded-xl border-none" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Verifying Identity..." : "Verify & Proceed"}
                  </Button>
                </form>
              </>
            )}

            <div className="mt-8 text-center text-sm text-slate-500">
              New to MedSecure AI?{" "}
              <Link href="/signup" className="text-lime-400 font-bold hover:underline underline-offset-4">
                Create a Patient Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
