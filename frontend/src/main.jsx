import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/ErrorBoundary";

const requiredFrontendEnv = ["VITE_CLERK_PUBLISHABLE_KEY", "VITE_STREAM_API_KEY"];
const missingFrontendEnv = requiredFrontendEnv.filter((envName) => {
  const value = import.meta.env[envName];
  return !value || String(value).trim().startsWith("your_");
});

if (missingFrontendEnv.length > 0) {
  throw new Error(
    `Missing or invalid frontend environment variables: ${missingFrontendEnv.join(", ")}. Update frontend/.env before running the app.`
  );
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <App />
          </ClerkProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
