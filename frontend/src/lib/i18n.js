import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "dashboard": {
        "welcome": "Welcome",
        "intelligence": "Neural Health Intelligence",
        "portal_desc": "Your AI-enhanced health portal. Monitor vitals, track prescriptions, and explore predictive clinical insights.",
        "stats": {
          "prescriptions": "Prescriptions",
          "ai_insights": "AI Insights",
          "reports": "Reports",
          "security": "Security"
        },
        "charts": {
          "predictive_health": "Predictive Health Analytics"
        },
        "medications": {
          "title": "Clinical Schedule",
          "history": "Schedule History",
          "empty": "No active prescriptions",
          "empty_desc": "Use Medical Vision to digitise your prescription papers.",
          "start_scan": "Start Scan"
        },
        "actions": {
          "consultation": "AI Consultation",
          "consultation_desc": "Contextual symptom analysis",
          "analyzer": "Prescription Analyzer",
          "analyzer_desc": "Deep clinical report extraction",
          "vision": "Vision Analysis",
          "vision_desc": "OCR for medical reports"
        }
      },
      "home": {
        "badge": "AI-Powered Patient Health Platform",
        "title": "Intelligent symptom analysis. Trusted clinical guidance.",
        "desc": "MedSecure AI is a patient-first digital health platform offering structured symptom assessment, AI-driven consultation, and secure medical record management.",
        "assess": "Assess Symptoms",
        "consult": "Start Consultation"
      },
      "chatbot": {
        "badge": "AI Clinical Assistant",
        "title": "Medical AI Consultation",
        "desc": "Describe your symptoms or ask clinical questions. Your consultation is encrypted and securely stored to your patient profile.",
        "login_warning": "Please sign in to preserve your consultation history and receive personalised clinical guidance.",
        "greeting": "How may I assist you today?",
        "you": "You",
        "bot": "MedSecure_Ai",
        "recommendation": "Specialist Recommendation",
        "medication": "Medication Guidance",
        "share_location": "Share My Location",
        "find_specialists": "Find Specialists Within 20 km",
        "directions": "Get Directions",
        "analyzing": "Analysing your clinical query...",
        "scroll": "Scroll to latest",
        "input_placeholder": "Describe your symptoms or ask a clinical question...",
        "listening": "Listening — please speak now..."
      },
      "analyzer": {
        "badge": "Neural Clinical Extraction",
        "title": "Prescription Analyzer",
        "desc": "Upload any medical document—prescriptions, blood tests, X-rays, or ECGs. Our AI scans the layers to give you a structured, simple breakdown.",
        "drop": "Drop medical file",
        "formats": "PNG, JPG or PDF documents",
        "remove": "Remove",
        "change": "Change",
        "scanning": "Deep-Scanning Document...",
        "analyze": "Initialize AI Analysis",
        "ready": "Ready for Medical Processing...",
        "ready_desc": "Analysis results will appear here in a structured format.",
        "patient": "Patient Identification",
        "name": "Full Name",
        "age": "Age",
        "gender": "Gender",
        "metadata": "Metadata",
        "summary": "Clinical Summary",
        "diagnosis": "Neural Analysis: Primary Diagnosis",
        "finding": "Critical Finding",
        "extract": "Neural Extract",
        "pharmacology": "Pharmacological Breakdown",
        "prescribed": "Prescribed",
        "instruction": "Instruction",
        "rationale": "Clinical Rationale",
        "referral": "Specialist Referral",
        "recommended_specialist": "Recommended Specialist",
        "find_near_me": "Find Near Me",
        "disclaimer": "IMPORTANT: This is an AI-generated clinical analysis intended for informational purposes only. Please verify these findings with a licensed medical professional before taking any action or changing your medication."
      },
      "nav": {
        "home": "Home",
        "dashboard": "Dashboard",
        "analytics": "Analytics",
        "settings": "Settings",
        "privacy": "Privacy",
        "chatbot": "Chatbot",
        "analyzer": "Analyzer",
        "login": "Login",
        "join_now": "Join Now",
        "recent_chats": "Recent Chats",
        "clear_all": "Clear All",
        "no_recent_chats": "No recent chats",
        "add_account": "Add New Account",
        "switch_account": "Switch Account",
        "logout": "Logout"
      }
    }
  },
  bn: {
    translation: {
      "dashboard": {
        "welcome": "স্বাগতম",
        "intelligence": "নিউরাল হেলথ ইন্টেলিজেন্স",
        "portal_desc": "আপনার এআই-চালিত স্বাস্থ্য পোর্টাল। গুরুত্বপূর্ণ লক্ষণগুলি পর্যবেক্ষণ করুন এবং ক্লিনিকাল অন্তর্দৃষ্টি অন্বেষণ করুন।",
        "stats": {
          "prescriptions": "প্রেসক্রিপশন",
          "ai_insights": "এআই অন্তর্দৃষ্টি",
          "reports": "রিপোর্ট",
          "security": "নিরাপত্তা"
        },
        "charts": {
          "predictive_health": "ভবিষ্যদ্বাণীমূলক স্বাস্থ্য বিশ্লেষণ"
        },
        "medications": {
          "title": "ক্লিনিকাল সময়সূচী",
          "history": "সময়সূচীর ইতিহাস",
          "empty": "কোনো সক্রিয় প্রেসক্রিপশন নেই",
          "empty_desc": "আপনার প্রেসক্রিপশনের কাগজগুলি ডিজিটাইজ করতে মেডিকেল ভিশন ব্যবহার করুন।",
          "start_scan": "স্ক্যান শুরু করুন"
        },
        "actions": {
          "consultation": "এআই পরামর্শ",
          "consultation_desc": "প্রাসঙ্গিক উপসর্গ বিশ্লেষণ",
          "analyzer": "প্রেসক্রিপশন বিশ্লেষক",
          "analyzer_desc": "গভীর ক্লিনিকাল রিপোর্ট নিষ্কাশন",
          "vision": "ভিশন বিশ্লেষণ",
          "vision_desc": "মেডিকেল রিপোর্টের জন্য ওসিআর"
        }
      },
      "home": {
        "badge": "এআই-চালিত পেশেন্ট হেলথ প্ল্যাটফর্ম",
        "title": "বুদ্ধিমান উপসর্গ বিশ্লেষণ। বিশ্বস্ত ক্লিনিকাল নির্দেশিকা।",
        "desc": "মেডসিকিউর এআই একটি পেশেন্ট-ফার্স্ট ডিজিটাল হেলথ প্ল্যাটফর্ম যা কাঠামোগত উপসর্গ মূল্যায়ন, এআই-চালিত পরামর্শ এবং সুরক্ষিত মেডিকেল রেকর্ড ব্যবস্থাপনা প্রদান করে।",
        "assess": "উপসর্গ মূল্যায়ন করুন",
        "consult": "পরামর্শ শুরু করুন"
      },
      "chatbot": {
        "badge": "এআই ক্লিনিকাল সহকারী",
        "title": "মেডিকেল এআই পরামর্শ",
        "desc": "আপনার উপসর্গগুলি বর্ণনা করুন বা ক্লিনিকাল প্রশ্ন জিজ্ঞাসা করুন। আপনার পরামর্শ এনক্রিপ্ট করা এবং আপনার রোগী প্রোফাইলে নিরাপদে সংরক্ষিত।",
        "login_warning": "আপনার পরামর্শের ইতিহাস সংরক্ষণ করতে এবং ব্যক্তিগতকৃত ক্লিনিকাল গাইডেন্স পেতে দয়া করে সাইন ইন করুন।",
        "greeting": "আমি আজ আপনাকে কীভাবে সহায়তা করতে পারি?",
        "you": "আপনি",
        "bot": "মেডসিকিউর_এআই",
        "recommendation": "বিশেষজ্ঞের সুপারিশ",
        "medication": "ওষুধের নির্দেশনা",
        "share_location": "আমার অবস্থান শেয়ার করুন",
        "find_specialists": "২০ কিমির মধ্যে বিশেষজ্ঞ খুঁজুন",
        "directions": "দিকনির্দেশ পান",
        "analyzing": "আপনার ক্লিনিকাল কোয়েরি বিশ্লেষণ করা হচ্ছে...",
        "scroll": "সর্বশেষে স্ক্রোল করুন",
        "input_placeholder": "আপনার উপসর্গগুলি বর্ণনা করুন বা একটি ক্লিনিকাল প্রশ্ন জিজ্ঞাসা করুন...",
        "listening": "শুনছি — দয়া করে এখন কথা বলুন..."
      },
      "analyzer": {
        "badge": "নিউরাল ক্লিনিকাল এক্সট্রাকশন",
        "title": "প্রেসক্রিপশন বিশ্লেষক",
        "desc": "যেকোনো মেডিকেল ডকুমেন্ট আপলোড করুন—প্রেসক্রিপশন, রক্ত পরীক্ষা, এক্স-রে বা ইসিজি। আমাদের এআই একটি কাঠামোগত, সহজ ব্রেকডাউন দিতে লেয়ার স্ক্যান করে।",
        "drop": "মেডিকেল ফাইল ড্রপ করুন",
        "formats": "পিএনজি, জেপিজি বা পিডিএফ ডকুমেন্টস",
        "remove": "সরান",
        "change": "পরিবর্তন",
        "scanning": "ডিপ-স্ক্যানিং ডকুমেন্ট...",
        "analyze": "এআই বিশ্লেষণ শুরু করুন",
        "ready": "মেডিকেল প্রসেসিংয়ের জন্য প্রস্তুত...",
        "ready_desc": "বিশ্লেষণের ফলাফল একটি কাঠামোগত বিন্যাসে এখানে প্রদর্শিত হবে।",
        "patient": "রোগী সনাক্তকরণ",
        "name": "পুরো নাম",
        "age": "বয়স",
        "gender": "লিঙ্গ",
        "metadata": "মেটাডেটা",
        "summary": "ক্লিনিকাল সারাংশ",
        "diagnosis": "নিউরাল বিশ্লেষণ: প্রাথমিক রোগ নির্ণয়",
        "finding": "গুরুত্বপূর্ণ ফাইন্ডিং",
        "extract": "নিউরাল এক্সট্র্যাক্ট",
        "pharmacology": "ফার্মাকোলজিক্যাল ব্রেকডাউন",
        "prescribed": "নির্ধারিত",
        "instruction": "নির্দেশনা",
        "rationale": "ক্লিনিকাল যুক্তি",
        "referral": "বিশেষজ্ঞ রেফারেল",
        "recommended_specialist": "সুপারিশকৃত বিশেষজ্ঞ",
        "find_near_me": "আমার কাছাকাছি খুঁজুন",
        "disclaimer": "গুরুত্বপূর্ণ: এটি শুধুমাত্র তথ্যের উদ্দেশ্যে এআই-উত্পাদিত ক্লিনিকাল বিশ্লেষণ। কোনো ব্যবস্থা নেওয়ার আগে বা ওষুধ পরিবর্তন করার আগে লাইসেন্সপ্রাপ্ত মেডিকেল প্রফেশনালের সাথে এই ফলাফলগুলি যাচাই করুন।"
      },
      "nav": {
        "home": "হোম",
        "dashboard": "ড্যাশবোর্ড",
        "analytics": "বিশ্লেষণ",
        "settings": "সেটিংস",
        "privacy": "গোপনীয়তা",
        "chatbot": "চ্যাটবট",
        "analyzer": "অ্যানালাইজার",
        "login": "লগইন",
        "join_now": "যোগ দিন",
        "recent_chats": "সাম্প্রতিক চ্যাট",
        "clear_all": "সব মুছুন",
        "no_recent_chats": "কোনো সাম্প্রতিক চ্যাট নেই",
        "add_account": "নতুন অ্যাকাউন্ট যোগ করুন",
        "switch_account": "অ্যাকাউন্ট পরিবর্তন করুন",
        "logout": "লগআউট"
      }
    }
  },
  hi: {
    translation: {
      "dashboard": {
        "welcome": "स्वागत है",
        "intelligence": "न्यूरल हेल्थ इंटेलिजेंस",
        "portal_desc": "आपका एआई-उन्नत स्वास्थ्य पोर्टल। महत्वपूर्ण संकेतों की निगरानी करें और भविष्य कहनेवाला अंतर्दृष्टि का पता लगाएं।",
        "stats": {
          "prescriptions": "नुस्खे",
          "ai_insights": "एआई अंतर्दृष्टि",
          "reports": "रिपोर्ट",
          "security": "सुरक्षा"
        },
        "charts": {
          "predictive_health": "भविष्य कहनेवाला स्वास्थ्य विश्लेषण"
        },
        "medications": {
          "title": "नैदानिक अनुसूची",
          "history": "अनुसूची इतिहास",
          "empty": "कोई सक्रिय नुस्खे नहीं",
          "empty_desc": "अपने नुस्खे के कागजात को डिजिटाइज़ करने के लिए मेडिकल विजन का उपयोग करें।",
          "start_scan": "स्कैन शुरू करें"
        },
        "actions": {
          "consultation": "एआई परामर्श",
          "consultation_desc": "प्रासंगिक लक्षण विश्लेषण",
          "analyzer": "नुस्खा विश्लेषक",
          "analyzer_desc": "गहन नैदानिक रिपोर्ट निष्कर्षण",
          "vision": "विजन विश्लेषण",
          "vision_desc": "चिकित्सा रिपोर्ट के लिए ओसीआर"
        }
      },
      "home": {
        "badge": "एआई-संचालित रोगी स्वास्थ्य मंच",
        "title": "बुद्धिमान लक्षण विश्लेषण। विश्वसनीय नैदानिक मार्गदर्शन।",
        "desc": "मेडसिक्योर एआई एक रोगी-प्रथम डिजिटल स्वास्थ्य मंच है जो संरचित लक्षण मूल्यांकन, एआई-संचालित परामर्श और सुरक्षित मेडिकल रिकॉर्ड प्रबंधन प्रदान करता है।",
        "assess": "लक्षणों का आकलन करें",
        "consult": "परामर्श शुरू करें"
      },
      "chatbot": {
        "badge": "एआई क्लिनिकल असिस्टेंट",
        "title": "मेडिकल एआई परामर्श",
        "desc": "अपने लक्षणों का वर्णन करें या नैदानिक प्रश्न पूछें। आपका परामर्श एन्क्रिप्टेड है और आपके रोगी प्रोफ़ाइल में सुरक्षित रूप से संग्रहीत है।",
        "login_warning": "अपने परामर्श इतिहास को संरक्षित करने और व्यक्तिगत नैदानिक मार्गदर्शन प्राप्त करने के लिए कृपया साइन इन करें।",
        "greeting": "आज मैं आपकी कैसे मदद कर सकता हूँ?",
        "you": "आप",
        "bot": "मेडसिक्योर_एआई",
        "recommendation": "विशेषज्ञ की सिफारिश",
        "medication": "दवा मार्गदर्शन",
        "share_location": "मेरा स्थान साझा करें",
        "find_specialists": "20 किमी के भीतर विशेषज्ञ खोजें",
        "directions": "दिशा-निर्देश प्राप्त करें",
        "analyzing": "आपकी नैदानिक क्वेरी का विश्लेषण किया जा रहा है...",
        "scroll": "नवीनतम पर स्क्रॉल करें",
        "input_placeholder": "अपने लक्षणों का वर्णन करें या एक नैदानिक प्रश्न पूछें...",
        "listening": "सुन रहा हूँ — कृपया अब बोलें..."
      },
      "analyzer": {
        "badge": "न्यूरल क्लिनिकल निष्कर्षण",
        "title": "नुस्खा विश्लेषक",
        "desc": "कोई भी मेडिकल दस्तावेज़ अपलोड करें—नुस्खे, रक्त परीक्षण, एक्स-रे या ईसीजी। हमारा एआई एक संरचित, सरल ब्रेकडाउन देने के लिए परतों को स्कैन करता है।",
        "drop": "मेडिकल फ़ाइल छोड़ें",
        "formats": "PNG, JPG या PDF दस्तावेज़",
        "remove": "हटाएं",
        "change": "बदलें",
        "scanning": "दस्तावेज़ की डीप स्कैनिंग...",
        "analyze": "एआई विश्लेषण प्रारंभ करें",
        "ready": "मेडिकल प्रोसेसिंग के लिए तैयार...",
        "ready_desc": "विश्लेषण के परिणाम यहाँ एक संरचित प्रारूप में दिखाई देंगे।",
        "patient": "रोगी की पहचान",
        "name": "पूरा नाम",
        "age": "आयु",
        "gender": "लिंग",
        "metadata": "मेटाडेटा",
        "summary": "नैदानिक सारांश",
        "diagnosis": "न्यूरल विश्लेषण: प्राथमिक निदान",
        "finding": "महत्वपूर्ण खोज",
        "extract": "न्यूरल एक्सट्रैक्ट",
        "pharmacology": "औषधीय ब्रेकडाउन",
        "prescribed": "निर्धारित",
        "instruction": "निर्देश",
        "rationale": "नैदानिक तर्क",
        "referral": "विशेषज्ञ रेफरल",
        "recommended_specialist": "अनुशंसित विशेषज्ञ",
        "find_near_me": "मेरे आस-पास खोजें",
        "disclaimer": "महत्वपूर्ण: यह केवल सूचनात्मक उद्देश्यों के लिए एक एआई-जनित नैदानिक विश्लेषण है। कृपया कोई भी कार्रवाई करने या अपनी दवा बदलने से पहले एक लाइसेंस प्राप्त चिकित्सा पेशेवर के साथ इन निष्कर्षों को सत्यापित करें।"
      },
      "nav": {
        "home": "होम",
        "dashboard": "डैशबोर्ड",
        "analytics": "एनालिटिक्स",
        "settings": "सेटिंग्स",
        "privacy": "गोपनीयता",
        "chatbot": "चैटबॉट",
        "analyzer": "विश्लेषक",
        "login": "लॉग इन",
        "join_now": "अभी शामिल हों",
        "recent_chats": "हाल की चैट",
        "clear_all": "सभी हटाएं",
        "no_recent_chats": "कोई हाल की चैट नहीं",
        "add_account": "नया खाता जोड़ें",
        "switch_account": "खाता बदलें",
        "logout": "लॉग आउट"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
