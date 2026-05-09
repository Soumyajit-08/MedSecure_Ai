import { z } from "zod";
import { Diagnosis } from "../models/Diagnosis.js";
import { requestDiagnosisPrediction } from "../services/aiClient.js";
import { searchLocalIllnessDataset } from "../services/localNlpService.js";

const predictionSchema = z.object({
  symptoms: z.array(z.string().min(2)).min(1),
  age: z.number().min(0).max(120).optional(),
  gender: z.string().optional()
});

export const createPrediction = async (req, res) => {
  const parsed = predictionSchema.parse(req.body);

  let aiResult;
  try {
    aiResult = await requestDiagnosisPrediction(parsed);
  } catch {
    const localResult = searchLocalIllnessDataset(parsed.symptoms.join(" "));
    const riskScores = {
      Low: 25,
      Medium: 55,
      High: 82,
      Unknown: 35
    };

    aiResult = {
      predictedDisease: localResult.matched ? localResult.illness : "General Patient Guidance",
      confidence: localResult.matched ? Math.min(0.9, 0.52 + localResult.score * 0.08) : 0.4,
      riskScore: riskScores[localResult.riskLevel] || riskScores.Unknown,
      precautions: localResult.nextSteps,
      recommendedSpecialist:
        localResult.category === "General" ? "General Physician" : `${localResult.category} Specialist`,
      modelVersion: "symptom2disease-local-fallback-v1"
    };
  }

  const diagnosis = await Diagnosis.create({
    patientId: req.user.sub,
    symptoms: parsed.symptoms,
    ...aiResult
  });

  res.status(201).json({ success: true, data: diagnosis });
};

export const listPredictions = async (req, res) => {
  const query = req.user.role === "patient" ? { patientId: req.user.sub } : {};
  const records = await Diagnosis.find(query).sort({ createdAt: -1 }).limit(100);
  res.json({ success: true, data: records });
};
