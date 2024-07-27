import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    define: {
      "process.env": env,
    },
    server: {
      port: 8080
    },
    plugins: [vue()],
    resolve: {
    alias: {
      '@': '/src'
    }
  }
  });
};

