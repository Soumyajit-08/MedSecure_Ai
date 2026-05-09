import mongoose from "mongoose";
import { User } from "../models/User.js";

const isDbConnected = () => mongoose.connection.readyState === 1;

export const me = async (req, res) => {
  if (isDbConnected()) {
    const user = await User.findById(req.user.sub).select("-password");
    if (user) {
      return res.json({ success: true, data: user });
    }
  }
  
  // Mock Fallback for 'me' endpoint
  res.json({ 
    success: true, 
    data: { 
      _id: req.user.sub, 
      fullName: "MedSecure User", 
      email: req.user.email, 
      role: req.user.role,
      isEmailVerified: true 
    } 
  });
};

export const listUsers = async (_req, res) => {
  if (isDbConnected()) {
    const users = await User.find().select("-password").limit(100).sort({ createdAt: -1 });
    return res.json({ success: true, data: users });
  }
  res.json({ success: true, data: [] });
};
