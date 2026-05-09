import { Suspense } from "react";
import SignupClient from "./SignupClient";
import { SmoothLoader } from "@/components/ui/smooth-loader";

export default function Page() {
  return (
    <Suspense fallback={<SmoothLoader fullPage text="Loading..." />}>
      <SignupClient />
    </Suspense>
  );
}
