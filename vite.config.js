import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // keep your existing base: "/your-repo/" if you already have it
  plugins: [react(), tailwindcss()],
});