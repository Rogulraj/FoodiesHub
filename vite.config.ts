import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// import tsconfigPaths from 'vite-tsconfig-paths'

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@providers": path.resolve(__dirname, "./src/providers"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@helper": path.resolve(__dirname, "./src/helper"),
      "@config": path.resolve(__dirname, "./src/config"),
    },
  },
});
