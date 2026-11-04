import { Link, useRouteError } from "react-router-dom";

const RouteError = () => {
  const error = useRouteError();
  const message =
    import.meta.env.DEV && error instanceof Error
      ? error.message
      : "This page could not be loaded. Please try again.";

  return (
    <main className="content mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-[#132238]">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-xl text-soft-dark">{message}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          className="btn btn-primary text-white"
          onClick={() => window.location.reload()}
          type="button"
        >
          Reload page
        </button>
        <Link className="btn btn-outline" to="/">
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
};

export default RouteError;
