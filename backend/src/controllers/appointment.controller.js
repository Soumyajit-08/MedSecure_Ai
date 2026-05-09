import { z } from "zod";
import { Appointment } from "../models/Appointment.js";

const createSchema = z.object({
  doctorId: z.string().min(1),
  scheduledAt: z.string().datetime(),
  reason: z.string().optional()
});

export const createAppointment = async (req, res) => {
  const parsed = createSchema.parse(req.body);
  const appointment = await Appointment.create({
    patientId: req.user.sub,
    doctorId: parsed.doctorId,
    scheduledAt: new Date(parsed.scheduledAt),
    reason: parsed.reason
  });
  res.status(201).json({ success: true, data: appointment });
};

export const listAppointments = async (req, res) => {
  const query =
    req.user.role === "patient"
      ? { patientId: req.user.sub }
      : req.user.role === "doctor"
        ? { doctorId: req.user.sub }
        : {};

  const appointments = await Appointment.find(query).sort({ scheduledAt: 1 }).limit(200);
  res.json({ success: true, data: appointments });
};
