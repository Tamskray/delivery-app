import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      REACT_APP_MAIN_URL: "http://localhost:5000/api",
      REACT_APP_URL: "http://localhost:5000",
      // REACT_APP_MAIN_URL: "https://delivery-app-server-ebs0.onrender.com/api",
      // REACT_APP_URL: "https://delivery-app-server-ebs0.onrender.com",
    },
  },
});
