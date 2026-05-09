import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { ChatHistory } from "../models/ChatHistory.js";
import { getMockChatResponse } from "../services/mockAiService.js";

// Initialize AI Engines (with safety check to ignore placeholders)
const isValidKey = (key) => key && key.length > 20 && !key.includes("paste_your");

const genAI = isValidKey(process.env.GEMINI_API_KEY) ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const openai = isValidKey(process.env.OPENAI_API_KEY) ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// In-memory fallback for Chat History
const mockChatHistory = [];
const isDbConnected = () => mongoose.connection.readyState === 1;

const buildPatientFriendlyPrompt = ({ context, message, hasFile }) => `
You are MadSecure AI, a careful patient-facing medical assistant.

Write the answer in very simple, easy English for a non-medical user. The user should understand what is happening, why it matters, and what to do next.

Important writing rules:
- Explain step by step, like you are guiding a patient.
- Use short sentences.
- Define medical words before using them.
- Avoid scary wording.
- Do not give a final diagnosis.
- Do not prescribe exact medicine names or dosages unless the user says a doctor already prescribed them.
- If information is missing, clearly say what is missing and what the user should share next.
- For report analysis, explain what each important value means in everyday language.

Use this exact structure and keep every section:

### Summary
Write 3-5 simple sentences explaining the main problem or report result. Start with the most important point. Say whether it looks mild, needs doctor review, or may be urgent, based only on the information provided.

### Step-by-Step Explanation
Explain the result in numbered steps:
1. What the user told us or what the report shows.
2. What that finding means in simple words.
3. Why it can happen or what common causes may be.
4. How it may connect to the user's symptoms.
5. What information is still needed to understand it better.

### Key Findings
List the important findings from the user's message${hasFile ? " and uploaded report/document" : ""}. For each point, write:
- Finding:
- Easy meaning:
- Why it matters:

### What You Should Do Now
Give practical next steps in order:
1. What to do today at home, if safe.
2. What symptoms to monitor.
3. When to book a doctor appointment.
4. What report values, tests, or questions to take to the doctor.

### Possible Treatment Direction
Explain possible treatment direction in general terms only, such as diet changes, hydration, rest, follow-up tests, doctor evaluation, or prescribed treatment from a clinician. Make it clear that the doctor decides the final treatment.

### When To Seek Urgent Care
List warning signs that need urgent medical help, such as breathing trouble, chest pain, fainting, severe weakness, confusion, very high fever, severe allergic reaction, uncontrolled bleeding, or symptoms getting worse quickly.

### Simple Checklist
Give a short checklist the user can follow after reading the answer.

End with: "This is AI guidance, not a final medical diagnosis. Please consult a qualified doctor for treatment decisions."

Conversation history:
${context || "No previous conversation."}

User message:
${message || (hasFile ? "Please analyze the uploaded medical report or image." : "No message provided.")}
`;

const includesAny = (text, terms) => terms.some((term) => text.includes(term));

