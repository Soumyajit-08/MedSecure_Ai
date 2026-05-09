import dotenv from "dotenv";

dotenv.config();

const defaultClientUrls = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "http://localhost:3002",
  "http://127.0.0.1:3002"
];

const required = [
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET"
];

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 8090),
  mongoUri: process.env.MONGO_URI || "",
  allowStartWithoutDb:
    process.env.ALLOW_START_WITHOUT_DB === "true" ||
    (!process.env.ALLOW_START_WITHOUT_DB && (process.env.NODE_ENV || "development") !== "production"),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  clientUrls: [
    ...defaultClientUrls,
    ...(process.env.CLIENT_URL || "").split(","),
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3002",
    "http://127.0.0.1:3002"
  ]
    .map((url) => url.trim())
    .filter(Boolean),
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
};
