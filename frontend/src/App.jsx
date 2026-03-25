import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import SessionPage from "./pages/SessionPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const [showClerkTimeout, setShowClerkTimeout] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setShowClerkTimeout(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setShowClerkTimeout(true);
    }, 6000);

    return () => clearTimeout(timeoutId);
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <main className="aurora-shell flex items-center justify-center px-4">
        <section className="aurora-panel w-full max-w-2xl p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Initializing
          </p>
          <h1 className="mt-2 text-2xl font-extrabold">Loading authentication…</h1>
          <p className="mt-3 text-base-content/70">
            Please wait while the app connects to Clerk.
          </p>

          {showClerkTimeout && (
            <div className="mt-6 rounded-xl border border-warning/30 bg-warning/10 p-4 text-left text-sm text-base-content/80">
              <p className="font-semibold">Still loading?</p>
              <p className="mt-1">
                Verify your Clerk domain and publishable key settings for this deployment URL.
              </p>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
          },
        }}
      />
    </>
  );
}

export default App;
