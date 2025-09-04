import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    // Expose environment variables to the client
    'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(process.env.VITE_OPENROUTER_API_KEY),
    'import.meta.env.VITE_OPENROUTER_MODEL': JSON.stringify(process.env.VITE_OPENROUTER_MODEL),
    'import.meta.env.VITE_AI_ENABLED': JSON.stringify(process.env.VITE_AI_ENABLED),
  }
});
