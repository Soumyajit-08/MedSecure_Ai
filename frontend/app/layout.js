import "./globals.css";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/layout/footer";
import { CursorSpotlight } from "@/components/layout/cursor-spotlight";
import { EntranceReveal } from "@/components/ui/entrance-reveal";
import { FloatingChatbot } from "@/components/layout/floating-chatbot";
import { BottomNav } from "@/components/layout/bottom-nav";




export const metadata = {
  title: "MedSecure AI - Secure Healthcare Platform",
  description: "Secure Healthcare AI platform for patient care and data security",
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e.message && (e.message.includes('MetaMask') || e.message.includes('nkbihfbeogaeaoehlefnkodbefgpgknn'))) {
                  e.stopImmediatePropagation();
                }
              });
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && (e.reason.message.includes('MetaMask') || e.reason.message.includes('nkbihfbeogaeaoehlefnkodbefgpgknn'))) {
                  e.stopImmediatePropagation();
                }
              });
            `,
          }}
        />
        <EntranceReveal />
        <Providers>
          <CursorSpotlight />
          <div className="flex-grow relative z-10 pt-24">
            {children}
          </div>


          <FloatingChatbot />
          <BottomNav />
          <Footer />



        </Providers>
      </body>
    </html>
  );
}