const buildDoctorRecommendation = (message = "", hasFile = false) => {
  const query = message.toLowerCase();

  const base = {
    specialist: "General Physician",
    reason: "A general physician can review your symptoms, reports, and decide if a specialist is needed.",
    urgency: "Routine appointment unless symptoms are severe or worsening.",
    searchQuery: "General Physician near me",
    radiusKm: 20,
    medicineGuidance: [
      "Do not start prescription medicine without a doctor.",
      "Carry your reports and current medicine list to the appointment.",
      "Follow the dose and duration only as prescribed by a qualified doctor."
    ]
  };

  const rules = [
    {
      terms: ["chest pain", "heart", "palpitation", "bp", "blood pressure"],
      specialist: "Cardiologist",
      reason: "Heart, chest pain, palpitation, or blood pressure symptoms should be reviewed by a heart specialist when significant.",
      urgency: "Urgent if chest pain, sweating, breathlessness, fainting, or pain spreading to left arm/jaw is present.",
      searchQuery: "Cardiologist near me"
    },
    {
      terms: ["breathing", "shortness of breath", "asthma", "wheezing", "cough", "lung"],
      specialist: "Pulmonologist",
      reason: "Breathing trouble, wheezing, repeated cough, or lung symptoms need respiratory evaluation.",
      urgency: "Urgent if breathing is difficult, lips look blue, oxygen is low, or chest pain is present.",
      searchQuery: "Pulmonologist near me"
    },
    {
      terms: ["fever", "infection", "throat", "cold", "viral"],
      specialist: "General Physician",
      reason: "Fever, cold, throat pain, and common infections are usually first checked by a general physician.",
      urgency: "Same-day review if fever is very high, lasts more than 3 days, or comes with confusion, rash, or breathing trouble.",
      searchQuery: "General Physician near me"
    },
    {
      terms: ["hemoglobin", "hb", "anemia", "anaemia", "iron", "b12", "folate"],
      specialist: "Hematologist",
      reason: "Low hemoglobin or anemia may need blood-related evaluation, especially if it is moderate, severe, repeated, or unexplained.",
      urgency: "See a doctor soon if hemoglobin is low with severe weakness, dizziness, breathlessness, chest pain, or fainting.",
      searchQuery: "Hematologist near me"
    },
    {
      terms: ["vitamin d", "bone pain", "joint pain", "body pain", "back pain"],
      specialist: "Orthopedic Doctor",
      reason: "Bone, joint, back, and body pain with low vitamin D can be reviewed by an orthopedic doctor or general physician.",
      urgency: "Urgent if pain follows injury, there is swelling/deformity, inability to walk, fever with severe pain, or weakness/numbness.",
      searchQuery: "Orthopedic doctor near me"
    },
    {
      terms: ["sugar", "diabetes", "thyroid", "hormone", "tsh", "vitamin d"],
      specialist: "Endocrinologist",
      reason: "Diabetes, thyroid, hormone, and repeated vitamin deficiency concerns may need endocrine review.",
      urgency: "Urgent if sugar is very high/low with confusion, fainting, vomiting, or severe weakness.",
      searchQuery: "Endocrinologist near me"
    },
    {
      terms: ["stomach", "gastric", "abdomen", "liver", "sgpt", "sgot", "bilirubin", "vomiting", "diarrhea"],
      specialist: "Gastroenterologist",
      reason: "Stomach, liver, vomiting, diarrhea, or abdominal symptoms may need digestive-system evaluation.",
      urgency: "Urgent if severe abdominal pain, blood in stool/vomit, yellow eyes, dehydration, or persistent vomiting occurs.",
      searchQuery: "Gastroenterologist near me"
    },
    {
      terms: ["skin", "rash", "itching", "allergy", "acne"],
      specialist: "Dermatologist",
      reason: "Skin rash, itching, allergy-like skin symptoms, or acne are best reviewed by a skin specialist.",
      urgency: "Urgent if rash comes with breathing trouble, face/lip swelling, high fever, or rapidly spreading redness.",
      searchQuery: "Dermatologist near me"
    },
    {
      terms: ["headache", "migraine", "seizure", "numbness", "weakness", "dizzy", "dizziness"],
      specialist: "Neurologist",
      reason: "Severe headache, migraine, dizziness, seizure, numbness, or weakness may need nerve/brain specialist review.",
      urgency: "Urgent if sudden severe headache, one-sided weakness, slurred speech, confusion, seizure, or fainting occurs.",
      searchQuery: "Neurologist near me"
    },
    {
      terms: ["eye", "vision", "blurred"],
      specialist: "Ophthalmologist",
      reason: "Eye pain, blurred vision, or vision changes should be checked by an eye specialist.",
      urgency: "Urgent if sudden vision loss, eye injury, severe eye pain, or flashes/floaters appear suddenly.",
      searchQuery: "Ophthalmologist near me"
    },
    {
      terms: ["ear", "nose", "sinus", "tonsil"],
      specialist: "ENT Doctor",
      reason: "Ear, nose, throat, sinus, or tonsil symptoms are commonly handled by an ENT specialist.",
      urgency: "Urgent if breathing/swallowing is difficult, severe ear pain with fever, or bleeding occurs.",
      searchQuery: "ENT doctor near me"
    }
  ];

  const match = rules.find((rule) => includesAny(query, rule.terms));
  const publicMatch = match
    ? {
        specialist: match.specialist,
        reason: match.reason,
        urgency: match.urgency,
        searchQuery: match.searchQuery
      }
    : null;

  return {
    ...base,
    ...(publicMatch || {}),
    reason: publicMatch?.reason || (hasFile ? "A doctor should review the uploaded report and connect it with your symptoms." : base.reason)
  };
};

