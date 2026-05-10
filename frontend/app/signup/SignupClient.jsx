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
import { Eye, EyeOff } from "lucide-react";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Details, 2: OTP Verification, 3: Success
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup({ ...form, role: "patient" });
      toast.success("Security verification code dispatched. Please check your secure inbox.");
      setStep(2); 
    } catch (err) {
      console.error("❌ Signup Error:", err.response?.data || err.message);
      const msg = err?.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
      toast.error(msg);
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

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await authApi.verifyEmail({ email: form.email, otp: otpString });
      toast.success("Identity verified. Your patient account has been successfully activated.");
      setStep(3);
      
      // Clear localStorage just in case authApi sets something, as user wants to go to login
      localStorage.removeItem("medsecure_access_token");
      localStorage.removeItem("medsecure_user");

      setTimeout(() => {
        router.push("/login");
      }, 3500);
    } catch (err) {
      console.error("❌ Verification Error:", err.response?.data || err.message);
      const msg = err?.response?.data?.message || "Invalid or expired code.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md animate-fade-up">
          <div className="glass-card p-10 border-white/10 shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-500 ${step === 1 ? "bg-lime-500" : step === 2 ? "bg-emerald-500" : "bg-cyan-500"}`} />
            
            {step === 3 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="relative mb-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-lime-500 rounded-full animate-ping opacity-20"
                  />
                  <div className="relative h-28 w-28 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border-2 border-lime-500/50 shadow-[0_0_40px_rgba(132,204,22,0.3)]">
                    <svg className="h-14 w-14 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </div>
                </div>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-black text-white mb-3 tracking-tight text-center"
                >
                  Account Secured
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-slate-400 text-center text-sm px-4"
                >
                  Your patient profile is ready. Redirecting you to secure login...
                </motion.p>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.5, ease: "linear" }}
                  className="h-1 bg-gradient-to-r from-lime-500 to-emerald-500 mt-8 rounded-full"
                />
              </motion.div>
            ) : step === 1 ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white tracking-tight">Create Patient Account</h1>
                  <p className="mt-2 text-slate-400">Register securely to begin your digital health journey with MedSecure AI.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSignup}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-lime-400 ml-1">Full Legal Name</label>
                    <Input
                      value={form.fullName}
                      onChange={(e) => setForm((v) => ({ ...v, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                      className="bg-white/5 border-white/10 py-6 focus:border-lime-400/50 transition-all rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-lime-400 ml-1">Email Address</label>
                    <Input
                      value={form.email}
                      onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="bg-white/5 border-white/10 py-6 focus:border-lime-400/50 transition-all rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-lime-400 ml-1">Password</label>
                    <div className="relative group">
                      <Input
                        value={form.password}
                        onChange={(e) => setForm((v) => ({ ...v, password: e.target.value }))}
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                        className="bg-white/5 border-white/10 py-6 pr-12 focus:border-lime-400/50 transition-all rounded-xl w-full"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-lime-400 transition-colors focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <Button 
                    className="w-full py-7 text-lg font-bold bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 shadow-xl shadow-lime-900/20 rounded-xl mt-2 border-none" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Register & Continue"}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center mb-8 animate-in fade-in zoom-in duration-300">
                  <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Verify Your Identity</h1>
                  <p className="mt-2 text-sm text-slate-400">
                    Enter the 6-digit security code sent to your registered email address.
                  </p>
                </div>

                <form className="space-y-8 animate-in slide-in-from-bottom-4 duration-300" onSubmit={handleVerify}>
                  <div className="space-y-2 opacity-60">
                    <label className="text-xs font-bold uppercase tracking-widest text-emerald-400 ml-1">Sending To</label>
                    <Input
                      value={form.email}
                      disabled
                      className="bg-white/5 border-white/10 py-6 text-slate-300 rounded-xl cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2 text-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-emerald-400">Security Code</label>
                    <div className="flex justify-between gap-2 mt-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-full h-14 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-400/50 outline-none transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button 
                      className="w-full py-7 text-lg font-bold bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-900/20 rounded-xl border-none" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Confirm & Activate Account"}
                    </Button>
                    
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      Return to Registration Details
                    </button>
                  </div>
                </form>
              </>
            )}

            <div className="mt-8 text-center text-sm text-slate-500">
              Already have a MedSecure AI account?{" "}
              <Link href="/login" className="text-lime-400 font-bold hover:underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
