import { Suspense } from "react";
import LoginClient from "./LoginClient";
import { SmoothLoader } from "@/components/ui/smooth-loader";

export default function Page() {
  return (
    <Suspense fallback={<SmoothLoader fullPage text="Loading..." />}>
      <LoginClient />
    </Suspense>
  );
}
