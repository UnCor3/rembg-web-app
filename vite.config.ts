import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = mode === "development" ? "dev" : "prod";
  process.env = { ...process.env, ...loadEnv(env, process.cwd(), "") };

  const port = parseInt(process.env.VITE_PORT);
  const https = process.env.HTTPS === "true";

  return defineConfig({
    plugins: [react(), https && basicSsl()],
    server: {
      port,
      https,
      strictPort: true,
    },
    preview: {
      port,
      https,
      strictPort: true,
    },
  });
};
