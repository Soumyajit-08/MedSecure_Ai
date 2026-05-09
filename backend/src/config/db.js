import { Resolver } from "dns";
import mongoose from "mongoose";
import { env } from "./env.js";

const MONGO_TIMEOUT_MS = 5000;

let lastConnectionError = "";

const isPlaceholderMongoUri = (uri) =>
  !uri ||
  uri.includes("xxxxx") ||
  uri.includes("<CLUSTER_HOST>") ||
  uri.includes("<user>") ||
  uri.includes("<password>") ||
  uri.includes("YOUR_REAL_CLUSTER_HOST") ||
  uri.includes("replace-with");

const parseMongoUri = (uri) => {
  try {
    return new URL(uri);
  } catch {
    throw new Error(
      "Invalid MONGO_URI format. Use mongodb+srv://username:password@cluster-host/database or mongodb://host:port/database"
    );
  }
};

const getConnectionHelp = (message) => {
  if (message.includes("IP") || message.includes("whitelist") || message.includes("Could not connect")) {
    return "Check MongoDB Atlas Network Access and add your current IP or deployment server IP.";
  }

  if (message.includes("bad auth") || message.includes("Authentication failed")) {
    return "Check the MongoDB database username and password in MONGO_URI. URL-encode special characters in the password.";
  }

  if (message.includes("ENOTFOUND") || message.includes("querySrv") || message.includes("SRV lookup")) {
    return "Check the MongoDB cluster host in MONGO_URI and your internet/DNS connection.";
  }

  return "Check MONGO_URI, Atlas database user permissions, and Atlas Network Access.";
};

const assertSrvRecordResolves = async (uri) => {
  const { hostname, protocol } = parseMongoUri(uri);
  if (protocol !== "mongodb+srv:") return;

  const resolver = new Resolver();
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolver.cancel();
      reject(new Error(`MongoDB SRV lookup timed out for ${hostname}`));
    }, MONGO_TIMEOUT_MS);

    resolver.resolveSrv(`_mongodb._tcp.${hostname}`, (error) => {
      clearTimeout(timeout);
      if (error) {
        reject(new Error(`MongoDB SRV lookup failed for ${hostname}: ${error.message}`));
        return;
      }
      resolve();
    });
  });
};

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!isPlaceholderMongoUri(env.mongoUri)) {
    try {
      parseMongoUri(env.mongoUri);
      await assertSrvRecordResolves(env.mongoUri);
      await mongoose.connect(env.mongoUri, {
        serverSelectionTimeoutMS: MONGO_TIMEOUT_MS
      });
      lastConnectionError = "";
      console.log("MongoDB connected (Atlas/Local)");
      return;
    } catch (error) {
      console.warn(`Primary connection failed: ${error.message}`);
      lastConnectionError = `${error.message} ${getConnectionHelp(error.message)}`;
    }
  } else {
    lastConnectionError = "No valid MONGO_URI provided.";
  }

  // Fallback: Just let the app start in degraded mode if allowed
  if (env.allowStartWithoutDb) {
    console.warn("⚠️ Database connection unavailable. Features will use in-memory mock fallback.");
  } else {
    throw new Error(lastConnectionError);
  }
};

export const getDatabaseStatus = () => {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };

  return {
    connected: mongoose.connection.readyState === 1,
    state: states[mongoose.connection.readyState] || "unknown",
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
    lastError: lastConnectionError || null
  };
};
