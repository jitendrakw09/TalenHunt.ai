import { Link } from "react-router";
import { HomeIcon } from "lucide-react";

function NotFoundPage() {
  return (
    <main className="aurora-shell flex items-center justify-center px-4">
      <section className="aurora-panel w-full max-w-xl p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">404</p>
        <h1 className="mt-2 text-3xl font-extrabold">Page not found</h1>
        <p className="mt-3 text-base-content/70">
          The page you requested does not exist or may have moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn btn-primary">
            <HomeIcon className="size-4" />
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
