import dotenv from "dotenv";

dotenv.config({ quiet: true });

const isInvalidEnvValue = (value) => {
  if (!value) return true;

  const normalized = String(value).trim();
  if (!normalized) return true;

  return (
    normalized.startsWith("your_") ||
    normalized.includes("<") ||
    normalized.includes("replace_me")
  );
};

const assertRequiredEnv = () => {
  const requiredVars = [
    "DB_URL",
    "CLIENT_URL",
    "STREAM_API_KEY",
    "STREAM_API_SECRET",
    "CLERK_SECRET_KEY",
    "INNGEST_EVENT_KEY",
    "INNGEST_SIGNING_KEY",
  ];

  const missingOrInvalid = requiredVars.filter((envName) =>
    isInvalidEnvValue(process.env[envName])
  );

  if (missingOrInvalid.length > 0) {
    throw new Error(
      `Missing or invalid environment variables: ${missingOrInvalid.join(", ")}. Update backend/.env before starting the server.`
    );
  }
};

assertRequiredEnv();

export const ENV = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
};
