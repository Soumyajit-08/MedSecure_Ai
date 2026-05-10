"use client";

import { useState, useEffect, useMemo, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { chatbotApi } from "@/services/api";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";

import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothLoader } from "@/components/ui/smooth-loader";
import { BodyMap } from "@/components/chatbot/body-map";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { useTranslation } from "react-i18next";

function ChatbotContent() {

  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("message") || "";
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  const [message, setMessage] = useState(initialMessage);
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [doctorLocation, setDoctorLocation] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  const speak = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const chat = useMutation({
    mutationFn: (payload) => chatbotApi.chat(payload),
    onSuccess: (response) => {
      const botResponse = response.data.data.response;
      const firstName = user?.fullName?.split(" ")[0] || "Patient";
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: botResponse,
          doctorRecommendation: response.data.data.doctorRecommendation
        }
      ]);
      speak(botResponse);
      toast.success(`${firstName}, clinical analysis is complete. Review the summary below.`);
    },

    onError: (err) => {
      console.error("Chat error:", err);
      const status = err?.response?.status;
      const apiMessage = err?.response?.data?.message;
      const text =
        status === 401
          ? "Your session has expired. Please log in again, then retry your message."
          : apiMessage || "I could not reach the chat service. Please try again in a moment.";
      setMessages((prev) => [...prev, { role: "bot", text }]);
    }
  });

  const { data: history } = useQuery({
    queryKey: ["chat-history"],
    queryFn: () => chatbotApi.getHistory(),
    enabled: !!user
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages, chat.isPending]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isAtBottom);
    }
  };


  const send = () => {
    if ((!message.trim() && !selectedFile) || !user) return;
    
    const userMsg = { role: "user", text: message || `Uploaded: ${selectedFile?.name}` };
    setMessages((prev) => [...prev, userMsg]);
    
    const formData = new FormData();
    formData.append("query", message);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    
    chat.mutate(formData);
    setMessage("");
    setSelectedFile(null);
    setError("");
    setLocationStatus("");
    setDoctorLocation(null);
  };

  const requestDoctorLocation = () => {
    setLocationStatus("");
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationStatus("Location is not supported in this browser.");
      return;
    }

    setLocationStatus("Requesting location permission...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDoctorLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLocationStatus("Location added. Nearby doctor links are ready.");
      },
      (geoError) => {
        const message =
          geoError.code === geoError.PERMISSION_DENIED
            ? "Location permission was denied. Allow location access to see nearby doctors."
            : "Could not get your location. Please try again.";
        setLocationStatus(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const buildDoctorMapUrl = (recommendation, mode = "search") => {
    if (!recommendation || !doctorLocation) return "";
    const coords = `${doctorLocation.latitude},${doctorLocation.longitude}`;
    const query = `${recommendation.specialist} within ${recommendation.radiusKm || 20} km`;

    if (mode === "directions") {
      return `https://www.google.com/maps/dir/?api=1&origin=${coords}&destination=${encodeURIComponent(recommendation.specialist)}&travelmode=driving`;
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&center=${coords}`;
  };

  // Voice Input Logic
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");

  const speechSupported = useMemo(() => {
    return typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  const recognition = useMemo(() => {
    if (!speechSupported) return null;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";
    return rec;
  }, [speechSupported]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setVoiceError(`Voice error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [recognition]);

  const startVoiceInput = () => {
    if (!recognition) return;
    setVoiceError("");
    try {
      recognition.start();
      setIsListening(true);
    } catch (err) {
      console.error(err);
    }
  };

  const stopVoiceInput = () => {
    if (!recognition) return;
    recognition.stop();
    setIsListening(false);
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      stopVoiceInput();
      return;
    }
    startVoiceInput();
  };

  if (loading) return <SmoothLoader fullPage text="Securing session..." />;

  return (
    <ProtectedRoute message="AI Clinical Consultation requires an active patient session.">
      <div className="min-h-screen flex flex-col">

      <Header />
      <main className="flex-grow px-4 py-8 text-slate-100 md:px-8">
        <div className="mx-auto max-w-5xl">
          <section className="mb-8 animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">{t("chatbot.badge")}</p>
            <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
              {t("chatbot.title")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
              {t("chatbot.desc")}
            </p>
          </section>

          {!loading && !user && (
            <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <p className="text-sm text-amber-200/80">
                {t("chatbot.login_warning")}
              </p>
            </div>
          )}


          <Card className={`glass-card border-white/10 overflow-hidden shadow-2xl flex flex-col h-[60vh] relative ${!user ? "opacity-30 pointer-events-none grayscale-[0.5]" : ""}`}>
            <div 
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="flex-grow space-y-4 overflow-y-auto p-6 custom-scrollbar scroll-smooth"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 mb-6">{t("chatbot.greeting")}</p>
                  <div className="w-full max-w-[280px] animate-fade-in [animation-delay:400ms]">
                    <BodyMap onSelectPart={(label) => setMessage(`I have an issue with my ${label}. `)} />
                  </div>
                </div>
              )}
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${item.role === "user" ? "items-end" : "items-start"} animate-fade-in`}
                >
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 px-2">
                    {item.role === "user" ? t("chatbot.you") : t("chatbot.bot")}
                  </p>
                  <div
                    className={`max-w-[92%] rounded-2xl px-5 py-3 text-sm leading-7 ${
                      item.role === "user"
                        ? "bg-gradient-to-br from-lime-600 to-emerald-600 text-white"
                        : "bg-white/5 border border-white/10 text-slate-200"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{item.text}</p>
                  </div>

                  {item.role === "bot" && item.doctorRecommendation && (
                    <div className="mt-3 w-full max-w-[92%] rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4 text-sm text-slate-200">
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-lime-300">{t("chatbot.recommendation")}</p>
                        <h3 className="text-base font-bold text-white">{item.doctorRecommendation.specialist}</h3>
                        <p className="leading-6 text-slate-300">{item.doctorRecommendation.reason}</p>
                        <p className="mt-1 text-xs leading-5 text-amber-200">{item.doctorRecommendation.urgency}</p>
                      </div>

                      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{t("chatbot.medication")}</p>
                        <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-300">
                          {item.doctorRecommendation.medicineGuidance?.map((guidance) => (
                            <li key={guidance}>- {guidance}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <Button
                          type="button"
                          onClick={requestDoctorLocation}
                          className="h-10 rounded-xl bg-lime-600 px-4 text-xs font-bold hover:bg-lime-500"
                        >
                          {t("chatbot.share_location")}
                        </Button>

                        {doctorLocation && (
                          <>
                            <a
                              href={buildDoctorMapUrl(item.doctorRecommendation)}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold text-white transition hover:bg-white/10"
                            >
                              {t("chatbot.find_specialists")}
                            </a>
                            <a
                              href={buildDoctorMapUrl(item.doctorRecommendation, "directions")}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold text-white transition hover:bg-white/10"
                            >
                              {t("chatbot.directions")}
                            </a>
                          </>
                        )}
                      </div>

                      {locationStatus && (
                        <p className="mt-3 text-xs leading-5 text-slate-400">{locationStatus}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Thinking Indicator */}
              {chat.isPending && (
                <div className="flex flex-col items-start animate-fade-in">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 px-2">{t("chatbot.bot")}</p>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-slate-400 flex items-center gap-4 min-w-[200px] relative overflow-hidden group">
                    <div className="relative h-6 w-12 shrink-0">
                      <svg viewBox="0 0 50 20" className="h-full w-full">
                        <motion.path
                          d="M0,10 L15,10 L20,2 L30,18 L35,10 L50,10"
                          stroke="#89E900"
                          strokeWidth="2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </svg>
                    </div>
                    <span className="shimmer-text">{t("chatbot.analyzing")}</span>
                    
                    {/* Scanning line effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-lime-500/10 to-transparent w-20 h-full"
                      animate={{ left: ["-20%", "120%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Scroll to Bottom Button */}
            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 h-9 rounded-full border border-white/20 bg-black/60 text-white text-xs font-semibold shadow-xl backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                {t("chatbot.scroll")}
              </button>
            )}

            <div className="p-4 border-t border-white/10 bg-white/[0.02]">
              {error && <p className="text-xs text-red-400 mb-2 px-2">{error}</p>}
              {voiceError && <p className="text-xs text-amber-400 mb-2 px-2">{voiceError}</p>}
              
              {/* File Preview */}
              {selectedFile && (
                <div className="mx-2 mb-3 p-2 px-4 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-between animate-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span className="text-xs text-lime-100 font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                  </div>
                  <button onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-white transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="relative flex-grow">
                  <Input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") send();
                    }}
                    placeholder={isListening ? t("chatbot.listening") : t("chatbot.input_placeholder")}
                    className="bg-white/5 border-white/10 py-7 pl-14 pr-12 focus:border-lime-500/50 rounded-2xl"
                  />
                  
                  {/* File Upload Trigger */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                    <button
                      onClick={() => document.getElementById("chat-file-input").click()}
                      className="p-2 rounded-xl text-slate-400 hover:text-lime-400 hover:bg-white/5 transition-all"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    <input 
                      id="chat-file-input"
                      type="file" 
                      className="hidden" 
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </div>

                  <button
                    onClick={toggleVoiceInput}
                    disabled={!speechSupported || chat.isPending || !user}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                      isListening ? "bg-lime-500 text-white animate-pulse" : "text-slate-400 hover:text-lime-400 hover:bg-white/5"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14ZM17.3 11C17.3 14 14.76 16.1 12 16.1C9.24 16.1 6.7 14 6.7 11H5C5 14.41 7.72 17.24 11.2 17.72V21H12.8V17.72C16.28 17.24 19 14.41 19 11H17.3Z" />
                    </svg>
                  </button>
                </div>
                <Button 
                  onClick={send} 
                  disabled={chat.isPending || !user || (!message.trim() && !selectedFile)} 
                  className="h-14 px-8 rounded-2xl bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 shadow-xl shadow-lime-900/20 border-none transition-all active:scale-95"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M3 20.25L21 12L3 3.75V10.5L15 12L3 13.5V20.25Z" />
                  </svg>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}


export default function ChatbotPage() {
  return (
    <Suspense fallback={null}>
      <ChatbotContent />
    </Suspense>
  );
}
