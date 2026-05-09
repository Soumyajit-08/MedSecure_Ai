import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    filename: { type: String, required: true },
    storageUrl: { type: String, required: true },
    mimeType: String,
    extractedText: String
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", ReportSchema);
