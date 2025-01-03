import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.ts", // テストファイルの検索パターン
    baseUrl: "http://localhost:3000",   // 必要に応じて
  },
});