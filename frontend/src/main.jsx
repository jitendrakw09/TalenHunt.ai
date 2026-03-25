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

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root"));

if (missingFrontendEnv.length > 0) {
  root.render(
    <StrictMode>
      <main className="aurora-shell flex items-center justify-center px-4">
        <section className="aurora-panel w-full max-w-2xl p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-error">
            Configuration Error
          </p>
          <h1 className="mt-2 text-2xl font-extrabold">Missing frontend environment variables</h1>
          <p className="mt-3 text-base-content/70">
            Set these Render environment variables and redeploy:
          </p>
          <div className="mt-4 rounded-xl border border-error/30 bg-error/10 p-4 text-left text-sm text-base-content/80">
            {missingFrontendEnv.join(", ")}
          </div>
        </section>
      </main>
    </StrictMode>
  );
} else {
  root.render(
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
}
