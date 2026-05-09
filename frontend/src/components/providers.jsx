"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "@/context/auth-context";
import { PageProgress } from "./providers/page-progress";
import { Toaster } from "sonner";

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
        <PageProgress />
        <Toaster theme="dark" richColors position="top-center" />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
