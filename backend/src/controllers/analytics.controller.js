import { Appointment } from "../models/Appointment.js";
import { Diagnosis } from "../models/Diagnosis.js";
import { User } from "../models/User.js";

export const getAdminAnalytics = async (_req, res) => {
  const [users, patients, doctors, appointments, predictions] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "patient" }),
    User.countDocuments({ role: "doctor" }),
    Appointment.countDocuments(),
    Diagnosis.countDocuments()
  ]);

  res.json({
    success: true,
    data: { users, patients, doctors, appointments, predictions }
  });
};
