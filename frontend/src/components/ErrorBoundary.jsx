import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled UI error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="aurora-shell flex items-center justify-center px-4">
          <section className="aurora-panel w-full max-w-xl p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-error">Application Error</p>
            <h1 className="mt-2 text-3xl font-extrabold">Something went wrong</h1>
            <p className="mt-3 text-base-content/70">
              Please refresh the page. If the issue persists, try again in a few minutes.
            </p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
