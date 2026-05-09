import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";
import { SmoothLoader } from "@/components/ui/smooth-loader";

export default function Page() {
  return (
    <Suspense fallback={<SmoothLoader fullPage text="Loading..." />}>
      <VerifyEmailClient />
    </Suspense>
  );
}
