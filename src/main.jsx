import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes/Router";
import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "../src/../index.css";

// Security: Validate environment on app start
import { validateEnvironment } from './utils/security';
try {
  validateEnvironment();
} catch (error) {
  console.error('Environment validation failed:', error.message);
  // In production, you might want to show an error screen instead
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
