import { defineConfig, loadEnv, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import dynamicImport from "vite-plugin-dynamic-import";
import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const base =
    mode === "production"
      ? env.VITE_MF_VUE_PROD_DOMAIN
      : env.VITE_MF_VUE_DOMAIN;

  const config: UserConfigExport = {
    base: base,
    root: "./src",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      manifest: true,
      assetsDir: "/assets",
      rollupOptions: {
        input: "./src/vite-single-spa-vue.ts",
        output: {
          format: "module",
          entryFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]",
          globals: {
            vue: "Vue",
          },
        },
        preserveEntrySignatures: "strict",
        external: ["vue", "single-spa"],
      },
    },
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.svg"],
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "./src"),
        },
      ],
    },
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            base: "/src",
          },
        },
      }),
      dynamicImport(),
      eslintPlugin(),
    ],
  };
  return config;
});
