import { Resolver } from "dns";
import mongoose from "mongoose";
import { env } from "./env.js";

const MONGO_TIMEOUT_MS = 5000;
const LOCAL_MONGO_TIMEOUT_MS = 1500;
const FALLBACK_DNS_SERVERS = ["1.1.1.1", "8.8.8.8"];
const DEFAULT_LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/medsecure_ai";

let lastConnectionError = "";
let activeConnectionMode = "disconnected";

const shouldSkipRemoteMongoInDevelopment = () =>
  env.nodeEnv !== "production" && process.env.MONGO_SKIP_REMOTE_IN_DEV === "true";

const getConfiguredDnsServers = () =>
  (process.env.MONGO_DNS_SERVERS || "")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);

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

  if (message.includes("ENOTFOUND") || message.includes("ECONNREFUSED") || message.includes("querySrv") || message.includes("SRV lookup")) {
    return "Check the MongoDB cluster host in MONGO_URI and your internet/DNS connection.";
  }

  return "Check MONGO_URI, Atlas database user permissions, and Atlas Network Access.";
};

const resolveSrvRecords = (resolver, hostname) =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolver.cancel();
      reject(new Error(`MongoDB SRV lookup timed out for ${hostname}`));
    }, MONGO_TIMEOUT_MS);

    resolver.resolveSrv(`_mongodb._tcp.${hostname}`, (error, records) => {
      clearTimeout(timeout);
      if (error) {
        reject(new Error(`MongoDB SRV lookup failed for ${hostname}: ${error.message}`));
        return;
      }
      resolve(records);
    });
  });

const resolveTxtRecords = (resolver, hostname) =>
  new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolver.cancel();
      resolve([]);
    }, MONGO_TIMEOUT_MS);

    resolver.resolveTxt(hostname, (error, records) => {
      clearTimeout(timeout);
      resolve(error ? [] : records.flat());
    });
  });

const getDnsResolutionAttempts = () => {
  const configuredDnsServers = getConfiguredDnsServers();
  const attempts = [{ label: "system DNS", mode: "resolved-system-dns", servers: [] }];

  if (configuredDnsServers.length) {
    attempts.push({ label: "configured DNS", mode: "resolved-configured-dns", servers: configuredDnsServers });
  }

  attempts.push({ label: "fallback public DNS", mode: "resolved-fallback-dns", servers: FALLBACK_DNS_SERVERS });
  return attempts;
};

const createResolver = (servers) => {
  const resolver = new Resolver();
  if (servers.length) {
    resolver.setServers(servers);
  }
  return resolver;
};

const resolveSrvMongoUri = async (uri) => {
  const { hostname, protocol } = parseMongoUri(uri);
  if (protocol !== "mongodb+srv:") {
    return { uri, mode: "configured" };
  }

  const parsed = parseMongoUri(uri);
  const errors = [];

  for (const attempt of getDnsResolutionAttempts()) {
    const resolver = createResolver(attempt.servers);
    try {
      const srvRecords = await resolveSrvRecords(resolver, hostname);
      if (!srvRecords.length) {
        throw new Error(`MongoDB SRV lookup returned no records for ${hostname}`);
      }

      const txtRecords = await resolveTxtRecords(createResolver(attempt.servers), hostname);
      const seedHosts = srvRecords
        .sort((left, right) => left.priority - right.priority || left.weight - right.weight)
        .map((record) => `${record.name}:${record.port}`)
        .join(",");

      const directUri = new URL(uri.replace("mongodb+srv://", "mongodb://"));
      directUri.host = seedHosts;
      directUri.search = "";

      const options = new URLSearchParams();
      txtRecords
        .join("&")
        .split("&")
        .filter(Boolean)
        .forEach((option) => {
          const [key, value = ""] = option.split("=");
          if (key) options.set(key, value);
        });
      parsed.searchParams.forEach((value, key) => options.set(key, value));
      if (!options.has("tls") && !options.has("ssl")) {
        options.set("tls", "true");
      }
      directUri.search = options.toString();

      return {
        uri: directUri.toString(),
        mode: attempt.mode
      };
    } catch (error) {
      errors.push(`${attempt.label}: ${error.message}`);
    }
  }

  throw new Error(errors.join(" | "));
};

const connectLocalDevelopmentDatabase = async () => {
  if (env.nodeEnv === "production") return false;

  const localUri = process.env.LOCAL_MONGO_URI || DEFAULT_LOCAL_MONGO_URI;
  try {
    await mongoose.connect(localUri, {
      serverSelectionTimeoutMS: LOCAL_MONGO_TIMEOUT_MS,
    });
    activeConnectionMode = "local-fallback";
    console.warn(`MongoDB Atlas unavailable. Connected to local development MongoDB at ${localUri}.`);
    console.warn(`Original database error: ${lastConnectionError}`);
    return true;
  } catch (error) {
    lastConnectionError = `${lastConnectionError} Local MongoDB fallback failed: ${error.message}`;
    return false;
  }
};

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (shouldSkipRemoteMongoInDevelopment()) {
    lastConnectionError = "Remote MongoDB connection skipped for local development.";
  } else if (!isPlaceholderMongoUri(env.mongoUri)) {
    try {
      const resolved = await resolveSrvMongoUri(env.mongoUri);
      await mongoose.connect(resolved.uri, {
        serverSelectionTimeoutMS: MONGO_TIMEOUT_MS,
      });
      lastConnectionError = "";
      activeConnectionMode = resolved.mode;
      console.log(`MongoDB connected (${activeConnectionMode})`);
      return true;
    } catch (error) {
      console.warn(`Primary connection failed: ${error.message}`);
      lastConnectionError = `${error.message} ${getConnectionHelp(error.message)}`;
    }
  } else {
    lastConnectionError = "No valid MONGO_URI provided.";
  }

  if (await connectLocalDevelopmentDatabase()) {
    return true;
  }

  if (env.allowStartWithoutDb) {
    activeConnectionMode = "mock";
    if (shouldSkipRemoteMongoInDevelopment()) {
      console.warn("Remote MongoDB skipped for local development. Using in-memory mock fallback.");
    } else {
      console.warn("Database connection unavailable. Features will use in-memory mock fallback.");
    }
    return false;
  }

  throw new Error(lastConnectionError);
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
  activeConnectionMode = "disconnected";
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
    mode: activeConnectionMode,
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
    lastError: lastConnectionError || null
  };
};
