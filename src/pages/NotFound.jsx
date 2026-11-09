import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="content mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-picto-primary">
      404 — Page not found
    </p>
    <h1 className="mt-4 text-4xl font-semibold text-[#132238] sm:text-5xl">
      This page isn’t here.
    </h1>
    <p className="mt-4 max-w-xl text-base text-soft-dark">
      The link may be outdated, or the page may have moved. Head back to the
      portfolio to find what you need.
    </p>
    <Link className="btn btn-primary mt-8 text-white" to="/">
      Back to the portfolio
    </Link>
  </main>
);

export default NotFound;
