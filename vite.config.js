import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = process.env.VERCEL === "1"
    ? "/"
    : env.VITE_REPO_NAME
      ? `/${env.VITE_REPO_NAME}/`
      : "/";

  return {
    base,
    plugins: [react(), tailwindcss()],
    server: {
      open: true,
      host: false, // Allow access from network devices
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
          secure: true,
        },
      },
      headers: {
        // Security headers for development
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      }
    },
    build: {
      // Security for production build
      rollupOptions: {
        output: {
          // Sanitize chunk names to prevent information leakage
          chunkFileNames: 'assets/[hash].js',
          entryFileNames: 'assets/[hash].js',
          assetFileNames: 'assets/[hash].[ext]'
        }
      },
      // Enable source maps only in development
      sourcemap: mode === 'development',
      // Minify for production
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // Remove console.logs in production
          drop_debugger: true,
        },
      },
    },
    // Define global constants for security
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  };
});
