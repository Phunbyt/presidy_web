import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // minify: "terser", //esbuild or 'terser' or false
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //   },
    // },

    minify: "esbuild",
    target: "es2015",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    cssCodeSplit: true,
  },

  server: {
    allowedHosts: [".ngrok-free.app"],
  },
});
