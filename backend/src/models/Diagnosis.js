import mongoose from "mongoose";

const DiagnosisSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    symptoms: [{ type: String, required: true }],
    predictedDisease: { type: String, required: true },
    confidence: { type: Number, min: 0, max: 1, required: true },
    riskScore: { type: Number, min: 0, max: 100, required: true },
    precautions: [String],
    recommendedSpecialist: String,
    modelVersion: String
  },
  { timestamps: true }
);

export const Diagnosis = mongoose.model("Diagnosis", DiagnosisSchema);
