import { ChatHistory } from "../models/ChatHistory.js";
import { Diagnosis } from "../models/Diagnosis.js";
import { Report } from "../models/Report.js";
import { Medication } from "../models/Medication.js";

export const getDashboardStats = async (req, res) => {
  const userId = req.user.sub;

  try {
    const [recentChats, recentDiagnoses, recentReports, activeMedications] = await Promise.all([
      ChatHistory.findOne({ userId }).sort({ updatedAt: -1 }).limit(1),
      Diagnosis.find({ patientId: userId }).sort({ createdAt: -1 }).limit(5),
      Report.find({ patientId: userId }).sort({ createdAt: -1 }).limit(5),
      Medication.find({ userId, active: true }).sort({ createdAt: -1 })
    ]);

    res.json({
      success: true,
      data: {
        recentChats: recentChats?.messages?.slice(-5) || [],
        recentDiagnoses,
        recentReports,
        activeMedications,
        stats: {
          totalDiagnoses: await Diagnosis.countDocuments({ patientId: userId }),
          totalReports: await Report.countDocuments({ patientId: userId }),
          activeMeds: activeMedications.length
        }
      }
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch dashboard statistics" });
  }
};
