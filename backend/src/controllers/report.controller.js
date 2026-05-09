import { Report } from "../models/Report.js";

export const uploadReport = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const report = await Report.create({
    patientId: req.user.sub,
    uploadedBy: req.user.sub,
    filename: req.file.originalname,
    storageUrl: `/uploads/${req.file.filename}`,
    mimeType: req.file.mimetype
  });

  return res.status(201).json({ success: true, data: report });
};

export const listReports = async (req, res) => {
  const query = req.user.role === "patient" ? { patientId: req.user.sub } : {};
  const reports = await Report.find(query).sort({ createdAt: -1 });
  res.json({ success: true, data: reports });
};
