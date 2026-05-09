import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    console.error("❌ [Validation Error]:", JSON.stringify(err.errors, null, 2));
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      errors: err.errors
    });
  }

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const response = {
    success: false,
    message: err.message || "Internal server error"
  };

  if (err.details) {
    response.details = err.details;
  }

  return res.status(statusCode).json(response);
};
