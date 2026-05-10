"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { SmoothLoader } from "./smooth-loader";

export function ProtectedRoute({ children, message = "Please login first to access this feature." }) {
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
      toast.error("Authentication Required", {
        description: message,
        duration: 5000,
      });
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, loading, router, message, mounted]);


  if (!mounted || loading) {
    return <SmoothLoader fullPage text="Verifying clinical credentials..." />;
  }


  if (!user) {
    return null; // Prevents flashing content while redirecting
  }

  return children;
}