export const chat = async (req, res) => {
  try {
    const { query: message } = req.body;
    const file = req.file;
    const userId = req.user.sub;
    const doctorRecommendation = buildDoctorRecommendation(message, Boolean(file));

    // 1. Context Retrieval
    let userHistory;
    if (isDbConnected()) {
      userHistory = await ChatHistory.findOne({ userId });
    } else {
      userHistory = mockChatHistory.find(h => h.userId === userId);
    }
    
    const context = userHistory?.messages?.slice(-6)
      .filter(m => !m.text.includes("AI Connection Failed"))
      .map(m => `${m.role}: ${m.text}`).join("\n") || "";


    let finalResponse = "";
    let aiProvider = "mock";

    // 2. AI strategy: Gemini first, then OpenAI fallback, then local mock fallback.
    try {
      if (file && genAI) {
        aiProvider = "gemini";
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent([
          { text: buildPatientFriendlyPrompt({ context, message, hasFile: true }) },
          { inlineData: { data: file.buffer.toString("base64"), mimeType: file.mimetype } }
        ]);
        finalResponse = result.response.text();
      } 
      else if (genAI) {
        aiProvider = "gemini";
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(
          buildPatientFriendlyPrompt({ context, message, hasFile: false })
        );
        finalResponse = result.response.text();
      }
      else if (openai && !file) {
        aiProvider = "openai";
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are MadSecure AI. Give patient-friendly medical guidance with Summary, Key Findings, Treatment / Next Steps, and When To Seek Urgent Care sections. Do not give a final diagnosis or exact medicine dosages." },
            { role: "user", content: buildPatientFriendlyPrompt({ context, message, hasFile: false }) }
          ],
        });
        finalResponse = completion.choices[0].message.content;
      }
      else {
        finalResponse = await getMockChatResponse(message, file);
      }
    } catch (aiErr) {
      console.error("AI Service Error:", aiErr);
      aiProvider = "mock";
      finalResponse = await getMockChatResponse(message, file);
    }

    // 3. Save to History
    const newMessages = [
      { role: "user", text: message || (file ? `Attached ${file.mimetype}` : "Health Query") },
      { role: "assistant", text: finalResponse }
    ];

    if (isDbConnected()) {
      await ChatHistory.findOneAndUpdate(
        { userId },
        { $push: { messages: { $each: newMessages } } },
        { upsert: true, new: true }
      );
    } else {
      let mockH = mockChatHistory.find(h => h.userId === userId);
      if (!mockH) {
        mockH = { userId, messages: [] };
        mockChatHistory.push(mockH);
      }
      mockH.messages.push(...newMessages);
    }

    res.json({
      success: true,
      data: {
        response: finalResponse,
        provider: aiProvider,
        doctorRecommendation
      }
    });

  } catch (error) {
    console.error("Fatal Chat Error:", error);
    res.status(500).json({ success: false, message: "Chat process failed." });
  }
};

export const getHistory = async (req, res) => {
  try {
    const userId = req.user.sub;
    let history;
    
    if (isDbConnected()) {
      history = await ChatHistory.findOne({ userId });
    } else {
      history = mockChatHistory.find(h => h.userId === userId);
    }

    res.json({ 
      success: true, 
      data: history?.messages || [] 
    });
  } catch (error) {
    console.error("Fetch History Error:", error);
    res.status(500).json({ success: false, message: "Could not fetch chat history." });
  }
};

export const deleteHistoryItem = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { messageId } = req.params;

    if (isDbConnected()) {
      // Find the document first to identify the index and ensure we delete the associated response
      const history = await ChatHistory.findOne({ userId });
      if (history) {
        const messageIndex = history.messages.findIndex(m => m._id.toString() === messageId);
        if (messageIndex !== -1) {
          // If the next message is an assistant message, delete both as a pair
          const deleteCount = (history.messages[messageIndex + 1]?.role === "assistant") ? 2 : 1;
          history.messages.splice(messageIndex, deleteCount);
          await history.save();
        }
      }
    } else {
      const mockH = mockChatHistory.find(h => h.userId === userId);
      if (mockH) {
        const idx = mockH.messages.findIndex(m => m._id?.toString() === messageId);
        if (idx !== -1) {
          const count = (mockH.messages[idx + 1]?.role === "assistant") ? 2 : 1;
          mockH.messages.splice(idx, count);
        }
      }
    }

    res.json({ success: true, message: "History record permanently removed." });
  } catch (error) {
    console.error("Delete History Item Error:", error);
    res.status(500).json({ success: false, message: "Failed to permanently delete record." });
  }
};

export const clearHistory = async (req, res) => {
  try {
    const userId = req.user.sub;

    if (isDbConnected()) {
      await ChatHistory.findOneAndDelete({ userId });
    } else {
      const index = mockChatHistory.findIndex(h => h.userId === userId);
      if (index !== -1) mockChatHistory.splice(index, 1);
    }

    res.json({ success: true, message: "Chat history cleared successfully." });
  } catch (error) {
    console.error("Clear History Error:", error);
    res.status(500).json({ success: false, message: "Failed to clear chat history." });
  }
};
