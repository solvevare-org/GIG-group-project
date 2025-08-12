import { defineConfig, loadEnv } from 'vite';
import { readFileSync } from 'fs';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env and allow optional VITE_API_URL to override backend URL in dev
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_URL || 'http://localhost:5000';
  const useHttps = env.VITE_DEV_HTTPS === 'true';
  const httpsOption = useHttps
    ? (env.VITE_DEV_SSL_CERT && env.VITE_DEV_SSL_KEY
        ? { cert: readFileSync(env.VITE_DEV_SSL_CERT), key: readFileSync(env.VITE_DEV_SSL_KEY) }
        : true)
    : false;

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
  https: httpsOption as any,
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
