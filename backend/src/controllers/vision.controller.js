import { GoogleGenerativeAI } from "@google/generative-ai";
import { getMockVisionResult } from "../services/mockAiService.js";

const isValidKey = (key) => key && key.length > 20 && !key.includes("paste_your");
const genAI = isValidKey(process.env.GEMINI_API_KEY) ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

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

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

    const result = await model.generateContent([prompt, imageData]);
    const responseText = result.response.text();
    const cleanedJson = responseText.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanedJson);

    res.status(200).json({ success: true, data: data });

  } catch (error) {
    console.error("Medical Analysis Error:", error);
    const mockResult = await getMockVisionResult(req.file);
    mockResult.simple_explanation = `The advanced image analysis service is temporarily unavailable. ${mockResult.simple_explanation}`;
    res.status(200).json({ success: true, data: mockResult });
  }
};
