import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { REACT_APP_MAIN_URL, REACT_APP_URL } from "./constants";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      REACT_APP_MAIN_URL: REACT_APP_MAIN_URL,
      REACT_APP_URL: REACT_APP_URL,
    },
  },
});
