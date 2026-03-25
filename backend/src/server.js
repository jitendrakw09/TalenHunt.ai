import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();

const __dirname = path.resolve();
const allowedOrigins = ENV.CLIENT_URL.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS origin is not allowed"));
    },
    credentials: true,
  })
);
app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.use("/api/{*any}", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `No API route matches ${req.originalUrl}`,
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "aurora-interview-studio-api",
    environment: ENV.NODE_ENV,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  const statusCode = error.statusCode || 500;
  const message =
    ENV.NODE_ENV === "production" && statusCode === 500
      ? "Internal Server Error"
      : error.message || "Internal Server Error";

  res.status(statusCode).json({ error: message });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();
