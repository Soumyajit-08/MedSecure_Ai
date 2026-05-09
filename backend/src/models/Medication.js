import mongoose from "mongoose";

const MedicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true },
    dosage: { type: String },
    frequency: { type: String },
    timeOfDay: [String], // e.g., ["morning", "evening"]
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    active: { type: Boolean, default: true },
    notes: String,
    sourceReportId: { type: mongoose.Schema.Types.ObjectId, ref: "Report" }
  },
  { timestamps: true }
);

export const Medication = mongoose.model("Medication", MedicationSchema);
