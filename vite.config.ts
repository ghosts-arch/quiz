import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

import type { CorsOptions } from "vite";

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
};
export default defineConfig({
  plugins: [sveltekit()],
  server: {
    cors: corsOptions,
  },
});
