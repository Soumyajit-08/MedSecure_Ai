import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

// ─── Global Safety Net ─────────────────────────────────────────────────────
// Prevent unhandled promise rejections from crashing the entire process.
// Log the error and continue serving requests.
process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️  Unhandled Promise Rejection — process will continue:");
  console.error("   Reason:", reason?.message || reason);
});

process.on("uncaughtException", (error) => {
  console.error("⚠️  Uncaught Exception — process will continue:");
  console.error("   Error:", error?.message || error);
});
// ───────────────────────────────────────────────────────────────────────────

const bootstrap = async () => {
  let dbConnected = false;
  try {
    await connectDatabase();
    dbConnected = true;
  } catch (error) {
    if (!env.allowStartWithoutDb) {
      throw error;
    }
    console.warn("Database unavailable. Starting API in degraded mode.");
    console.warn(`Reason: ${error.message}`);
  }

  const server = app.listen(env.port, () => {
    console.log(`MadSecure Backend running on port ${env.port}`);
    if (!dbConnected) {
      console.log("Warning: DB-dependent endpoints will fail until MONGO_URI is fixed.");
    }
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${env.port} is already in use. Stop previous process or change PORT.`);
      process.exit(1);
    }
    throw error;
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
