import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow external access
    port: process.env.PORT || 3000, // Use the PORT environment variable if provided, otherwise default to 3000
  },
});
