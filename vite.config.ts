import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // 👇 新增：GitHub Pages 构建时使用子路径，本地开发用根路径
  base: process.env.GITHUB_PAGES === "true" ? "/pu/" : "/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
