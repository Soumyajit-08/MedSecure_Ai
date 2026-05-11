import { GoogleGenerativeAI } from "@google/generative-ai";
import { getMockVisionResult } from "../services/mockAiService.js";

const isValidKey = (key) => key && key.length > 20 && !key.includes("paste_your");
const genAI = isValidKey(process.env.GEMINI_API_KEY) ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const GEMINI_MODEL_CANDIDATES = (process.env.GEMINI_MODEL || "gemini-2.0-flash,gemini-2.5-flash,gemini-flash-latest")
  .split(",")
  .map((model) => model.trim())
  .filter(Boolean);

const parseGeminiJson = (responseText) => {
  const cleanedJson = responseText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanedJson);
};

const generateVisionJson = async (prompt, imageData) => {
  let lastError;

  for (const modelName of GEMINI_MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent([prompt, imageData]);
      return parseGeminiJson(result.response.text());
    } catch (error) {
      lastError = error;
      console.warn(`Gemini vision model failed (${modelName}): ${error.message}`);
    }
  }

  throw lastError;
};

export const processMedicalVision = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a medical report or image." });
    }

    if (!genAI) {
      const mockResult = await getMockVisionResult(req.file);
      return res.status(200).json({ success: true, data: mockResult });
    }

    const imageData = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    const prompt = `
      Analyze this medical image/PDF and explain in SIMPLE, EASY language.
      Return JSON:
      {
        "simple_explanation": "string",
        "key_findings": ["string"],
        "medicines": [{ "name": "string", "purpose": "string", "caution": "string" }],
        "specialist_type": "string",
        "doctor_role": "string",
        "maps_search_link": "string",
        "urgency_level": "Low/Medium/High",
        "recommendations": ["string"]
      }
    `;

    const data = await generateVisionJson(prompt, imageData);

    res.status(200).json({ success: true, data: data });

  } catch (error) {
    console.error("Medical Analysis Error:", error);
    const mockResult = await getMockVisionResult(req.file);
    mockResult.simple_explanation = `The advanced image analysis service is temporarily unavailable. ${mockResult.simple_explanation}`;
    res.status(200).json({ success: true, data: mockResult });
  }
};

export const analyzePrescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a prescription or medical report." });
    }

    if (!genAI) {
      const mockResult = await getMockVisionResult(req.file);
      return res.status(200).json({ success: true, data: mockResult });
    }

    const imageData = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    const prompt = `
      Perform a deep clinical analysis of this medical document (prescription, blood test, X-ray, ECG, etc.).
      
      Structure your response EXACTLY as this JSON format:
      {
        "patient_details": {
          "name": "string or 'Not specified'",
          "age": "string or 'Not specified'",
          "gender": "string or 'Not specified'",
          "other": "any other visible details like weight, ID, etc."
        },
        "summary": "A comprehensive yet simple summary of the entire document in plain, easy-to-understand English.",
        "problem": "The specific health problem or diagnosis identified in the document.",
        "medicines": [
          {
            "name": "string",
            "usage": "how to take it (e.g., twice a day after meals)",
            "purpose": "why the doctor prescribed this specific medicine based on the diagnosis"
          }
        ],
        "referral": {
          "specialist": "string or 'None'",
          "reason": "why this specialist was recommended or referred"
        },
        "urgency": "Low/Medium/High/Emergency",
        "key_metrics": ["list of important values found like Hemoglobin: 12g/dL"]
      }

      CRITICAL: Use simple English that a non-medical person can easily understand.
    `;

    const data = await generateVisionJson(prompt, imageData);

    res.status(200).json({ success: true, data: data });

  } catch (error) {
    console.error("Prescription Analysis Error:", error);
    const mockResult = await getMockVisionResult(req.file);
    res.status(200).json({ success: true, data: mockResult });
  }
};
