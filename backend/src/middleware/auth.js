import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const requireAuth = (req, _res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Authentication required");
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }
};

export const allowRoles = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Insufficient permissions");
  }
  next();
};
