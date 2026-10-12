import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "/" works for Vercel and for a GitHub repo named <username>.github.io
export default defineConfig({
  plugins: [react()],
  base: "/",
});
