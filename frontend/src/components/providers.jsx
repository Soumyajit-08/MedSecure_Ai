"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, Suspense } from "react";
import { AuthProvider } from "@/context/auth-context";
import { PageProgress } from "./providers/page-progress";
import { Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import "@/lib/i18n";

export function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 20000, refetchOnWindowFocus: false } }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={null}>
          <PageProgress />
        </Suspense>
        <Toaster theme="dark" richColors position="top-center" />
        <AnimatePresence mode="wait">
          <motion.div
            key="page-wrapper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </AuthProvider>
    </QueryClientProvider>
  );
}



